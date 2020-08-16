import React, { useState, useContext, useEffect} from 'react';
// Stripe
import { navigate } from 'gatsby';

import { PaymentRequestButtonElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import {
  Container,
  Form,
  FormGroup,
  FormControl,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import { GlobalContext } from '../context/Provider';

import CartItem from './cartItem';

// UI

const Payment = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { checkoutItems } = state;

  const [paymentRequest, setPaymentRequest] = useState(null);

  const [formData, setFormData] = useState({});

  const [countryValue, setCountryValue] = useState("");
  const [province, setProvince] = useState("");

  const elements = useElements();
  const stripe = useStripe();

  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeCountry = (val) => {
    setCountryValue(val)
  }

  const changeState = (val) => {
    setProvince(val)
  }

  // After checkout, reset the cart state
  const resetCart = () => {
    dispatch({
      type: 'RESET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: [],
      },
    });
  };

  const cartIsEmpty = () => {
    return checkoutItems.length <= 0;
  }
  
  const getTotal = () => {
    let i;
    let totalPrice = 0;
    for (i = 0; i < checkoutItems.length; i += 1) {
      totalPrice += checkoutItems[i].amount * checkoutItems[i].price;
    }
    return totalPrice;
  };

  const getDisplayItems = () => {
    let i;
    let displayItems = []
    for (i = 0; i < checkoutItems.length; i += 1) {
      displayItems.push({amount: checkoutItems[i].amount, label: checkoutItems[i].name})
    }
  }


  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'CA',
        currency: 'cad',
        total: {
          label: 'SageMontreal',
          amount: getTotal(),
        },
        requestPayerName: true,
        requestPayerEmail: true,
        displayItems: getDisplayItems(),
        requestShipping: true,
        // `shippingOptions` is optional at this point:
        shippingOptions: [
          // The first shipping option in this list appears as the default
          // option in the browser payment interface.
          {
            id: 'free-shipping',
            label: 'Free shipping',
            detail: 'Arrives in 5 to 7 days',
            amount: 0,
          },
        ],
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        console.log(result)
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  if (paymentRequest) {
    paymentRequest.on('shippingaddresschange', function(ev) {
        // Perform server-side request to fetch shipping options
        fetch('/calculateShipping', {
          data: JSON.stringify({
            shippingAddress: ev.shippingAddress
          })
        }).then(function(response) {
          return response.json();
        }).then(function(result) {
          ev.updateWith({
            status: 'success',
            shippingOptions: result.supportedShippingOptions,
          });
        });
    });
  }

  // BUTTON STYLING SETTINGS
  const options = {
    paymentRequest,
    style: {
      paymentRequestButton: {
        type: 'default',
        // One of 'default', 'book', 'buy', or 'donate'
        // Defaults to 'default'
  
        theme: 'dark',
        // One of 'dark', 'light', or 'light-outline'
        // Defaults to 'dark'
  
        height: '44px',
        // Defaults to '40px'. The width is always '100%'.

      },
    }
  }

  const submit = async (e) => {

    console.log(formData)
    console.log(countryValue)
    console.log(province)
    e.preventDefault();

    // Billing Details
    const billing_details = {
      name: formData.name,
      email: formData.email,
      address: {
        city: formData.city,
        country: countryValue,
        line1: formData.address,
        state: province,
        postal_code: formData.postal_code,
      },
    };

    // Request Client Secret to Server
    const res = await fetch('http://localhost:5000/payment_intent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        price: (getTotal() + 15) * 100,
        receipt_email: formData.email,
      }),
    });

    const data = await res.json();
    const { client_secret } = data;

    // Create cardElement
    const cardElement = elements.getElement(CardElement);

    // Create Payment Request
    const paymentReqMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details,
    });

    // Confirm the Payment
    const confirmCardPayment = await stripe
      .confirmCardPayment(client_secret, {
        payment_method: paymentReqMethod.paymentMethod.id,
      })
      .then(function (result) {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
          window.alert(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            console.log(result);
            window.alert('Payment Succeeded');
            navigate('/success', {
              state: {
                userEmail: formData.email,
                purchase: checkoutItems,
              },
            });
            resetCart();
          }
        }
      });
  };

  return (
    <div className="flexbox-checkout">
      <div className="cart-checkout">
        {checkoutItems.map((item) => {
          return (
            <CartItem
              id={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              size={item.size}
              image={item.image}
            />
          );
        })}
        {cartIsEmpty() ? (
          <div />
        ) : (
          <div className="summary">
            <b>Price: {getTotal()}$</b>
            <p>Shipping: 15$</p>
            <b>Total: {getTotal() + 15}$</b>
          </div>
        )}
      </div>

      <Container className="py-4">
      {paymentRequest ?
      <div className="custom-apple-pay">
      <div style={{width:"350px"}}>
      <PaymentRequestButtonElement options={options} /></div></div> : <div></div>}
        <Card className="checkout-form">
          <Card.Body>
            <Form method="POST" onSubmit={submit} className="checkout-form__form">
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label> Name on Card </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      placeholder="Enter name on card"
                      name="name"
                      onChange={change}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label> Email </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      name="email"
                      placeholder="Enter email address"
                      onChange={change}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                    <Form.Label> Address </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text" 
                      name="address" 
                      placeholder="Enter address"
                      onChange={change} 
                      />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                      <Form.Label> Country/Region </Form.Label>
                      <CountryDropdown 
                      value={countryValue}
                      onChange={ (val) => changeCountry(val)}
                      priorityOptions={["CA", "US"]}
                      classes="checkout-form__select-form"
                      valueType="short"
                      />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label> State / Province </Form.Label>
                    <RegionDropdown
                    value={province}
                    country={countryValue}
                    onChange={ (val) => changeState(val)}
                    defaultOptionLabel="Select State/Province"
                    classes="checkout-form__select-form"
                    countryValueType="short"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label> City </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      onChange={change}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label> Postal Code </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      name="postal_code"
                      placeholder="Enter postal code"
                      onChange={change}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup >
                <Form.Label> Card Details </Form.Label>
                <div className="custom-stripe-element"><CardElement > </CardElement></div>
                <Button type="submit" style={{display: "block", position: "relative", marginLeft: "auto", marginRight: "auto", marginTop: "20px", width: "50%"}}> Pay</Button>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Payment;
// export const getTotal = () => {};

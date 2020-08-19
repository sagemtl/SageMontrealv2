import React, { useState, useContext } from 'react';
// Stripe
import { navigate } from 'gatsby';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

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

function Payment() {
  const { state, dispatch } = useContext(GlobalContext);
  const { checkoutItems } = state;
  const [isPickUp, setIsPickUp] = useState(false);
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

  const changeIsPickup = (val) => {
    setIsPickUp(val)
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

  const getTotal = () => {
    let i;
    let totalPrice = 0;
    for (i = 0; i < checkoutItems.length; i += 1) {
      totalPrice += checkoutItems[i].amount * checkoutItems[i].price;
    }
    return totalPrice;
  };

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
      <div className="cart_checkout">
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
        {getTotal() === 0 ? (
          <div />
        ) : (
          <div className="summary">
          <form action="#">
            <input type="radio" id="111" name="gender" onClick={() => changeIsPickup(true)}/>
            <label for="111">Pick Up</label>
            <input type="radio" id="222" name="gender" onClick={() => changeIsPickup(false)}/>
            <label for="222">Shipping</label>
          </form>
            <b>Price: {getTotal()}$</b>
            <p>Shipping: 15$ {province}</p>
            <b>Total: {getTotal() + 15}$</b>
          </div>
       )} 
      </div>
      <div className="checkout">
        {isPickUp == false ? 
        <Container className="py-4">
          <Card className="checkout__checkout-form">
            <Card.Body>
              <Form method="POST" onSubmit={submit} className="checkout-form__form">
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
                      <Form.Label> Address </Form.Label>
                      <FormControl className="checkout-form__form-control"
                        type="text" 
                        name="address" 
                        placeholder="Enter address"
                        onChange={change} 
                        />
                    </FormGroup>
                  </Col>
              
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
                    defaultOptionLabel="Select State"
                    classes="checkout-form__select-form"
                    countryValueType="short"
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

                <FormGroup >
                  <Form.Label> Card Details </Form.Label>
                  <CardElement > </CardElement>
                </FormGroup>
                <Button type="submit" style={{position: "relative", margin: "auto", width: "50%"}}> Pay {getTotal() + 15}$</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container> 

        :
      
         <Container className="py-4">
          <Card className="checkout__checkout-form">
            <Card.Body>
              <Form method="POST" onSubmit={submit} className="checkout-form__form">
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
                <FormGroup >
                  <Form.Label> Card Details </Form.Label>
                  <CardElement > </CardElement>
                </FormGroup>
                <Button type="submit" style={{position: "relative", margin: "auto", width: "50%"}}> Pay {getTotal() + 15}$</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        } 
        
        
      </div>
    </div>
  );
}

export default Payment;
// export const getTotal = () => {};

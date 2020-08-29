import React, { useState, useContext, useEffect} from 'react';
// Stripe
import { navigate } from 'gatsby';

import { PaymentRequestButtonElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as MaterialFormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
import { LabelDetail } from 'semantic-ui-react';

// UI

const Payment = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { checkoutItems } = state;

  const [paymentRequest, setPaymentRequest] = useState(null);

  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);

  const [countryValue, setCountryValue] = useState("CA");
  const [province, setProvince] = useState("Quebec");

  const[shippingMethod, setShippingMethod] = useState("")
  const [isPickUp, setIsPickUp] = useState(false);

  const elements = useElements();
  const stripe = useStripe();

  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeCountry = (val) => {
    setCountryValue(val)
    setShippingMethod(null);
  }

  const changeState = (val) => {
    setProvince(val)
  }

  const changeShippingMethod = (val) => {
    setShippingMethod(val);
    console.log(val)
  };
  const changeIsPickup = (val) => {
    setIsPickUp(val)
    if (val) {
      setShippingMethod("Local Pickup");
    }
    else {
      setShippingMethod("");
    }
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

  const getShippingPrice = () => {
    let prices = {
      "$5 - Expedited Parcel (2 - 4 Business Days)": 5,
      "FREE - Mail (4 - 10 Business Days)": 0,
      "$15 - Expedited Parcel (5 - 10 Business Days)": 15,
      "$20 - Small Packet - Air (6 - 12 Business Days)": 20,
      "Local Pickup": 0,
    }
    if (shippingMethod) {
      return prices[shippingMethod]
    }
    else {
      return null
    }
  }
  
  
  // function isPickup(){
  //   var checkbox = document.getElementById("111");
  //   if(checkbox.checked==true){
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  //  };

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
          amount: getTotal() * 100,
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
        console.log(ev.shippingAddress)
        fetch('http://localhost:5000/calculateShipping', {
          body: JSON.stringify({
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

    const form = e.currentTarget;
    console.log(form)
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity() === false) {
      return;
    }

    console.log(formData)
    console.log(countryValue)
    console.log(province)
    e.preventDefault();

    // Billing Details
    var information
    if (isPickUp) {
      information = {
        price: (getTotal() + getShippingPrice()) * 100,
        receipt_email: formData.email,
      }
    }
    else {
      information = {
        price: (getTotal() + getShippingPrice()) * 100,
        receipt_email: formData.email,
        shipping: {
          name: formData.name,
          address: {
            city: formData.city,
            country: countryValue,
            line1: formData.address,
            state: province,
            postal_code: formData.postal_code,
          },
          carrier: shippingMethod,
        }
      }
    }

    // Request Client Secret to Server
    const res = await fetch('https://sagemtl-backend.herokuapp.com/payment_intent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(information),
    });

    const data = await res.json();
    const { client_secret } = data;

    // Create cardElement
    const cardElement = elements.getElement(CardElement);

    // Create Payment Request
    const paymentReqMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
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
              sku={item.sku}
            />
          );
        })}
        {/* {isEmpty() ? (
          <div />
        ) : ( */}
          <div className="summary">
            <form action="#" id="shipping-method">
              <input type="radio" id="shipping-method-button1" name="gender" defaultChecked onClick={() => changeIsPickup(false)}/>
              <label for="shipping-method-button1">Shipping</label>
              <input type="radio" id="shipping-method-button2" name="gender" onClick={() => changeIsPickup(true)}/>
              <label for="shipping-method-button2">Pick Up</label>
            </form>
            <b>Price: {getTotal()}$</b>
            <p>Shipping: {getShippingPrice() === null ? "TBD" : getShippingPrice() == 0 ? "FREE" : getShippingPrice()+ "$"}</p>
            <b>Total: {!getShippingPrice() ? getTotal() : getTotal() + getShippingPrice()}$</b>
          </div>
        {/* )} */}
      </div>
      <div className="checkout">
      {isPickUp == false ?
      <Container className="py-4">
      {paymentRequest ?
      <div className="custom-apple-pay">
      <div style={{width:"350px"}}>
      <PaymentRequestButtonElement options={options} /></div></div> : <div></div>}
      <Form noValidate validated={validated} method="POST" onSubmit={submit} className="checkout-form__form">
        <Card className="checkout__checkout-form">
          <Card.Body>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label className="form-title-label"> Email </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      name="email"
                      placeholder="sage@office.com"
                      onChange={change}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label className="form-title-label"> Address </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text" 
                      name="address" 
                      placeholder="5463 W. 666th Ave"
                      onChange={change} 
                      required
                      />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                      <Form.Label className="form-title-label"> Country/Region </Form.Label>
                      <CountryDropdown 
                      value={countryValue}
                      onChange={ (val) => changeCountry(val)}
                      priorityOptions={["CA", "US"]}
                      classes="checkout-form__select-form"
                      valueType="short"
                      required
                      />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label className="form-title-label"> State / Province </Form.Label>
                    <RegionDropdown
                    value={province}
                    country={countryValue}
                    onChange={ (val) => changeState(val)}
                    defaultOptionLabel="Select State/Province"
                    classes="checkout-form__select-form"
                    countryValueType="short"
                    required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label className="form-title-label"> City </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      name="city"
                      placeholder="Montreal"
                      onChange={change}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <Form.Label className="form-title-label"> Postal Code </Form.Label>
                  <FormControl className="checkout-form__form-control"
                    type="text"
                    name="postal_code"
                    placeholder="S4G 3S4"
                    onChange={change}
                    required
                  />
                </Col>
              </Row>
                {countryValue == "CA" ? 
                <div id="canada-wrapper">
                <Form.Group>
                  <Form.Label> Shipping Method </Form.Label>
                    <Form.Check
                    type="radio"
                    label="FREE - Mail (4 - 10 Business Days)"
                    id="formHorizontalRadios1"
                    name="shippingMethodCA"
                    onChange={() => changeShippingMethod("FREE - Mail (4 - 10 Business Days)")}
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="$5 - Expedited Parcel (2 - 4 Business Days)"
                    name="shippingMethodCA"
                    id="formHorizontalRadios2"
                    onChange={() => changeShippingMethod("$5 - Expedited Parcel (2 - 4 Business Days)")}
                    required
                  />
                  </Form.Group>
                  </div> : 
                  countryValue == "US" ?
                  <fieldset id="us-wrapper">
                  <Form.Group>
                    <Form.Label> Shipping Method </Form.Label>
                    <Form.Check
                    type="radio"
                    label="$15 - Expedited Parcel (5 - 10 Business Days)"
                    name="shippingMethodUS"
                    id="formHorizontalRadios3"
                    onChange={() => changeShippingMethod("$15 - Expedited Parcel (5 - 10 Business Days)")}
                    required
                  />
                  </Form.Group>
                  </fieldset>:
                <Form.Group>
                  <Form.Label> Shipping Method </Form.Label>
                  <Form.Check
                    type="radio"
                    label="$20 - Small Packet - Air (6 - 12 Business Days)"
                    name="shippingMethodOther"
                    id="formHorizontalRadios4"
                    onChange={() => changeShippingMethod("$20 - Small Packet - Air (6 - 12 Business Days)")}
                    required
                  /> 
                </Form.Group>
                }
          </Card.Body>
        </Card>
        <div className="custom-pay">
        <div style={{width:"80%", marginTop:"1.25rem"}}>
        <FormGroup>
          <Form.Label className="form-title-label"> Name on Card </Form.Label>
          <FormControl className="checkout-form__form-control"
            type="text"
            placeholder="Sage"
            name="name"
            onChange={change}
            required
          />
        </FormGroup>
        <FormGroup >
          <Form.Label className="form-title-label"> Card Details </Form.Label>
          <div className="custom-stripe-element"><CardElement > </CardElement></div>
          <Button type="submit" style={{display: "block", position: "relative", marginLeft: "auto", marginRight: "auto", marginTop: "20px", width: "50%"}} > Pay</Button>
        </FormGroup>
        </div>
        </div>
        </Form>
      </Container> 
        :
      
         <Container className="py-4">
          <Card className="checkout__checkout-form">
            <Card.Body>
              <div style={{width: "80%", display: "block", marginRight: "auto", marginLeft: "auto"}}>
              <Form method="POST"  noValidate validated={validated} onSubmit={submit} className="checkout-form__form">
                    <FormGroup>
                      <Form.Label className="form-title-label"> Name on Card </Form.Label>
                      <FormControl className="checkout-form__form-control"
                        type="text"
                        placeholder="Sage"
                        name="name"
                        onChange={change}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Form.Label  className="form-title-label"> Email </Form.Label>
                      <FormControl className="checkout-form__form-control"
                        type="text"
                        name="email"
                        placeholder="sage@office.com"
                        onChange={change}
                        required
                      />
                    </FormGroup>
                <FormGroup>
                  <Form.Label className="form-title-label"> Card Details </Form.Label>
                  <div className="custom-stripe-element"><CardElement > </CardElement></div>
                  <Button type="submit" style={{display: "block", position: "relative", marginLeft: "auto", marginRight: "auto", marginTop: "20px", width: "50%"}}> Pay</Button>
                </FormGroup>
                </Form>
                </div>
            </Card.Body>
          </Card>
          <Form.Label className="form-title-label" style={{marginTop: "10px"}}> * Local pickup in Montreal downtown area. Pickup location will be sent by email. </Form.Label>
        </Container>
        } 
        
        
      </div>
    </div>
  );
}

export default Payment;
// export const getTotal = () => {};

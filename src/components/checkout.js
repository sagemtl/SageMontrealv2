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
import ModalError from './modalError';
import { LabelDetail } from 'semantic-ui-react';

// UI

const Payment = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { checkoutItems } = state;

  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardError, setCardError] = useState(true);
  const [displayCardError, setDisplayCardError] = useState(false)

  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);

  const [countryValue, setCountryValue] = useState("CA");
  const [province, setProvince] = useState("Quebec");

  const[shippingMethod, setShippingMethod] = useState("")
  const [isPickUp, setIsPickUp] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("")

  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(true);

  const handleErrorMessage = (message) => {
    setModalErrorMessage(message)
  }

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

  const stripeElementChange = (element) => {
    if (!element.complete) {
      setCardError(true)
    }
    else if (element.complete) {
      setCardError(false)
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
      "$22 - Small Packet - Air (6 - 12 Business Days)": 22,
      "FREE - Expedited Parcel (6 - 12 Business Days)": 0,
      "FREE - Small Packet - Air (6 - 12 Business Days)": 0,
      "Local Pickup": 0,
    }
    if (shippingMethod) {
      return prices[shippingMethod]
    }
    else {
      return null
    }
  }

  const getStripeShippingPrice = (selectedOption) => {
    let stripeShippingOptions = [
      {
        id: 'free-shipping',
        label: 'Mail',
        detail: 'Arrives in 4 to 10 business days',
        amount: 0,
      },
      {
        id: 'expedited-shipping',
        label: 'Expedited Parcel',
        detail: 'Arrives in 2 to 4 business days',
        amount: 500,
      },
      {
        id: 'expedited-shipping-us',
        label: '"Expedited Parcel',
        detail: 'Arrives in 5 to 10 business days',
        amount: 1500,
      },
      {
        id: 'small-packet-shipping',
        label: 'Small Packet - Air',
        detail: 'Arrives in 6 to 12 business days',
        amount: 2000,
      },
    ]

    return stripeShippingOptions.filter(
      option => option.id === selectedOption.id
    )[0].amount;
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

  const getListOfSkus = () => {
    let i;
    let skusList = []
    for (i = 0; i < checkoutItems.length; i += 1) {
      var desc = checkoutItems[i].size + " " + checkoutItems[i].name
      skusList.push({ 
        "amount": checkoutItems[i].price * 100,
        "currency": "cad",
        "description": desc,
        "parent": checkoutItems[i].sku,
        "quantity": checkoutItems[i].amount,
        "type": "sku"
      },)
    }
    return skusList
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
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
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
        fetch('https://ba9dfe28d4b7.ngrok.io/calculateShipping', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
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

    // Callback when the shipping option is changed.
    paymentRequest.on('shippingoptionchange', async (event) => {
      console.log(event)
      event.updateWith({
        total: {
          label: 'Total',
          amount: getTotal() * 100 + getStripeShippingPrice(event.shippingOption)
        },
        status: 'success',
      });
    });

    // Callback when a payment method is created.
    paymentRequest.on('paymentmethod', async (event) => {
      let information = {
        price: (getTotal() + getStripeShippingPrice(event.shippingOption)) * 100,
        receipt_email: event.payerEmail,
        shipping: {
          name: event.shippingAddress.recipient,
          phone: event.shippingAddress.phone,
          address: {
            line1: event.shippingAddress.addressLine[0],
            city: event.shippingAddress.city,
            postal_code: event.shippingAddress.postalCode,
            state: event.shippingAddress.region,
            country: event.shippingAddress.country,
          },
          carrier: event.shippingOption.label,
        },
      }
      const res = await fetch('https://ba9dfe28d4b7.ngrok.io/payment_intent', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(information),
      });

      const data = await res.json();
      const { client_secret } = data;
      var successful = false

      // Confirm the PaymentIntent with the payment method returned from the payment request.
      const {error} = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: event.paymentMethod.id,
        },
        {handleActions: false}
      );
      if (error) {
        // Report to the browser that the payment failed.
        event.complete('fail');
        console.log(error);
        window.alert(error);
      } 
      else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        event.complete('success');
        // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
        const response = await stripe.confirmCardPayment(
          client_secret
        )
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
              successful = true
              // decrease inventory here
              console.log(result);
              navigate('/success', {
                state: {
                  userEmail: event.payerEmail,
                  purchase: checkoutItems,
                },
              });
              resetCart();
            }
          }
        });
      }

      console.log(event.shippingOption)
      if (successful) {
        if (isPickUp) {
          information = {
            receipt_email: event.payerEmail,
            shipping: {
              name: event.shippingAddress.recipient,
              address: {
                line1: "N/A",
              },
            },
            orderItems: getListOfSkus(),
            metadata: { "Shipping Method": event.shippingOption.label + " " + event.shippingOption.id + ": " + event.shippingOption.detail}
          }
        }
        else {
          information = {
            receipt_email: event.payerEmail,
            shipping: {
              name: event.shippingAddress.recipient,
              address: {
                line1: event.shippingAddress.addressLine[0],
                city: event.shippingAddress.city,
                postal_code: event.shippingAddress.postalCode,
                state: event.shippingAddress.region,
                country: event.shippingAddress.country,
              },
            },
            orderItems: getListOfSkus(),
            metadata: { "Shipping Method": event.shippingOption.label + " " + event.shippingOption.id + ": " + event.shippingOption.detail}
          }
        }
        
        const res = await fetch('https://ba9dfe28d4b7.ngrok.io/create_order', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(information),
        });
      }
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
    if (form.checkValidity() === false || cardError) {
      e.preventDefault();
      e.stopPropagation();
      setDisplayCardError(true)
    }

    setValidated(true);
    if (form.checkValidity() === false || cardError) {
      setDisplayCardError(true)
      console.log(cardError)
      console.log(displayCardError)
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
    const res = await fetch('http://localhost:5000/payment_intent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(information),
    });

    const data = await res.json();
    const { client_secret } = data;
    var successful = false

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
          handleErrorMessage(result.error.message);
          handleModalShow();
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            successful = true
            // decrease inventory here
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
      if (successful) {
        var information
        if (isPickUp) {
          information = {
            receipt_email: formData.email,
            shipping: {
              name: formData.name,
              address: {
                line1: "N/A",
              },
            },
            orderItems: getListOfSkus(),
            metadata: { "Shipping Method": shippingMethod}
          }
        }
        else {
          information = {
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
            },
            orderItems: getListOfSkus(),
            metadata: { "Shipping Method": shippingMethod}
          }
        }
        
        const res = await fetch('http://localhost:5000/create_order', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(information),
        });
      }
  };

  return (
    <div className="flexbox-checkout">
      <ModalError
        modalShow={modalShow}
        setModalShow={setModalShow}
        message={modalErrorMessage}
      />
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
                  <FormGroup>
                    <Form.Label className="form-title-label"> Postal Code </Form.Label>
                    <FormControl className="checkout-form__form-control"
                      type="text"
                      name="postal_code"
                      placeholder="S4G 3S4"
                      onChange={change}
                      required
                    />
                  </FormGroup>
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
                    {getTotal() >= 70 && <Form.Check
                      type="radio"
                      label="FREE - Expedited Parcel (6 - 12 Business Days)"
                      name="shippingMethodUS"
                      id="formHorizontalRadios3"
                      onChange={() => changeShippingMethod("FREE - Expedited Parcel (6 - 12 Business Days)")}
                      required
                    />}
                    <Form.Check
                      type="radio"
                      label="$15 - Expedited Parcel (5 - 10 Business Days)"
                      name="shippingMethodUS"
                      id="formHorizontalRadios4"
                      onChange={() => changeShippingMethod("$15 - Expedited Parcel (5 - 10 Business Days)")}
                      required
                    />
                  </Form.Group>
                  </fieldset>:
                <Form.Group id="ww-wrapper">
                  <Form.Label> Shipping Method </Form.Label>
                  {getTotal() >= 70 && <Form.Check
                    type="radio"
                    label="FREE - Small Packet - Air (6 - 12 Business Days)"
                    name="shippingMethodOther"
                    id="formHorizontalRadios5"
                    onChange={() => changeShippingMethod("FREE - Small Packet - Air (6 - 12 Business Days)")}
                    required
                  /> }
                  <Form.Check
                    type="radio"
                    label="$22 - Small Packet - Air (6 - 12 Business Days)"
                    name="shippingMethodOther"
                    id="formHorizontalRadios6"
                    onChange={() => changeShippingMethod("$22 - Small Packet - Air (6 - 12 Business Days)")}
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
          <div className="custom-stripe-element"><CardElement onChange={(element) => stripeElementChange(element)}> </CardElement></div>
          {displayCardError && cardError && <span id="card-errors" className="text-danger" role="alert">Your card number is incomplete.</span>}
          <Button type="submit" style={{display: "block", position: "relative", marginLeft: "auto", marginRight: "auto", marginTop: "20px", width: "50%"}} > Pay</Button>
        </FormGroup>
        </div>
        </div>
        </Form>
        <Form.Label className="form-title-label"> * Free shipping on orders above $70.</Form.Label> 
      </Container>
        :
         <Container className="py-4">
          <Card className="checkout__checkout-form">
            <Card.Body>
              <div style={{display: "block", marginRight: "auto", marginLeft: "auto"}}>
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
                  <div className="custom-stripe-element"><CardElement onChange={(element) => stripeElementChange(element)}> </CardElement></div>
                  {displayCardError && cardError && <span id="card-errors" className="text-danger" role="alert">Your card number is incomplete.</span>}
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

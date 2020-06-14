import React, { useState, useContext } from "react";
// Stripe

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { GlobalContext } from '../context/Provider';

// UI
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

function Payment() {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  const [formData, setFormData] = useState({});
  const elements = useElements();
  const stripe = useStripe();

  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTotal = () => {
    var i
    var totalPrice = 0;
    for (i = 0; i < checkoutItems.length; i += 1) {
      totalPrice += (checkoutItems[i].amount * checkoutItems[i].price)
    }
    return totalPrice;
  }

  const submit = async (e) => {
    e.preventDefault();

    // Billing Details
    const billing_details = {
      name: formData.name,
      email: formData.email,
      address: {
        city: formData.city,
        line1: formData.address,
        state: formData.state,
        postal_code: formData.postal_code,
      },
    };

    // Request Client Secret to Server
    const res = await fetch("http://localhost:5000/payment_intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ price: getTotal() * 100, receipt_email: formData.email}),
    });

    const data = await res.json();
    const client_secret = data.client_secret;

    // Create cardElement
    const cardElement = elements.getElement(CardElement);

    // Create Payment Request
    const paymentReqMethod = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billing_details,
    });

    // Confirm the Payment
    const confirmCardPayment = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentReqMethod.paymentMethod.id,
    }).then(function(result) {
      if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
          window.alert(result.error.message)
      } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              console.log(result)
              window.alert('Payment Succeeded')
          }
      }
    });
  };

  return (
    <Container className='py-4'>
      <Card>
        <Card.Body>
          <Form method='POST' onSubmit={submit}>
            <Row>
              <Col>
                <FormGroup>
                  <Form.Label> Name on Card </Form.Label>
                  <FormControl
                    type='text'
                    placeholder='Enter name on card'
                    name='name'
                    onChange={change}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Form.Label> Email </Form.Label>
                  <FormControl
                    type='text'
                    name='email'
                    placeholder='xinruili07@gmail.com'
                    onChange={change}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Form.Label> City </Form.Label>
                  <FormControl
                    type='text'
                    name='city'
                    placeholder='Montreal'
                    onChange={change}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Form.Label> Address </Form.Label>
                  <FormControl type='text' name='address' onChange={change} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Form.Label> State </Form.Label>
                  <FormControl
                    type='text'
                    name='state'
                    placeholder='Quebec'
                    onChange={change}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Form.Label> Postal Code </Form.Label>
                  <FormControl
                    type='text'
                    name='postal_code'
                    placeholder='Postal Code '
                    onChange={change}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Form.Label> Card Details </Form.Label>
              <CardElement> </CardElement>
            </FormGroup>
              <Button type='submit'> Pay {getTotal()}$</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Payment;

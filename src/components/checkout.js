/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import {
  PaymentRequestButtonElement,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
import ModalError from './modalError';
import { getSkuInventory, updateSkuInventory } from '../helpers/stripeHelper';
import CartCheckout from './cartCheckout';
import LoadingScreen from './loadingScreen';

// UI
const Payment = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { checkoutItems } = state;

  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardError, setCardError] = useState(true);
  const [displayCardError, setDisplayCardError] = useState(false);

  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);

  const [countryValue, setCountryValue] = useState('CA');
  const [province, setProvince] = useState('Quebec');

  const [shippingMethod, setShippingMethod] = useState('');

  const [modalShow, setModalShow] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleModalShow = () => setModalShow(true);

  const handleErrorMessage = (message) => {
    setModalErrorMessage(message);
  };

  const elements = useElements();
  const stripe = useStripe();

  // snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('info'); // one of 'info', 'error', 'success', 'warning'
  const [snackMessage, setSnackMessage] = useState('');

  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeCountry = (val) => {
    setCountryValue(val);
    setShippingMethod(null);
  };

  const changeState = (val) => {
    setProvince(val);
  };

  const changeShippingMethod = (val) => {
    setShippingMethod(val);
  };

  const stripeElementChange = (element) => {
    if (!element.complete) {
      setCardError(true);
    } else if (element.complete) {
      setCardError(false);
    }
  };

  // After checkout, reset the cart state
  const resetCart = () => {
    dispatch({
      type: 'RESET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: [],
      },
    });
  };

  // After checkout, add email to success page
  const setSuccessEmail = (email) => {
    dispatch({
      type: 'SET_SUCCESS_EMAIL',
      payload: {
        successEmail: email,
      },
    });
  };

  // After checkout, add items to success page
  const setSuccessItems = (items) => {
    dispatch({
      type: 'SET_SUCCESS_ITEMS',
      payload: {
        successItems: items,
      },
    });
  };

  const getShippingPrice = () => {
    const prices = {
      '$5 - Mail (5 - 10 Business Days)': 5,
      'FREE - Tracked Parcel (2 - 4 Business Days)': 0,
      '$10 - Tracked Parcel (2 - 4 Business Days)': 10,
      '$20 - Tracked Parcel (7-14 business days)': 20,
      '$40 - Tracked Parcel (1-3 weeks)': 40,
    };
    if (shippingMethod) {
      return prices[shippingMethod];
    }
    return null;
  };

  const canShipByMail = () => {
    const total = checkoutItems.reduce((accumulator, item) => {
      return accumulator + item.amount;
    }, 0);

    if (total !== 1) {
      return false;
    }

    const itemType = checkoutItems[0].prodMetadata.item;
    return itemType === 'tshirt' || itemType === 'hat' || itemType === 'tote';
  };

  const getStripeShippingPrice = (selectedOption) => {
    const stripeShippingOptions = [
      {
        id: 'free-shipping',
        label: 'Tracked Parcel',
        detail: 'Arrives in 2 to 4 business days',
        amount: 0,
      },
      {
        id: 'mail-shipping',
        label: 'Mail',
        detail: 'Arrives in 5 to 10 business days',
        amount: 500,
      },
      {
        id: 'tracked-parcel',
        label: 'Tracked Parcel',
        detail: 'Arrives in 2 to 4 business days',
        amount: 1000,
      },
      {
        id: 'tracked-parcel-us',
        label: 'Tracked Parcel',
        detail: 'Arrives in 7 to 14 business days',
        amount: 2000,
      },
      {
        id: 'tracked-parcel-intl',
        label: 'Tracked Parcel',
        detail: 'Arrives in 7 to 21 business days',
        amount: 4000,
      },
    ];

    return stripeShippingOptions.filter(
      (option) => option.id === selectedOption.id,
    )[0].amount;
  };

  const getTotal = () => {
    let totalPrice = 0;
    checkoutItems.forEach((item) => {
      totalPrice += item.amount * item.price;
    });
    return totalPrice;
  };

  const getDisplayItems = () => {
    const displayItems = [];

    checkoutItems.forEach((item) => {
      displayItems.push({ amount: item.amount, label: item.name });
    });
  };

  const getListOfSkus = () => {
    const skusList = [];

    checkoutItems.forEach((item) => {
      const desc = `${item.size}/${item.name}/${item.prodMetadata.colour}/${item.prodMetadata.item}`;
      skusList.push({
        amount: item.price * 100,
        currency: 'cad',
        description: desc,
        parent: item.skuId,
        quantity: item.amount,
        type: 'sku',
      });
    });
    return skusList;
  };

  const setSnack = (open, sev, msg) => {
    setSnackbarOpen(open);
    setSnackSeverity(sev);
    setSnackMessage(msg);
  };

  const Alert = (props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const decreaseInventory = async () => {
    await Promise.all(
      checkoutItems.map(async (item) => {
        // the name of the sku is the size
        const inv = await updateSkuInventory(
          item.prodMetadata.item,
          item.prodMetadata.colour,
          item.size,
          item.amount,
        );
        return inv;
      }),
    );
  };

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
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [getDisplayItems, getTotal, stripe]);

  if (paymentRequest) {
    paymentRequest.on('shippingaddresschange', (ev) => {
      // Perform server-side request to fetch shipping options
      fetch(`${process.env.GATSBY_BACKEND_URL}/orders-api/calculate_shipping`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress: ev.shippingAddress,
          total: getTotal(),
          shipByMail: canShipByMail(),
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          ev.updateWith({
            status: 'success',
            shippingOptions: result.supportedShippingOptions,
            total: {
              label: 'Total',
              amount:
                getTotal() * 100 +
                getStripeShippingPrice(result.supportedShippingOptions[0]),
            },
          });
        });
    });

    // Callback when the shipping option is changed.
    paymentRequest.on('shippingoptionchange', async (event) => {
      event.updateWith({
        total: {
          label: 'Total',
          amount:
            getTotal() * 100 + getStripeShippingPrice(event.shippingOption),
        },
        status: 'success',
      });
    });

    // Callback when a payment method is created.
    paymentRequest.on('paymentmethod', async (event) => {
      let information = {
        price:
          (getTotal() + getStripeShippingPrice(event.shippingOption)) * 100,
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
      };
      const res = await fetch(
        `${process.env.GATSBY_BACKEND_URL}/orders-api/payment_intent`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(information),
        },
      );

      const data = await res.json();
      // eslint-disable-next-line camelcase
      const { client_secret } = data;
      let successful = false;

      // Confirm the PaymentIntent with the payment method returned from the payment request.
      const { error } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: event.paymentMethod.id,
        },
        { handleActions: false },
      );
      if (error) {
        // Report to the browser that the payment failed.
        event.complete('fail');
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        event.complete('success');
        // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
        const response = await stripe
          .confirmCardPayment(client_secret)
          .then((result) => {
            if (result.error) {
              // Show error to your customer (e.g., insufficient funds)
              // eslint-disable-next-line no-alert
              window.alert(result.error.message);
            } else {
              // The payment has been processed!
              // eslint-disable-next-line no-lonely-if
              if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                successful = true;
                // decrease inventory here
              }
            }
          });
      }

      if (successful) {
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
          metadata: {
            'Shipping Method': `${event.shippingOption.label} ${event.shippingOption.id}: ${event.shippingOption.detail}`,
          },
        };

        await fetch(
          `${process.env.GATSBY_BACKEND_URL}/orders-api/create_order`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(information),
          },
        );

        navigate('/success');

        setSuccessEmail(formData.email);
        setSuccessItems(checkoutItems);
        resetCart();
        await decreaseInventory();
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
    },
  };

  const submit = async (e) => {
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false || cardError) {
      e.preventDefault();
      e.stopPropagation();
      setDisplayCardError(true);
    }

    setValidated(true);
    if (form.checkValidity() === false || cardError) {
      setDisplayCardError(true);
      return;
    }

    form.submitButton.disabled = true;
    e.preventDefault();

    // Billing Details
    const information = {
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
      },
    };

    // Request Client Secret to Server
    const res = await fetch(
      `${process.env.GATSBY_BACKEND_URL}/orders-api/payment_intent`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(information),
      },
    );

    const data = await res.json();
    // eslint-disable-next-line camelcase
    const { client_secret } = data;
    let successful = false;
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
      .then((result) => {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
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
            successful = true;
            // decrease inventory here
          }
        }
      });
    if (successful) {
      const information = {
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
        metadata: { 'Shipping Method': shippingMethod },
      };
      await fetch(`${process.env.GATSBY_BACKEND_URL}/orders-api/create_order`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(information),
      });

      navigate('/success');

      setSuccessEmail(formData.email);
      setSuccessItems(checkoutItems);
      resetCart();
      const inventoryUpdate = await decreaseInventory();
    } else {
      form.submitButton.disabled = false;
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        className={`flexbox-checkout ${
          isLoading ? 'flexbox-checkout__hidden' : ''
        }`}
      >
        <ModalError
          modalShow={modalShow}
          setModalShow={setModalShow}
          message={modalErrorMessage}
        />
        <div className="cart_checkout_container">
          <div className="summary">
            <CartCheckout />
            <div className="prices-flexbox">
              <b>Price: </b>
              <b>{getTotal()}$</b>
            </div>
            <div className="prices-flexbox">
              <p>Shipping: </p>
              <p>
                {getShippingPrice() === null
                  ? ' TBD'
                  : getShippingPrice() === 0
                  ? ' FREE'
                  : ` ${getShippingPrice()}$`}
              </p>
            </div>
            <hr className="prices-hr" />
            <div className="prices-flexbox">
              <b>Total:</b>
              <b>
                {!getShippingPrice()
                  ? ` ${getTotal()}`
                  : ` ${getTotal() + getShippingPrice()}`}
                $
              </b>
            </div>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity={snackSeverity}>{snackMessage}</Alert>
        </Snackbar>
        <div className="checkout">
          <div className="py-4">
            {paymentRequest ? (
              <div className="custom-apple-pay">
                <div style={{ width: '350px' }}>
                  <PaymentRequestButtonElement options={options} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <Form
              noValidate
              validated={validated}
              method="POST"
              onSubmit={submit}
              className="checkout-form__form"
            >
              <Card className="checkout__checkout-form">
                <Card.Body>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Form.Label className="form-title-label">
                          Email
                        </Form.Label>
                        <FormControl
                          className="checkout-form__form-control"
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
                        <Form.Label className="form-title-label">
                          Address
                        </Form.Label>
                        <FormControl
                          className="checkout-form__form-control"
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
                        <Form.Label className="form-title-label">
                          Country/Region
                        </Form.Label>
                        <CountryDropdown
                          value={countryValue}
                          onChange={(val) => changeCountry(val)}
                          priorityOptions={['CA', 'US']}
                          classes="checkout-form__select-form"
                          valueType="short"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Form.Label className="form-title-label">
                          State / Province
                        </Form.Label>
                        <RegionDropdown
                          value={province}
                          country={countryValue}
                          onChange={(val) => changeState(val)}
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
                        <Form.Label className="form-title-label">
                          City
                        </Form.Label>
                        <FormControl
                          className="checkout-form__form-control"
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
                        <Form.Label className="form-title-label">
                          Postal Code
                        </Form.Label>
                        <FormControl
                          className="checkout-form__form-control"
                          type="text"
                          name="postal_code"
                          placeholder="S4G 3S4"
                          onChange={change}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {countryValue === 'CA' ? (
                    <div id="canada-wrapper">
                      <Form.Group>
                        <Form.Label>
                          <strong>Shipping Method</strong>
                        </Form.Label>
                        {canShipByMail() && (
                          <Form.Check
                            style={{ textAlign: 'center' }}
                            type="radio"
                            label="$5 - Mail (5 - 10 Business Days)"
                            name="shippingMethodCA"
                            id="formHorizontalRadios1"
                            onChange={() =>
                              changeShippingMethod(
                                '$5 - Mail (5 - 10 Business Days)',
                              )
                            }
                            required
                          />
                        )}
                        {getTotal() >= 70 ? (
                          <Form.Check
                            style={{ textAlign: 'center' }}
                            type="radio"
                            label="FREE - Tracked Parcel (2 - 4 Business Days)"
                            id="formHorizontalRadios2"
                            name="shippingMethodCA"
                            onChange={() =>
                              changeShippingMethod(
                                'FREE - Tracked Parcel (2 - 4 Business Days)',
                              )
                            }
                            required
                          />
                        ) : (
                          <Form.Check
                            style={{ textAlign: 'center' }}
                            type="radio"
                            label="$10 - Tracked Parcel (2 - 4 Business Days)"
                            name="shippingMethodCA"
                            id="formHorizontalRadios3"
                            onChange={() =>
                              changeShippingMethod(
                                '$10 - Tracked Parcel (2 - 4 Business Days)',
                              )
                            }
                            required
                          />
                        )}
                      </Form.Group>
                    </div>
                  ) : countryValue === 'US' ? (
                    <fieldset id="us-wrapper">
                      <Form.Group>
                        <Form.Label>
                          <strong>Shipping Method</strong>
                        </Form.Label>
                        <Form.Check
                          style={{ textAlign: 'center' }}
                          type="radio"
                          label="$20 - Tracked Parcel (7-14 business days)"
                          name="shippingMethodUS"
                          id="formHorizontalRadios4"
                          onChange={() =>
                            changeShippingMethod(
                              '$20 - Tracked Parcel (7-14 business days)',
                            )
                          }
                          required
                        />
                      </Form.Group>
                    </fieldset>
                  ) : (
                    <Form.Group id="ww-wrapper">
                      <Form.Label>
                        <strong>Shipping Method</strong>
                      </Form.Label>
                      <Form.Check
                        style={{ textAlign: 'center' }}
                        type="radio"
                        label="$40 - Tracked Parcel (1-3 weeks)"
                        name="shippingMethodOther"
                        id="formHorizontalRadios6"
                        onChange={() =>
                          changeShippingMethod(
                            '$40 - Tracked Parcel (1-3 weeks)',
                          )
                        }
                        required
                      />
                    </Form.Group>
                  )}
                </Card.Body>
              </Card>
              <div className="custom-pay">
                <div style={{ width: '80%', marginTop: '1.25rem' }}>
                  <FormGroup>
                    <Form.Label className="form-title-label">
                      Name on Card
                    </Form.Label>
                    <FormControl
                      className="checkout-form__form-control"
                      type="text"
                      placeholder="Sage"
                      name="name"
                      onChange={change}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label className="form-title-label">
                      Card Details
                    </Form.Label>
                    <div className="custom-stripe-element">
                      <CardElement
                        onChange={(element) => stripeElementChange(element)}
                      />
                    </div>
                    {displayCardError && cardError && (
                      <span
                        id="card-errors"
                        className="text-danger"
                        role="alert"
                      >
                        Your card number is incomplete.
                      </span>
                    )}
                    <Button
                      type="submit"
                      name="submitButton"
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '20px',
                        width: '50%',
                      }}
                    >
                      Pay
                    </Button>
                  </FormGroup>
                </div>
              </div>
            </Form>
            <Form.Label className="form-title-label">
              * Free shipping across Canada on orders above $70
            </Form.Label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

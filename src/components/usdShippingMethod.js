/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UsdShippingMethods = ({
  countryValue,
  canShipByMail,
  total,
  changeShippingMethod,
}) => {
  return (
    <>
      {countryValue === 'CA' ? (
        <div id="canada-wrapper">
          <Form.Group>
            <Form.Label>
              <strong>Shipping Method</strong>
            </Form.Label>
            {canShipByMail && (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="$2 USD - Mail (5 - 10 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios1"
                onChange={() =>
                  changeShippingMethod(
                    '$2 USD - Mail (5 - 10 Business Days)',
                    2,
                  )
                }
                required
              />
            )}
            {total >= 100 ? (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="FREE - Tracked Parcel (3 - 5 Business Days)"
                id="formHorizontalRadios2"
                name="shippingMethodCA"
                onChange={() =>
                  changeShippingMethod(
                    'FREE - Tracked Parcel (3 - 5 Business Days)',
                    0,
                  )
                }
                required
              />
            ) : (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="$8 USD - Tracked Parcel (3 - 5 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios3"
                onChange={() =>
                  changeShippingMethod(
                    '$8 USD - Tracked Parcel (3 - 5 Business Days)',
                    8,
                  )
                }
                required
              />
            )}
          </Form.Group>
        </div>
      ) : (
        <fieldset id="us-wrapper">
          <Form.Group>
            <Form.Label>
              <strong>Shipping Method</strong>
            </Form.Label>
            {canShipByMail && (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="$3 USD - Mail (5 - 10 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios1"
                onChange={() =>
                  changeShippingMethod(
                    '$3 USD - Mail (5 - 10 Business Days)',
                    3,
                  )
                }
                required
              />
            )}
            {total >= 120 ? (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="FREE - Tracked Parcel (7 - 14 business days)"
                name="shippingMethodUS4"
                id="formHorizontalRadios4"
                onChange={() =>
                  changeShippingMethod(
                    'FREE - Tracked Parcel (7 - 14 business days)',
                    0,
                  )
                }
                required
              />
            ) : (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="$15 USD - Tracked Parcel (7 - 14 business days)"
                name="shippingMethodUS5"
                id="formHorizontalRadios5"
                onChange={() =>
                  changeShippingMethod(
                    '$15 USD - Tracked Parcel (7 - 14 business days)',
                    15,
                  )
                }
                required
              />
            )}
          </Form.Group>
        </fieldset>
      )}
    </>
  );
};

UsdShippingMethods.propTypes = {
  countryValue: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  canShipByMail: PropTypes.bool.isRequired,
  changeShippingMethod: PropTypes.func.isRequired,
};

export default UsdShippingMethods;

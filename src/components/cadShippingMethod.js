/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CadShippingMethods = ({
  countryValue,
  total,
  canShipByMail,
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
                label="$2 CAD - Mail (5 - 10 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios1"
                onChange={() =>
                  changeShippingMethod(
                    '$2 CAD - Mail (5 - 10 Business Days)',
                    2,
                  )
                }
                required
              />
            )}
            {total >= 120 ? (
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
                label="$10 CAD - Tracked Parcel (3 - 5 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios3"
                onChange={() =>
                  changeShippingMethod(
                    '$10 CAD - Tracked Parcel (3 - 5 Business Days)',
                    10,
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
                label="$3 CAD - Mail (5 - 10 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios1"
                onChange={() =>
                  changeShippingMethod(
                    '$3 CAD - Mail (5 - 10 Business Days)',
                    3,
                  )
                }
                required
              />
            )}
            {total >= 150 ? (
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
                label="$20 CAD - Tracked Parcel (7 - 14 business days)"
                name="shippingMethodUS5"
                id="formHorizontalRadios5"
                onChange={() =>
                  changeShippingMethod(
                    '$20 CAD - Tracked Parcel (7 - 14 business days)',
                    20,
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

CadShippingMethods.propTypes = {
  countryValue: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  canShipByMail: PropTypes.bool.isRequired,
  changeShippingMethod: PropTypes.func.isRequired,
};

export default CadShippingMethods;

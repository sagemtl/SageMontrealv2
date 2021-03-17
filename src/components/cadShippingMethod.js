/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CadShippingMethods = ({
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
                label="$5 CAD - Mail (5 - 10 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios1"
                onChange={() =>
                  changeShippingMethod(
                    '$5 CAD - Mail (5 - 10 Business Days)',
                    5,
                  )
                }
                required
              />
            )}
            {total >= 70 ? (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="FREE - Tracked Parcel (2 - 4 Business Days)"
                id="formHorizontalRadios2"
                name="shippingMethodCA"
                onChange={() =>
                  changeShippingMethod(
                    'FREE - Tracked Parcel (2 - 4 Business Days)', 
                    0,
                  )
                }
                required
              />
            ) : (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="$10 CAD - Tracked Parcel (2 - 4 Business Days)"
                name="shippingMethodCA"
                id="formHorizontalRadios3"
                onChange={() =>
                  changeShippingMethod(
                    '$10 CAD - Tracked Parcel (2 - 4 Business Days)',
                    10,
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
            {total >= 90 ? (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="FREE - Tracked Parcel (7-14 business days)"
                name="shippingMethodUS4"
                id="formHorizontalRadios4"
                onChange={() =>
                  changeShippingMethod(
                    'FREE - Tracked Parcel (7-14 business days)',
                    0,
                  )
                }
                required
              />
            ) : (
              <Form.Check
                style={{ textAlign: 'center' }}
                type="radio"
                label="$15 CAD - Tracked Parcel (7-14 business days)"
                name="shippingMethodUS5"
                id="formHorizontalRadios5"
                onChange={() =>
                  changeShippingMethod(
                    '$15 CAD - Tracked Parcel (7-14 business days)',
                    15,
                  )
                }
                required
              />
            )}
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
            label="$40 CAD - Tracked Parcel (1-3 weeks)"
            name="shippingMethodOther6"
            id="formHorizontalRadios6"
            onChange={() =>
              changeShippingMethod('$40 CAD - Tracked Parcel (1-3 weeks)', 40)
            }
            required
          />
        </Form.Group>
      )}
    </>
  );
};

CadShippingMethods.propTypes = {
  countryValue: PropTypes.string.isRequired,
  canShipByMail: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  changeShippingMethod: PropTypes.func.isRequired,
};

export default CadShippingMethods;

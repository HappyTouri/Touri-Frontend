import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CreateItem } from "../../../Redux/cityReducer/citySlice";

//Form Validations
const schema = Yup.object().shape({
  city: Yup.string().required("city is Required"),
});

//====== Country Form Component
const FormCity = ({ countryID }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      city: "",
      country_id: countryID || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      values.country_id = countryID;

      dispatch(CreateItem(values));

      formik.resetForm();
    },
  });

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        {/* <!-- Row Add Counry --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={3} lg={3} xl={3}>
                    <label className="">Add City :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder=" "
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={6} xl={6}>
                    <div className="text-center  wd-100">
                      <label className="">&nbsp;</label>
                      <Button
                        className="btn ripple btn-main-primary btn-block"
                        type="submit"
                      >
                        ADD
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row add country --> */}
      </Form>
    </Fragment>
  );
};

FormCity.propTypes = {};

FormCity.defaultProps = {};

export default FormCity;

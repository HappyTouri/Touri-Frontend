import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CreateItem } from "../../../Redux/countryReducer/countrySlice";

//Form Validations
const schema = Yup.object().shape({
  country: Yup.string().required("Country is Required"),
  country_icon: Yup.string().required("Icon is Required"),
});

//====== Country Form Component
const CountryForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      country: "",
      country_icon: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
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
                    <label className="">Add Country :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="country"
                        placeholder=" "
                        value={formik.values.country}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} lg={3} xl={3}>
                    <label className="">Icon Name :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="country_icon"
                        placeholder=" "
                        value={formik.values.country_icon}
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

CountryForm.propTypes = {};

CountryForm.defaultProps = {};

export default CountryForm;

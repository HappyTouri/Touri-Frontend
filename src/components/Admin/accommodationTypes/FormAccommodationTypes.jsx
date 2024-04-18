import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CreateItem } from "../../../Redux/accommodationTypesReducer/accommodationTypesSlice";

//Form Validations
const schema = Yup.object().shape({
  accommodation_type: Yup.string().required("Type is Required"),
});

const FormAccommodationTypes = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      accommodation_type: "",
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
                    <label className="">Add Accommodation Type :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="accommodation_type"
                        placeholder=""
                        value={formik.values.accommodation_type}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={9} lg={9} xl={9}>
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

FormAccommodationTypes.propTypes = {};

FormAccommodationTypes.defaultProps = {};

export default FormAccommodationTypes;

import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CreateItem } from "../../../Redux/tourHeaderReducer/tourHeaderSlice";

//Form Validations
const schema = Yup.object().shape({
  title_EN: Yup.string().required("Title is Required"),
  title_AR: Yup.string().required("Title is Required"),
  title_RU: Yup.string().required("Title is Required"),
  day: Yup.number().required("days is Required"),
});

//====== Country Form Component
const FormTourHeader = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title_EN: "",
      title_AR: "",
      title_RU: "",
      day: "",
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
                    <label className="">English Title :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="title_EN"
                        placeholder=" "
                        value={formik.values.title_EN}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} lg={3} xl={3}>
                    <label className="">Arabic Title :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="title_AR"
                        placeholder=" "
                        value={formik.values.title_AR}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} lg={3} xl={3}>
                    <label className="">Russian Title :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="title_RU"
                        placeholder=" "
                        value={formik.values.title_RU}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1} lg={1} xl={1}>
                    <label className="">Days :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="number"
                        name="day"
                        placeholder=" "
                        value={formik.values.day}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} lg={2} xl={2}>
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

FormTourHeader.propTypes = {};

FormTourHeader.defaultProps = {};

export default FormTourHeader;

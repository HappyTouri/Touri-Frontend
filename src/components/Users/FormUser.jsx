import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CreateItem } from "../../Redux/UsersReducer/UsersSlice";
import Multiselect from "react-select";

//Form Validations
const schema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email Address") // This line validates the email format
    .required("Email is Required"),
  mobile: Yup.string().required("Mobile is Required"),
  country_id: Yup.number().required("Country is Required"),
  role: Yup.string().required("Role is Required"),
});

const roles = [
  {
    value: "admin",
    label: "admin",
  },
  {
    value: "customer",
    label: "customer",
  },
  {
    value: "hotel",
    label: "hotel",
  },
  {
    value: "driver",
    label: "driver",
  },
  {
    value: "tourguide",
    label: "tourguide",
  },
  {
    value: "tour operator",
    label: "tour operator",
  },
  {
    value: "customer service",
    label: "customer service",
  },
  {
    value: "travel agency",
    label: "travel agency",
  },
  ,
];

//====== Country Form Component
const UserForm = () => {
  const dispatch = useDispatch();

  //Selector
  const allCountries = useSelector((state) => state.country?.data);

  // dropdown Countries
  const dropdownOptions = allCountries.map((item) => ({
    value: item.id,
    label: item.country,
  }));

  const handleChangeCountry = (selectedOption) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      country_id: selectedOption.value,
    }));
  };

  const handleChangeRole = (selectedOption) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      role: selectedOption.value,
    }));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      country_id: "",
      role: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
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
                  <Col md={4} lg={4} xl={4}>
                    <label className="">Name :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder=" "
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={4} xl={4}>
                    <label className="">Email :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder=" "
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={4} xl={4}>
                    <label className="">Mobile :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="mobile"
                        placeholder=" "
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="row-sm">
                  <Col md={4} lg={4} xl={4} className="mb-3">
                    <label className="">Country :</label>
                    <Multiselect
                      classNamePrefix="Select2"
                      options={dropdownOptions}
                      singleSelect
                      displayValue="key"
                      onChange={handleChangeCountry}
                    />
                  </Col>
                  <Col md={4} lg={4} xl={4} className="mb-3">
                    <label className="">Role :</label>
                    <Multiselect
                      classNamePrefix="Select2"
                      options={roles}
                      singleSelect
                      displayValue="key"
                      onChange={handleChangeRole}
                    />
                  </Col>
                  <Col
                    md={4}
                    lg={4}
                    xl={4}
                    className="d-flex justify-content-end"
                  >
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

UserForm.propTypes = {};

UserForm.defaultProps = {};

export default UserForm;

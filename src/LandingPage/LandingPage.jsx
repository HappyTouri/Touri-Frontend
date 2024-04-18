import React, { useEffect, useState, useMemo } from "react";
import { MUIdropzonebutton } from "../MUIdropzonebutton";
import Searchable from "react-searchable-dropdown";
import Rating from "@mui/material/Rating";
import * as Yup from "yup";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CreateItem } from "../../Redux/driverReducer/driverSlice";
import { useFormik } from "formik";

const schema = Yup.object().shape({
  name: Yup.string().required("name is Required"),
  mobile: Yup.string().required("mobile is Required"),
  car_model: Yup.string().required("car_model is Required"),
  number_of_seats: Yup.number()
    .max(60)
    .min(2)
    .required("number_of_seats is Required"),
  driver_rate: Yup.number().max(5).min(1).required("driver_rate is Required"),
  driver_price: Yup.number().required("driver_price is Required"),
  note: Yup.string().required("note is Required"),
  city_id: Yup.number().required("city_id is Required"),
  transportation_id: Yup.number().required("transportation_id is Required"),
});

//=========(Add Driver Page)======
export default function AddDriver() {
  const dispatch = useDispatch();

  //Selectors
  const selectedItem = useSelector((state) => state.country?.item);

  //States
  const [urls, setUrls] = useState([]);
  const [urlsCar, setUrlsCar] = useState([]);

  //Get the cities dropdown
  const dropdownCities = useMemo(() => {
    if (!selectedItem || !selectedItem.cities) {
      return [];
    }
    return selectedItem.cities.map((item) => ({
      value: item.id,
      label: item.city,
    }));
  }, [selectedItem]);

  //Get the Transportation Type dropdown
  const dropdownOptionsType = useMemo(() => {
    if (!selectedItem || !selectedItem.transportation_prices) {
      return [];
    }
    return selectedItem.transportation_prices.map((item) => ({
      value: item.transportation.id,
      label: item.transportation.type,
    }));
  }, [selectedItem]);

  const handleSubmitDriver = (files) => {
    if (files) {
      const x = files.map((file) => URL.createObjectURL(file));
      if (x) {
        setUrls(x);

        formik.setValues((prevValues) => ({
          ...prevValues,
          DriverPhoto: files,
        }));
      }
    }
  };
  // console.log(filesDriver, urls);
  const handleSubmitCar = (files) => {
    if (files) {
      const x = files.map((file) => URL.createObjectURL(file));
      if (x) {
        setUrlsCar(x);

        formik.setValues((prevValues) => ({
          ...prevValues,
          CarPhoto: files,
        }));
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      car_model: "",
      number_of_seats: 0,
      driver_rate: 1,
      driver_price: 0,
      note: "",
      city_id: null,
      transportation_id: null,
      DriverPhoto: [],
      CarPhoto: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(CreateItem(values));
      formik.resetForm();
    },
  });
  return (
    <>
      <ToastContainer />

      <Form onSubmit={formik.handleSubmit}>
        {/* <!-- Page Header --> */}
        <Header
          title={"Add Driver"}
          subTitle1={"Add"}
          subTitle2={selectedItem?.country || "loading..."}
        ></Header>
        {/* <!-- End Page Header --> */}

        {/* <!-- Row --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                {/* <!-- Row (1)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <div className="col-sm-4">
                            <label className="">Driver Name :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder=" "
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">Mobile Number :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                type="text"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                placeholder=" "
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">City :</label>
                            <Form.Group className="form-group select2-md">
                              <Searchable
                                className="form-control select2"
                                value="test"
                                placeholder="Choose one" // by default "Search"
                                notFoundText="No result found" // by default "No result found"
                                noInput
                                options={dropdownCities}
                                onSelect={(value) => {
                                  formik.setValues((prevValues) => ({
                                    ...prevValues,
                                    city_id: value,
                                  }));
                                }}
                                listMaxHeight={140} //by default 140
                              />
                            </Form.Group>
                          </div>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <!-- Row (2)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <div className="col-sm-4">
                            <label className="">Transportation Type :</label>
                            <Form.Group className="form-group select2-md">
                              <Searchable
                                className="form-control select2"
                                value="test"
                                placeholder="Choose one" // by default "Search"
                                notFoundText="No result found" // by default "No result found"
                                noInput
                                options={dropdownOptionsType}
                                onSelect={(value) => {
                                  formik.setValues((prevValues) => ({
                                    ...prevValues,
                                    transportation_id: value,
                                  }));
                                }}
                                listMaxHeight={140} //by default 140
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">Car Model :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                type="text"
                                name="car_model"
                                value={formik.values.car_model}
                                onChange={formik.handleChange}
                                placeholder=" "
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">Number of seats :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                type="text"
                                name="number_of_seats"
                                value={formik.values.number_of_seats}
                                onChange={formik.handleChange}
                                placeholder=" "
                              />
                            </Form.Group>
                          </div>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* <!-- Row (3)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <Col md={12} lg={12} xl={12}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <Form.Group className=" mb-0">
                                    <p className="mg-b-10">Note :</p>
                                    <Form.Control
                                      as="textarea"
                                      name="note"
                                      value={formik.values.note}
                                      onChange={formik.handleChange}
                                      rows={4}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <!-- Row (4)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <Col md={3} lg={3} xl={3}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <label className="">Price Per Day :</label>
                                  <Form.Group className=" mb-3">
                                    <Form.Control
                                      type="text"
                                      name="driver_price"
                                      value={formik.values.driver_price}
                                      onChange={formik.handleChange}
                                      placeholder=" "
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <!-- Row (5)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <Col md={12} lg={12} xl={12}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <Rating
                                    name="driver_rate"
                                    size="large"
                                    value={Number(formik.values.driver_rate)}
                                    max={5}
                                    onChange={(ratingValue) => {
                                      formik.setValues((prevValues) => ({
                                        ...prevValues,
                                        driver_rate: ratingValue.target.value,
                                      }));
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <!-- Row (6)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <Col md={12} lg={12} xl={12}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <Form.Group className=" mb-0">
                                    <p className="mg-b-10">Driver Photo :</p>
                                    <MUIdropzonebutton
                                      onSubmit={handleSubmitDriver}
                                      name="Add Driver Photo"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-sm">
                          <Col md={12} lg={12} xl={12}>
                            <Row className="row-sm">
                              {urls.map((items, index) => (
                                <Col
                                  md={6}
                                  lg={6}
                                  sm={6}
                                  xl={3}
                                  className="alert mb-0"
                                  key={index}
                                  data-index={index}
                                >
                                  <div className="card custom-card">
                                    <div className="p-0">
                                      <div className="product-grid">
                                        <div className="product-image">
                                          <img
                                            className="pic-1"
                                            alt="product1"
                                            src={items}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <!-- Row (7)--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <Col md={12} lg={12} xl={12}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <Form.Group className=" mb-0">
                                    <p className="mg-b-10">Car Photos :</p>
                                    <MUIdropzonebutton
                                      onSubmit={handleSubmitCar}
                                      name="Add Car Photos"
                                      number_of_images={6}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <Row className="row-sm">
                      {urlsCar.map((items, index) => (
                        <Col
                          md={6}
                          lg={6}
                          sm={6}
                          xl={3}
                          className="alert mb-0"
                          key={index}
                          data-index={index}
                        >
                          <div className="card custom-card">
                            <div className="p-0">
                              <div className="product-grid">
                                <div className="product-image">
                                  <img
                                    className="pic-1"
                                    alt="product1"
                                    src={items}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row --> */}

        {/* <!-- Row --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <Button
                        type="submit"
                        className="btn ripple btn-main-primary btn-block"
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row --> */}
      </Form>
    </>
  );
}

import React, { Fragment, useEffect, useState, useMemo } from "react";
import TableSingleTour from "./TableSingleTour";
import Header from "../../Header";
import { ToastContainer } from "react-toastify";
import { MUIdropzonebutton } from "../../MUIdropzonebutton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {} from "../../../Redux/offerReducer/offerSlice";
import { Row, Col, Card, Form } from "react-bootstrap";
import Multiselect from "react-select";
import Button from "react-bootstrap/Button";
import AddCustomer from "./AddCustomer";
import { GetALLUsers } from "../../../Redux/UsersReducer/UsersSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Searchable from "react-searchable-dropdown";
import {
  GetSingleOffer,
  Reserve,
  CreatePassportPhotos,
  DeletePassportPhoto,
} from "../../../Redux/offerReducer/offerSlice";
import { constant } from "lodash";

const schema = Yup.object().shape({
  offer_id: Yup.number().required("Offer_id is Required"),
  customer_id: Yup.number().required("Customer_id is Required"),
  number_of_people: Yup.number()
    .max(30)
    .min(1)
    .required("number_of_People is Required"),
  note: Yup.string().required("note is Required"),
});

const CreateReservation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { item } = useSelector((state) => state.offer);
  const { data, created } = useSelector((state) => state.user);
  console.log(item);

  //States
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [urlsCar, setUrlsCar] = useState([]);
  const [customer, setCustomer] = useState();
  // console.log(customer);

  //Dropdown users by Email
  const dropdownUserEmails = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.map((item) => ({
      value: item.id,
      label: item.email,
    }));
  }, [data]);

  //Dropdown users by Email
  const dropdownUserMobile = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.map((item) => ({
      value: item.id,
      label: item.mobile,
    }));
  }, [data]);

  //handel supmit passport photos
  const handleSubmipassportPhotos = (files) => {
    if (files) {
      if (files) {
        const data = { id: id, passports: files };
        dispatch(CreatePassportPhotos(data));
      }
    }
  };

  //handel delete passport photo
  const handleDeletePhoto = (id) => {
    dispatch(DeletePassportPhoto(id));
  };

  // Handle dropdown selection
  const handelSelectedCustomer = (selected) => {
    // Use the selected value to filter the data
    const filtered = data.find((item) => item.id === selected);
    setCustomer(filtered);
    formik.setValues((prevValues) => ({
      ...prevValues,
      customer_id: selected,
    }));
  };

  // Handel close add Customer
  const handelClose = () => {
    setShowFormAdd(false);
  };

  // Submit
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

  //Use Effect
  useEffect(() => {
    if (id) {
      dispatch(GetSingleOffer(id));
      dispatch(GetALLUsers());
    }
  }, [dispatch, id, created]);

  //Formik
  const formik = useFormik({
    initialValues: {
      offer_id: id,
      customer_id: "",
      number_of_people: "",
      note: "",
      // pasport_photos: [],
      // airticket_photos: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: values.offer_id, data: values };
      // console.log(data);
      dispatch(Reserve(data));
      formik.resetForm();
    },
  });

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <ToastContainer />
        <AddCustomer show={showFormAdd} handelClose={handelClose} />
        <Header
          title={"Add Reservation"}
          subTitle1={item?.country?.country || "loading..."}
          subTitle2={item?.tour_header?.title_EN || "loading..."}
        ></Header>

        <TableSingleTour
          data={item?.tour_details}
          tableTitle={item?.tour_title}
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <div>
                  <h6 className="main-content-label mb-3">Select Customer :</h6>
                </div>
                <Row className="row-sm mg-b-20">
                  <Col lg={4} className="">
                    <p className="mg-b-10">By Email</p>
                    <Multiselect
                      classNamePrefix="Select2"
                      options={dropdownUserEmails}
                      singleSelect
                      displayValue="key"
                      onChange={(selected) => {
                        handelSelectedCustomer(selected.value);
                      }}
                    />
                  </Col>
                  <Col lg={4} className=" mg-t-20 mg-lg-t-0">
                    <p className="mg-b-10">By Mobile Number</p>
                    <Multiselect
                      classNamePrefix="Select2"
                      options={dropdownUserMobile}
                      singleSelect
                      displayValue="key"
                      onChange={(selected) => {
                        handelSelectedCustomer(selected.value);
                      }}
                    />
                  </Col>
                  <Col
                    lg={4}
                    className=" mg-t-20 mg-lg-t-0  d-flex justify-content-end align-items-end"
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        setShowFormAdd(true);
                      }}
                    >
                      Add New Customer
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {customer && (
          <>
            {" "}
            <Row className="row-sm">
              <Col lg={12} md={12}>
                <Card className="custom-card">
                  <Card.Body>
                    <div>
                      <h6 className="main-content-label mb-3">
                        Selected Customer :
                      </h6>
                    </div>
                    <Row className="row-sm mg-b-20">
                      <div className="mb-2">
                        <i className="si si-user  me-2 text-success"></i>
                        <span>{customer.name}</span>
                      </div>
                      <div className="mb-2">
                        <i className="si si-phone  me-2 text-success"></i>
                        <span>{customer.mobile}</span>
                      </div>
                      <div>
                        <i className="fe fe-mail  me-2 text-success"></i>
                        <span>{customer.email}</span>
                      </div>
                    </Row>
                    <Row className="row-sm">
                      <div className="col-sm-4">
                        <label className="">Number Of People :</label>
                        <Form.Group className=" mb-3">
                          <Form.Control
                            type="number"
                            name="number_of_people"
                            value={formik.values.number_of_people}
                            onChange={formik.handleChange}
                            min={1}
                            max={30}
                            placeholder=" "
                          />
                        </Form.Group>
                      </div>
                    </Row>
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
                    {/* <!-- Row (7) hotel Photos--> */}
                    <div className="mb-4">
                      <Row className="row-sm mb-2">
                        <div className="pos-relative">
                          <Form.Group className=" mb-0">
                            <MUIdropzonebutton
                              onSubmit={handleSubmipassportPhotos}
                              name="Add Passport Photos"
                              number_of_images={6}
                            />
                          </Form.Group>
                        </div>
                      </Row>
                      <Row className="row-sm ">
                        <div className="d-flex align-items-center flex-wrap ">
                          {item?.passports &&
                            item.passports.map((items, index) => (
                              <div
                                key={index}
                                className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                              >
                                <img
                                  src={
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/passports/" +
                                    items.photo
                                  }
                                  alt={`Photo ${index}`}
                                  className="img-fluid rounded pos-absolute"
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                                <Button
                                  className="pos-absolute z-index-10"
                                  type="button"
                                  variant="danger"
                                  onClick={() => {
                                    handleDeletePhoto(items.id);
                                  }}
                                >
                                  <i className="fe fe-x"></i>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </Row>
                    </div>
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
          </>
        )}
      </Form>
    </Fragment>
  );
};

CreateReservation.propTypes = {};

CreateReservation.defaultProps = {};

export default CreateReservation;

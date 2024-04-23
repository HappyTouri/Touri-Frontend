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
  CreateAirticketPhotos,
  DeleteAirticketPhoto,
} from "../../../Redux/offerReducer/offerSlice";

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
  const { item, created, deleted, updated } = useSelector(
    (state) => state.offer
  );
  const { data, createdUser } = useSelector((state) => state.user);
  // console.log(selectedItem);

  //States
  const [showFormAdd, setShowFormAdd] = useState(false);
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

  // handleSubmiAirticketsPhotos
  const handleSubmiAirticketsPhotos = (files) => {
    if (files) {
      if (files) {
        const data = { id: id, air_tickets: files };
        dispatch(CreateAirticketPhotos(data));
      }
    }
  };

  //handel delete airTickets photo
  const handleDeleteAirticket = (id) => {
    dispatch(DeleteAirticketPhoto(id));
  };

  // Handle dropdown selection
  const handelSelectedCustomer = (selected) => {
    const values = {
      offer_id: id,
      customer_id: selected,
      number_of_people: 0,
      note: "",
    };
    const data = { id: id, data: values };
    dispatch(Reserve(data));

    formik.setValues((prevValues) => ({
      ...prevValues,
      customer_id: selected,
    }));
  };

  // Handel close add Customer
  const handelClose = () => {
    setShowFormAdd(false);
  };

  //Use Effect
  useEffect(() => {
    if (id) {
      dispatch(GetSingleOffer(id));
      dispatch(GetALLUsers());
    }
  }, [dispatch, id, created, deleted, createdUser, updated]);

  //Formik
  const formik = useFormik({
    initialValues: {
      offer_id: id,
      customer_id: item?.customer_id || 0,
      number_of_people: item?.number_of_people || 0,
      note: item?.note || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: values.offer_id, data: values };
      // console.log(data);
      dispatch(Reserve(data));
      formik.resetForm();
    },
  });

  useEffect(() => {
    formik.setValues({
      offer_id: id,
      customer_id: item?.customer_id || 0,
      number_of_people: item?.number_of_people || 0,
      note: item?.note || "",
    });
  }, [item]);
  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <ToastContainer />
        <AddCustomer
          countryID={selectedItem.id}
          show={showFormAdd}
          handelClose={handelClose}
        />
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
                    <span>{item?.customer?.name || "- - - - - -"}</span>
                  </div>
                  <div className="mb-2">
                    <i className="si si-phone  me-2 text-success"></i>
                    <span>{item?.customer?.mobile || "- - - - - -"}</span>
                  </div>
                  <div>
                    <i className="fe fe-mail  me-2 text-success"></i>
                    <span>{item?.customer?.email || "- - - - - -"}</span>
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
                {/* <!-- Row (8) hotel Photos--> */}
                <div className="mb-4">
                  <Row className="row-sm mb-2">
                    <div className="pos-relative">
                      <Form.Group className=" mb-0">
                        <MUIdropzonebutton
                          onSubmit={handleSubmiAirticketsPhotos}
                          name="Add Airtickets Photos"
                          number_of_images={6}
                        />
                      </Form.Group>
                    </div>
                  </Row>
                  <Row className="row-sm ">
                    <div className="d-flex align-items-center flex-wrap ">
                      {item?.airtickets &&
                        item.airtickets.map((items, index) => (
                          <div
                            key={index}
                            className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                          >
                            <img
                              src={
                                process.env.REACT_APP_API_BASE_URL +
                                "/air_tickets/" +
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
                                handleDeleteAirticket(items.id);
                              }}
                            >
                              <i className="fe fe-x"></i>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </Row>
                </div>
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
      </Form>
    </Fragment>
  );
};

CreateReservation.propTypes = {};

CreateReservation.defaultProps = {};

export default CreateReservation;

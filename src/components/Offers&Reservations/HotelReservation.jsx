import React, { Fragment, useEffect, useState, useMemo } from "react";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GetSingleOffer } from "../../Redux/offerReducer/offerSlice";
import { Row, Col, Card, Form, Table } from "react-bootstrap";
import { MUIdropzonebutton } from "../MUIdropzonebutton";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Searchable from "react-searchable-dropdown";
import {
  CreateConfirmationPhotos,
  CreateInvoicePhotos,
  CreatePaymentPhotos,
  DeleteConfirmationPhoto,
  DeleteInvoicePhoto,
  DeletePaymentPhoto,
} from "../../Redux/offerReducer/offerSlice";

const HotelReservation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { item, created, deleted, updated } = useSelector(
    (state) => state.offer
  );
  // console.log(item);
  // States
  const [hotelsSlice, setHotelsSlice] = useState();

  // console.log(hotelsSlice);
  // Function to calculate the number of days from a given date
  function calculateDaysFromToday(from, till) {
    const fromDate = new Date(from);
    const tillDate = new Date(till);

    // Calculate the difference in time (milliseconds) and convert to days
    const differenceInTime = tillDate - fromDate;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  }

  // Function to update the 'till' date by adding one day
  const updateTillDate = (array) => {
    // Use map to iterate through the array and update each object
    return array.map((current) => {
      // Create a copy of the current object
      const updatedCurrent = { ...current };

      // Check if the 'till' key is present
      if (updatedCurrent.till) {
        // Parse the 'till' date as a Date object
        const tillDate = new Date(updatedCurrent.till);

        // Add one day to the 'till' date
        tillDate.setDate(tillDate.getDate() + 1);

        // Format the updated date as a string in the format "YYYY-MM-DD"
        updatedCurrent.till = tillDate.toISOString().split("T")[0];
      }

      // Return the updated object
      return updatedCurrent;
    });
  };

  // Remove duplicated hotels
  const processArray = (array) => {
    const processedArray = [];
    for (let i = 0; i < array.length; i++) {
      const current = array[i];
      if (i === 0) {
        const currentCopy = { ...current, till: current.date };
        processedArray.push(currentCopy);
      } else {
        const previous = processedArray[processedArray.length - 1];
        if (current.accommodation_id === previous.accommodation_id) {
          previous.till = current.date;
        } else {
          const currentCopy = { ...current, till: current.date };
          processedArray.push(currentCopy);
        }
      }
    }
    const filteredArray = processedArray.filter(
      (obj) => obj.accommodation_id !== null
    );
    const updatedearray = updateTillDate(filteredArray);

    updatedearray.forEach((tour) => {
      // Calculate the number of days from the date in the tour object to today
      const daysFromToday = calculateDaysFromToday(tour.date, tour.till);
      tour.numberOfDays = daysFromToday;
      tour.customer_name = item?.customer?.name;
      tour.Number_of_people = item?.number_of_people;
    });

    return updatedearray;
  };

  // Handler to update note in hotelsSlice at a specific index
  const handleNoteChange = (index, newNote) => {
    const updatedHotelsSlice = [...hotelsSlice];
    updatedHotelsSlice[index].note = newNote;
    setHotelsSlice(updatedHotelsSlice);
  };

  //handel supmit Confirmation  photos
  const handleSubmitConfirmationPhotos = (files, id) => {
    console.log(id);
    console.log(files);
    if (files) {
      const data = { id: id, confirmation_photos: files };
      dispatch(CreateConfirmationPhotos(data));
    }
  };

  //handel supmit invoice  photos
  const handleSubmitInvoicePhotos = (files, id) => {
    console.log(id);
    console.log(files);
    if (files) {
      const data = { id: id, invoice_photos: files };
      dispatch(CreateInvoicePhotos(data));
    }
  };

  //handel supmit payment  photos
  const handleSubmitPaymentPhotos = (files, id) => {
    console.log(id);
    console.log(files);
    if (files) {
      const data = { id: id, payment_photos: files };
      dispatch(CreatePaymentPhotos(data));
    }
  };

  useEffect(() => {
    if (item?.tour_details) {
      setHotelsSlice(processArray(item?.tour_details));
    }
  }, [item]);

  //Use Effect
  useEffect(() => {
    if (id) {
      dispatch(GetSingleOffer(id));
    }
  }, [dispatch, id, created, deleted]);

  return (
    <Fragment>
      <ToastContainer />

      <Header
        title={"Hotel Reservation"}
        subTitle1={item?.country?.country || "loading..."}
        subTitle2={item?.tour_title || "loading..."}
      ></Header>

      {hotelsSlice &&
        hotelsSlice.map((itemD, index) => (
          <Row key={index} className="row-sm">
            <Col lg={12} md={12}>
              <Card className="custom-card">
                <Card.Body>
                  <div className="d-flex align-items-center flex-wrap mb-3 ">
                    <span className="bg-success p-1 rounded me-2">
                      {index + 1}
                    </span>
                    <span className="tx-20 me-2 ">
                      {itemD?.accommodation?.name || "Loading"}
                    </span>
                    <i className="fa fa-arrow-right  me-4 text-success"></i>
                    <i className="si si-phone  me-1 text-success"></i>
                    <span className=" me-3 ">
                      {itemD?.accommodation?.mobile || "Loading"}
                    </span>
                    <i className="si si-envelope  me-1 text-success"></i>
                    <span className=" me-3 flex-grow-1">
                      {itemD.accommodation?.email || "Loading"}
                    </span>
                    {itemD?.available == 0 ? (
                      <Link
                        to="#"
                        className="btn btn-sm btn-primary me-1"
                        onClick={() => {
                          console.log(hotelsSlice[index]);
                        }}
                      >
                        Send Email
                      </Link>
                    ) : (
                      <Link
                        to="#"
                        className="btn btn-sm btn-danger me-1"
                        onClick={() => {
                          console.log(hotelsSlice[index]);
                        }}
                      >
                        Cancel Email
                      </Link>
                    )}
                  </div>
                  <div className="d-flex align-items-center flex-wrap mb-3 bg-primary-transparent p-2 rounded ">
                    <span className="me-2 ">Number of Days :</span>
                    <span className=" me-3  text-primary">
                      {itemD?.numberOfDays || "Loading"}
                    </span>
                    <span className="me-2 ">From :</span>
                    <span className=" me-3  text-primary">
                      {itemD?.date || "Loading"}
                    </span>
                    <span className="me-2 ">Till :</span>
                    <span className=" me-3  text-primary">
                      {itemD?.till || "Loading"}
                    </span>
                    <span className="me-2 ">Number of People :</span>
                    <span className=" me-3  text-primary">
                      {item?.number_of_people || "Loading"}
                    </span>
                  </div>
                  <div>
                    Number of Rooms : {itemD?.number_of_room || "Loading"}{" "}
                  </div>
                  <div className=" mb-2 bg-primary-transparent p-2 rounded">
                    {itemD?.r_room_categories.map((itemR, index) => (
                      <div
                        key={index}
                        className="p-1 d-flex align-items-center flex-wrap"
                      >
                        <span className="me-2">{index + 1}.</span>
                        <span className="me-3 text-primary ">
                          {itemR?.room_category?.room_category?.room_category ||
                            "Loading"}
                        </span>
                        {itemR?.extra_bed !== 0 && (
                          <span className="me-2">with extra bed</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <Form.Group className=" mb-0 mt-3">
                    <p className="mg-b-10">Email Note :</p>
                    <Form.Control
                      as="textarea"
                      name="note"
                      // value={}
                      onChange={(e) => {
                        handleNoteChange(index, e.target.value);
                      }}
                      rows={4}
                    />
                  </Form.Group>

                  {(itemD?.available == 0 ||
                    itemD?.accommodation?.accommodation_type?.id !== 1) && (
                    <>
                      <Row className="row-sm mt-3">
                        <div className="pos-relative">
                          <Form.Group className=" mb-0">
                            <MUIdropzonebutton
                              onSubmit={(files) => {
                                handleSubmitConfirmationPhotos(
                                  files,
                                  hotelsSlice[index].id
                                );
                              }}
                              name="Confirmation"
                              number_of_images={6}
                            />
                          </Form.Group>
                        </div>
                      </Row>
                      <Row className="row-sm mt-1 ">
                        <div className="d-flex align-items-center flex-wrap ">
                          {itemD?.confirmation &&
                            itemD?.confirmation.map((items, index) => (
                              <div
                                key={index}
                                className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                              >
                                <img
                                  src={
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/confirmation_photos/" +
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
                                    dispatch(DeleteConfirmationPhoto(items.id));
                                  }}
                                >
                                  <i className="fe fe-x"></i>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </Row>
                      <Row className="row-sm mt-3">
                        <div className="pos-relative d-flex">
                          <Form.Group className=" mb-0 me-3">
                            <MUIdropzonebutton
                              onSubmit={(files) => {
                                handleSubmitInvoicePhotos(
                                  files,
                                  hotelsSlice[index].id
                                );
                              }}
                              name="Invoice"
                              number_of_images={6}
                            />
                          </Form.Group>
                          <Form.Control
                            className="wd-100"
                            value=""
                            type="number"
                            placeholder=" "
                            onChange={(e) => {}}
                          />
                        </div>
                      </Row>
                      <Row className="row-sm mt-1 ">
                        <div className="d-flex align-items-center flex-wrap ">
                          {itemD?.invoice &&
                            itemD?.invoice.map((items, index) => (
                              <div
                                key={index}
                                className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                              >
                                <img
                                  src={
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/invoice_photos/" +
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
                                    dispatch(DeleteInvoicePhoto(items.id));
                                  }}
                                >
                                  <i className="fe fe-x"></i>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </Row>
                      <Row className="row-sm mt-3">
                        <div className="pos-relative d-flex">
                          <Form.Group className=" mb-0 me-3 ">
                            <MUIdropzonebutton
                              onSubmit={(files) => {
                                handleSubmitPaymentPhotos(
                                  files,
                                  hotelsSlice[index].id
                                );
                              }}
                              name="Payment"
                              number_of_images={6}
                            />
                          </Form.Group>
                          <Form.Control
                            className="wd-100"
                            value=""
                            type="number"
                            placeholder=" "
                            onChange={(e) => {}}
                          />
                        </div>
                      </Row>
                      <Row className="row-sm mt-1 ">
                        <div className="d-flex align-items-center flex-wrap ">
                          {itemD?.payment &&
                            itemD?.payment.map((items, index) => (
                              <div
                                key={index}
                                className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                              >
                                <img
                                  src={
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/payment_photos/" +
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
                                    dispatch(DeletePaymentPhoto(items.id));
                                  }}
                                >
                                  <i className="fe fe-x"></i>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
    </Fragment>
  );
};

HotelReservation.propTypes = {};

HotelReservation.defaultProps = {};

export default HotelReservation;

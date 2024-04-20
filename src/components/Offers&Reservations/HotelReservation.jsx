import React, { Fragment, useEffect, useState, useMemo } from "react";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GetSingleOffer } from "../../Redux/offerReducer/offerSlice";
import { Row, Col, Card, Form, Table } from "react-bootstrap";
import Multiselect from "react-select";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Searchable from "react-searchable-dropdown";

const HotelReservation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { item, created, deleted, updated } = useSelector(
    (state) => state.offer
  );

  // States
  const [hotelsSlice, setHotelsSlice] = useState();

  //   console.log(item?.tour_details);
  // console.log(hotelsSlice);
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
    return updatedearray;
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
  }, [dispatch, id]);

  return (
    <Fragment>
      <ToastContainer />

      <Header
        title={"Hotel Reservation"}
        subTitle1={item?.country?.country || "loading..."}
        subTitle2={item?.tour_header?.title_EN || "loading..."}
      ></Header>

      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-3">Select Customer :</h6>
              </div>
              <Row>
                <Col xl={12}>
                  <div className="table-responsive">
                    <Table className="mb-0 border-top table-bordered text-nowrap">
                      <tbody>
                        {hotelsSlice &&
                          hotelsSlice.map((item, index) => (
                            <tr key={index}>
                              <th className="wd-10 ">
                                <div>
                                  <span className="bg-success p-1 rounded me-1">
                                    {index + 1}
                                  </span>
                                  <span className="text-primary me-3 ">
                                    {item?.accommodation?.name || "Loading"}
                                  </span>
                                  <span className="text-primary  me-3">
                                    {item?.date || "Loading"}
                                  </span>
                                  <span className="text-primary  me-3">
                                    {item?.till || "Loading"}
                                  </span>
                                  <Link
                                    to="#"
                                    className="btn btn-sm btn-danger me-1"
                                    onClick={() => {
                                      console.log(hotelsSlice[index]);
                                    }}
                                  >
                                    <i className="fe fe-trash"></i>
                                  </Link>
                                </div>
                              </th>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

HotelReservation.propTypes = {};

HotelReservation.defaultProps = {};

export default HotelReservation;

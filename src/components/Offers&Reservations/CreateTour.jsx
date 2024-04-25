import React, { useEffect, useState, useMemo } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Searchable from "react-searchable-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Datepicker } from "./Datepicker";
import Header from "../Header";
import { GetALLItems } from "../../Redux/accommodationReducer/accommodationSlice";
import { GetALLTourHeader } from "../../Redux/tourHeaderReducer/tourHeaderSlice";
import { GetALLToursItems } from "../../Redux/TourReducer/tourSlice";
import FirstRow from "./FirstRow";
import { validateData } from "./ValidateTourData";
import { toast } from "react-toastify";
import { CreateItem, UpdateItem } from "../../Redux/offerReducer/offerSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GetSingleOffer } from "../../Redux/offerReducer/offerSlice";
import EditTour from "./EditTour";
//=======================================================================================
import {
  handleChange_website_share,
  handleChange_tour_name,
  handleChange_transportation_id,
  handleChange_from_date,
  Get_tour_headers,
  handleChange_inc,
  handleChange_dec,
  handleChange_profit_price,
  calculateTransportationPrice,
  calculateTotalPrice,
  set_country_id,
  set_edit,
  resetState,
  set_operator_id,
} from "./TourSlice";

//============(Create Tour Page)
export default function CreateTour() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const tourId = id ? id : 0; // If id is undefined, set it to 0

  // Selectors
  const selectedItem = useSelector((state) => state.country.item);
  const TourHeaders = useSelector((state) => state.tourHeader.data);
  const { data } = useSelector((state) => state.c_tour);
  const { item } = useSelector((state) => state.offer);
  const operator = useSelector((state) => state.auth.user);

  const websiteShare = useSelector((state) => state.c_tour.data?.website_share);

  // console.log(data);

  // Memoize the checkbox value based on websiteShare state
  const websiteShareChecked = useMemo(() => {
    return websiteShare === 1;
  }, [websiteShare]);

  // const websiteShare = useMemo(() => {
  //   return data?.website_share == 1 ? true : false;
  // }, [data?.website_share]);
  // console.log(websiteShare);

  //Dropdown Tour Transportation Types Depend on country
  const dropdownTransportationTypes = useMemo(() => {
    if (!selectedItem || !selectedItem.transportation_prices) {
      return [];
    }
    return selectedItem.transportation_prices.map((item) => ({
      value: item.transportation.id,
      label: item.transportation.type,
    }));
  }, [selectedItem]);

  //handleChange_transportation_type_dropdown
  const transportationTypetChange = (select) => {
    // Find all transportation Ptices by transportation ID
    const selectedPrice = selectedItem.transportation_prices.find((item) => {
      return item.transportation_id === select;
    });
    console.log(select, selectedPrice.price);
    dispatch(
      handleChange_transportation_id({ id: select, price: selectedPrice.price })
    );
    dispatch(calculateTransportationPrice());
    dispatch(calculateTotalPrice());
  };

  //handleChange_From Date handel change
  const FromDateChange = (select) => {
    const till = new Date(select);
    till.setDate(till.getDate() + data.number_of_days - 1);
    const tillDate = till.toISOString().split("T")[0];

    dispatch(handleChange_from_date({ from: select, till: tillDate }));
  };

  useEffect(() => {
    dispatch(GetALLTourHeader());
    dispatch(GetALLToursItems(selectedItem.id));
    dispatch(GetALLItems(selectedItem.id));
    dispatch(set_country_id(selectedItem.id));
    dispatch(set_operator_id(operator.id));
  }, [dispatch, selectedItem.id, operator]);

  useEffect(() => {
    if (id && item && selectedItem) {
      dispatch(set_edit(EditTour(item, selectedItem)));
    }
  }, [item, selectedItem]);

  useEffect(() => {
    if (id) {
      dispatch(GetSingleOffer(id));
    } else {
      // dispatch(resetState());
    }
    dispatch(Get_tour_headers(TourHeaders));
  }, [TourHeaders, id]);

  const submitData = () => {
    console.log(data);
    if (validateData(data)) {
      if (id) {
        const offerData = { id, data };
        dispatch(UpdateItem(offerData));
      } else {
        dispatch(CreateItem(data));
      }

      if (data.website_share == 1) {
        navigate(`/website-offers/`);
      } else {
        navigate(`/all-packages/`);
      }
    }
  };

  //(RETURN)===============================================================
  return (
    <>
      <div className="pos-relative">
        <ToastContainer />
        {/* <!-- Page Header --> */}
        <Header
          title={tourId === 0 ? "Create Tour" : "Edit Tour"}
          subTitle1={tourId === 0 ? "Create Tour" : "Edit Tour"}
          subTitle2={selectedItem.country}
        >
          <label className=" custom-control custom-checkbox  flex-grow-1 mb-0">
            <>
              <input
                type="checkbox"
                className="custom-control-input"
                name="example-checkbox1"
                value="option1"
                defaultChecked={websiteShareChecked}
                onChange={(e) =>
                  dispatch(handleChange_website_share(e.target.checked))
                }
              />
            </>

            <span className="custom-control-label custom-control-label-md  tx-16">
              Share on Website
            </span>
          </label>
        </Header>
        {/* <!--End Page Header --> */}
        {/* <!-- Row offer --> */}
        <Row className="row-sm z-index-200">
          <Col lg={12} md={12}>
            <Card className=" custom-card ">
              <Card.Body>
                <Row className="row-sm ">
                  <Col md={12} lg={12} xl={12}>
                    <Row className="p-1 m-0  align-items-center">
                      <Col md={12} lg={5} xl={5} className="p-1">
                        <label className="">Tour Name :</label>
                        <Form.Group className=" mb-3">
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={data.tour_name}
                            onChange={(e) => {
                              dispatch(handleChange_tour_name(e.target.value));
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} lg={5} xl={5} className="p-1">
                        <label className="">Tour Title :</label>
                        <Form.Group className=" mb-3">
                          <Form.Control
                            type="text"
                            placeholder={data?.tour_header_name || " "}
                            value=""
                            readOnly={true}
                            onChange={(e) => {}}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} lg={2} xl={2} className="p-1 z-index-150">
                        <label className="">Transportation Type :</label>
                        <Form.Group className="form-group select2-md mb-3 ">
                          <Searchable
                            className="form-control select2"
                            value={data?.transportation_id}
                            placeholder={id ? data?.transportation_name : " "}
                            notFoundText="No result found" // by default "No result found"
                            noInput
                            options={dropdownTransportationTypes}
                            onSelect={transportationTypetChange}
                            listMaxHeight={170} //by default 140
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="p-1 m-0  align-items-center "></Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row offer--> */}

        {/* <!-- Row Tour Details--> */}
        <Row className="row-sm z-index-100">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="form-group">
                      <Row className="row-sm pos-relative">
                        {/* main layout */}
                        <div className="rounded-5 text-center p-1 bg-primary-transparent ">
                          <Row className="row-sm ">
                            <div className="d-flex flex-wrap pos-relative ">
                              <div className="d-flex align-items-center m-2 z-index-50">
                                <Button
                                  className="d-lg-none d-xl-block"
                                  variant="light"
                                  type="button"
                                >
                                  <i className="fe fe-calendar lh--9 op-6"></i>
                                </Button>
                                <Datepicker
                                  className="form-control"
                                  selected={new Date()}
                                  value={data.from}
                                  onChange={FromDateChange}
                                  showTimeSelect
                                  dateFormat="Pp"
                                />
                              </div>

                              <div className="d-flex align-items-center m-2">
                                <Button
                                  className="d-lg-none d-xl-block"
                                  variant="light"
                                  type="button"
                                >
                                  <i className="fe fe-calendar lh--9 op-6"></i>
                                </Button>
                                <Datepicker
                                  className="form-control"
                                  ReadOnly={true}
                                  value={data.till}
                                  selected={data.till}
                                  // onChange={(date) => setStartDate(date)}
                                  showTimeSelect
                                />
                              </div>
                              <div
                                className="handle-counter flex-grow-1 d-flex justify-content-md-end m-2  "
                                id="handleCounter"
                              >
                                {data.from && (
                                  <>
                                    <Button
                                      variant="light"
                                      className="counter-minus "
                                      onClick={() => {
                                        dispatch(handleChange_dec());
                                        dispatch(
                                          calculateTransportationPrice()
                                        );
                                        dispatch(calculateTotalPrice());
                                      }}
                                    >
                                      -
                                    </Button>
                                    <input
                                      type="number"
                                      className="form-control no-spinner "
                                      value={data.number_of_days}
                                      min={0}
                                      max={30}
                                      onChange={(e) => {}}
                                      readOnly
                                    />
                                    <Button
                                      variant="light"
                                      className="counter-plus "
                                      onClick={() => {
                                        dispatch(handleChange_inc());
                                        dispatch(
                                          calculateTransportationPrice()
                                        );
                                        dispatch(calculateTotalPrice());
                                      }}
                                    >
                                      +
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </Row>
                        </div>
                        {data?.tourDetails.map((item, index) => (
                          <div key={index} className="bd bd-t-0 p-4">
                            <FirstRow item={item} index={index} />
                          </div>
                        ))}
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <!-- End Row --> */}

        {/* <!-- Row Prices --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <Row className="p-1 m-0  align-items-center">
                      <Col xxl={2} className="p-1">
                        <label className="">Transportation Price :</label>
                        <Form.Group className=" ">
                          <Form.Control
                            value={data.transportation_price}
                            type="text"
                            placeholder=" "
                            readOnly={true}
                            onChange={(e) => {}}
                          />
                        </Form.Group>
                      </Col>
                      <Col xxl={2} className="p-1">
                        <label className="">Tourguide Price :</label>
                        <Form.Group className=" ">
                          <Form.Control
                            value={data.tourguide_price}
                            type="text"
                            placeholder=" "
                            readOnly={true}
                            onChange={(e) => {}}
                          />
                        </Form.Group>
                      </Col>
                      <Col xxl={2} className="p-1">
                        <label className="">Hotels Price :</label>
                        <Form.Group className=" ">
                          <Form.Control
                            value={data.hotels_price}
                            type="text"
                            placeholder=" "
                            readOnly={true}
                            onChange={(e) => {}}
                          />
                        </Form.Group>
                      </Col>
                      <Col xxl={2} className="p-1">
                        <label className="">Profit Price :</label>
                        <Form.Group className=" ">
                          <Form.Control
                            value={data.profit_price}
                            type="number"
                            placeholder=" "
                            onChange={(e) => {
                              dispatch(
                                handleChange_profit_price(e.target.value)
                              );
                              dispatch(calculateTotalPrice());
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col xxl={4} className="p-1">
                        <label className="">Total Price :</label>
                        <Form.Group className=" ">
                          <Form.Control
                            value={data.total_price}
                            type="text"
                            placeholder=" "
                            onChange={(e) => {}}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row --> */}
        {/* <!-- Row Submit--> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <Button
                        className="btn ripple btn-main-primary btn-block"
                        onClick={submitData}
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
      </div>
    </>
  );
}

import React, { Fragment, useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../Header";
import { useParams } from "react-router-dom";
import { MUIdropzonebutton } from "../MUIdropzonebutton";
import { useDispatch, useSelector } from "react-redux";
import Searchable from "react-searchable-dropdown";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  getSingle,
  UpdateItem,
  CreatePhotos,
  DeletePhoto,
} from "../../Redux/TourReducer/tourSlice";
import { Button, Card, Col, Form, Row, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

//Form Validations
const schema = Yup.object().shape({
  video_link: Yup.string().required("Link is Required"),
  tour_title_EN: Yup.string().required("tour_title_EN is Required"),
  tour_description_EN: Yup.string().required("tour_description_EN is Required"),
  tour_title_AR: Yup.string().required("tour_title_AR is Required"),
  tour_description_AR: Yup.string().required("tour_description_AR is Required"),
  tour_title_RU: Yup.string().required("tour_title_RU is Required"),
  tour_description_RU: Yup.string().required("tour_description_RU is Required"),
  tour_title_local: Yup.string().required("tour_title_local is Required"),
  tour_description_local: Yup.string().required(
    "tour_description_local is Required"
  ),
});

// ========= (Edit Tour Page)
export default function EditTour() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { item, deletedPhoto, createdPhoto } = useSelector(
    (state) => state.tour
  );

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

  //feach to get single item information
  useEffect(() => {
    dispatch(getSingle(id));
  }, [dispatch, deletedPhoto, createdPhoto]);

  //add Photos
  const handleSubmit = (files) => {
    const data = { tour_id: id, images: files };
    dispatch(CreatePhotos(data));
  };

  const formik = useFormik({
    initialValues: {
      video_link: item?.video_link || "",
      tour_title_EN: item?.tour_title_EN || "",
      tour_description_EN: item?.tour_description_EN || "",
      tour_title_AR: item?.tour_title_AR || "",
      tour_description_AR: item?.tour_description_AR || "",
      tour_title_RU: item?.tour_title_RU,
      tour_description_RU: item?.tour_description_RU || "",
      tour_title_local: item?.tour_title_local || "",
      tour_description_local: item?.tour_description_local || "",
      city_id: item?.city_id || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: item.id, data: values };
      dispatch(UpdateItem(data));

      // navigate(`/accommodation/all/`);
    },
  });

  useEffect(() => {
    formik.setValues({
      video_link: item?.video_link || "",
      tour_title_EN: item?.tour_title_EN || "",
      tour_description_EN: item?.tour_description_EN || "",
      tour_title_AR: item?.tour_title_AR || "",
      tour_description_AR: item?.tour_description_AR || "",
      tour_title_RU: item?.tour_title_RU || "",
      tour_description_RU: item?.tour_description_RU || "",
      tour_title_local: item?.tour_title_local || "",
      tour_description_local: item?.tour_description_local || "",
      city_id: item?.city_id || "",
    });
  }, [item]);
  return (
    <>
      <ToastContainer />

      <Form onSubmit={formik.handleSubmit}>
        {/* <!-- Page Header --> */}
        <Header
          title={"Edit Tour"}
          subTitle1={"Edit"}
          subTitle2={item.tour_title_EN}
        >
          {
            <ButtonGroup aria-label="Basic example" role="group">
              <Button variant="primary" className=" pd-x-25" type="button">
                <Link to={`/all-tours/`} className="btn btn-sm  ">
                  Back
                </Link>
              </Button>
            </ButtonGroup>
          }
        </Header>
        {/* <!-- End Page Header --> */}

        {/* <!-- Row  --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <div className="col-sm-4">
                            <label className="">City :</label>
                            <Form.Group className="form-group  select2-md">
                              <Searchable
                                style={{ zIndex: "0 !important" }}
                                className="form-control layer select2"
                                // value={item.city?.id}
                                placeholder={item.city?.city} // by default "Search"
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
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">Video Link :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                className="form-control"
                                required=""
                                type="text"
                                name="video_link"
                                placeholder=" "
                                value={formik.values?.video_link}
                                onChange={formik.handleChange}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">Add Images :</label>
                            <MUIdropzonebutton
                              onSubmit={handleSubmit}
                              name="Add Images"
                              number_of_images={6}
                            />
                          </div>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="row-sm ">
                  <div className="d-flex align-items-center flex-wrap ">
                    {item?.tour_photos &&
                      item.tour_photos?.map((items, index) => (
                        <div
                          key={index}
                          className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                        >
                          <img
                            src={
                              process.env.REACT_APP_API_BASE_URL +
                              "/TourImages/" +
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
                            onClick={() => dispatch(DeletePhoto(items.id))}
                          >
                            <i className="fe fe-x"></i>
                          </Button>
                        </div>
                      ))}
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row --> */}

        {/* <!-- Row English --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <div className="main-content-label mb-4 d-flex align-items-center">
                  <i
                    className="flag flag-us rounded-pill"
                    title="flag flag-bl "
                  ></i>

                  <div className="ms-2 fs-5">English</div>
                </div>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <label className="">Tout Title :</label>
                        <input
                          className="form-control"
                          required=""
                          type="text"
                          name="tour_title_EN"
                          placeholder=" "
                          value={formik.values?.tour_title_EN}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <div className="pos-relative">
                          <Form.Group className=" mb-0">
                            <p className="mg-b-10">Tour Description :</p>
                            <Form.Control
                              as="textarea"
                              name="tour_description_EN"
                              placeholder=" "
                              value={formik.values?.tour_description_EN}
                              onChange={formik.handleChange}
                              rows={4}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row English --> */}

        {/* <!-- Row Arabic --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <div className="main-content-label mb-4 d-flex align-items-center">
                  <i
                    className="flag flag-eg rounded-pill"
                    title="flag flag-bl "
                  ></i>

                  <div className="ms-2 fs-5">Arabic</div>
                </div>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <label className="">Tout Title :</label>
                        <input
                          className="form-control"
                          required=""
                          type="text"
                          name="tour_title_AR"
                          placeholder=" "
                          value={formik.values?.tour_title_AR}
                          onChange={formik.handleChange}
                          dir="rtl"
                        />
                      </div>
                      <div className="form-group">
                        <div className="pos-relative">
                          <Form.Group className=" mb-0">
                            <p className="mg-b-10">Tour Description :</p>
                            <Form.Control
                              as="textarea"
                              name="tour_description_AR"
                              placeholder=" "
                              value={formik.values?.tour_description_AR}
                              onChange={formik.handleChange}
                              rows={4}
                              dir="rtl"
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row Arabic --> */}

        {/* <!-- Row Russian --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <div className="main-content-label mb-4 d-flex align-items-center">
                  <i
                    className="flag flag-ru rounded-pill"
                    title="flag flag-bl "
                  ></i>

                  <div className="ms-2 fs-5">Russian</div>
                </div>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <label className="">Tout Title :</label>
                        <input
                          className="form-control"
                          required=""
                          type="text"
                          name="tour_title_RU"
                          placeholder=" "
                          value={formik.values?.tour_title_RU}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <div className="pos-relative">
                          <Form.Group className=" mb-0">
                            <p className="mg-b-10">Tour Description :</p>
                            <Form.Control
                              as="textarea"
                              name="tour_description_RU"
                              placeholder=" "
                              value={formik.values?.tour_description_RU}
                              onChange={formik.handleChange}
                              rows={4}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row russian --> */}

        {/* <!-- Row Local --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <div className="main-content-label mb-4 d-flex align-items-center">
                  <i
                    className="fa fa-car rounded-pill"
                    title="flag flag-bl "
                  ></i>

                  <div className="ms-2 fs-5">Local</div>
                </div>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <label className="">Tout Title :</label>
                        <input
                          className="form-control"
                          required=""
                          type="text"
                          name="tour_title_local"
                          placeholder=" "
                          value={formik.values?.tour_title_local}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <div className="pos-relative">
                          <Form.Group className=" mb-0">
                            <p className="mg-b-10">Tour Description :</p>
                            <Form.Control
                              as="textarea"
                              name="tour_description_local"
                              placeholder=" "
                              value={formik.values?.tour_description_local}
                              onChange={formik.handleChange}
                              rows={4}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row Local --> */}

        {/* <!-- Row --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <Button
                        className="btn ripple btn-main-primary btn-block"
                        type="submit"
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

import React, { useEffect, useState, useMemo } from "react";
import { MUIdropzonebutton } from "../MUIdropzonebutton";
import Searchable from "react-searchable-dropdown";
import Rating from "@mui/material/Rating";
import Header from "../Header";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetALLItems } from "../../Redux/accommodationTypesReducer/accommodationTypesSlice";
import { Button, Card, Col, Form, Row, ButtonGroup } from "react-bootstrap";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import {
  UpdateItem,
  GetSingleAccommodation,
  CreateAccommodationPhotos,
  DeletePhoto,
} from "../../Redux/accommodationReducer/accommodationSlice";

// Form Validation
const schema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  rate: Yup.number().max(5).min(1).required("Driver_rate is Required"),
  mobile: Yup.string().required("Mobile is Required"),
  address: Yup.string().required("Address is Required"),
  email: Yup.string().required("Email is Required"),
  price_list_PDF: Yup.mixed().test(
    "file",
    "Price_list_PDF is Required",
    (value) => {
      // Custom file validation logic goes here
      // For example, you might check the file type or size
      return !!value; // Replace this with your file validation logic
    }
  ),
  share: Yup.number().max(1).min(0).required("Share is Required"),
  note: Yup.string().required("Note is Required"),
  cover_photo: Yup.mixed().test("file", "Cover_photo is Required", (value) => {
    // Custom file validation logic goes here
    // For example, you might check the file type or size
    return !!value; // Replace this with your file validation logic
  }),
  video_link: Yup.string().required("video_link is Required"),
  city_id: Yup.number().required("city_id is Required"),
  accommodation_type_id: Yup.number().required(
    "Accommodation_type_id is Required"
  ),
});

//=====(Add Accommmodation Page)========>
export default function EditAccommodation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //Selectors
  const selectedItem = useSelector((state) => state.country?.item);
  const AccommodationTyps = useSelector(
    (state) => state.accommodationTypes?.data
  );
  const { item, deletedPhoto, createdPhoto, isSuccess } = useSelector(
    (state) => state.accommodations
  );

  // console.log(item);
  //States
  const [apartment, setApatment] = useState(false);
  const [urlCover, setUrlCover] = useState([]);
  const [urlPhotos, setUrlPhotos] = useState([]);
  const [urlPriceList, setUrlPriceList] = useState([]);

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

  // Get Accommodation Type Dropdown
  const dropdownOptionsAccoType = useMemo(() => {
    if (!AccommodationTyps) {
      return [];
    }
    return AccommodationTyps.map((item) => ({
      value: item.id,
      label: item.accommodation_type,
    }));
  }, [AccommodationTyps]);

  //handel change submit cover Photo
  const handleSubmitCoverPhoto = (files) => {
    if (files) {
      const x = files.map((file) => URL.createObjectURL(file));
      if (x) {
        setUrlCover(x);
        formik.setValues((prevValues) => ({
          ...prevValues,
          cover_photo: files,
        }));
      }
    }
  };

  const handleSubmitHotelPhotos = (files) => {
    if (files) {
      if (files) {
        const data = { id: id, images: files };
        dispatch(CreateAccommodationPhotos(data));
      }
    }
  };

  const handleSubmitPriceList = (files) => {
    if (files) {
      const x = files.map((file) => URL.createObjectURL(file));
      if (x) {
        setUrlPriceList(x);

        formik.setValues((prevValues) => ({
          ...prevValues,
          price_list_PDF: files,
        }));
      }
    }
  };

  //handel delete photo
  const handleDeletePhoto = (id) => {
    dispatch(DeletePhoto(id));
  };

  // Form Submition using Formik

  const formik = useFormik({
    initialValues: {
      name: "",
      rate: "",
      mobile: "",
      address: "",
      email: "",
      price_list_PDF: null,
      share: 0,
      note: "",
      cover_photo: null,
      video_link: "",
      hotel_website: "",
      city_id: "",
      accommodation_type_id: "",
      number_of_rooms: "",
      number_of_peoples: "",
      images: [],
    },
    // validationSchema: schema,
    onSubmit: (values) => {
      const formatedData = { id: item.id, data: values };
      dispatch(UpdateItem(formatedData));
      //   formik.resetForm();
      if (isSuccess) {
        navigate(`/accommodation/all`);
      }
    },
  });
  useEffect(() => {
    dispatch(GetALLItems(selectedItem.id));
    dispatch(GetSingleAccommodation(id));
  }, [dispatch, deletedPhoto, createdPhoto]);

  useEffect(() => {
    formik.setValues({
      name: item?.name || "",
      rate: item?.rate || "",
      mobile: item?.mobile || "",
      address: item?.address || "",
      email: item?.email || "",
      price_list_PDF: item?.price_list_PDF || "",
      share: item?.share || "",
      note: item?.note || "",
      cover_photo: item?.cover_photo || "",
      video_link: item?.video_link || "",
      hotel_website: item?.hotel_website || "",
      city_id: item?.city?.id || "",
      accommodation_type_id: item?.accommodation_type?.id || "",
      number_of_rooms: item?.apartment_details?.number_of_rooms || "",
      number_of_peoples: item?.apartment_details?.number_of_peoples || "",
    });

    if (item.accommodation_type && item.accommodation_type?.id !== 1) {
      setApatment(true);
    } else {
      setApatment(false);
    }
  }, [item, item.accommodation_type]);

  return (
    <>
      <ToastContainer />
      <Form onSubmit={formik.handleSubmit}>
        {/* <!-- Page Header --> */}
        <Header
          title={"Edit Accommodation"}
          subTitle1={"Edit"}
          subTitle2={selectedItem?.country || "loading..."}
        >
          {
            <ButtonGroup aria-label="Basic example" role="group">
              <Button variant="primary" className=" pd-x-25" type="button">
                <Link to={`/accommodation/all/`} className="btn btn-sm  ">
                  Back
                </Link>
              </Button>
            </ButtonGroup>
          }
        </Header>
        {/* <!-- End Page Header --> */}

        {/* <!-- Row Form inputs --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                {/* <!-- Row (1) name/accommodationtype/City--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <div className="col-sm-4">
                            <label className="">Name :</label>
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
                            <label className="">Accommodation Type :</label>
                            <Form.Group className="form-group select2-md">
                              <Searchable
                                className="form-control select2"
                                value={formik.values.accommodation_type_id}
                                placeholder={
                                  item?.accommodation_type
                                    ?.accommodation_type || "loading..."
                                }
                                notFoundText="No result found" // by default "No result found"
                                noInput
                                options={dropdownOptionsAccoType}
                                onSelect={(value) => {
                                  formik.setValues((prevValues) => ({
                                    ...prevValues,
                                    accommodation_type_id: value,
                                  }));

                                  value !== 1
                                    ? setApatment(true)
                                    : setApatment(false);
                                }}
                                listMaxHeight={140} //by default 140
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">City :</label>
                            <Form.Group className="form-group select2-md">
                              <Searchable
                                className="form-control select2"
                                value={formik.values.city_id}
                                placeholder={item?.city?.city || "loading..."}
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
                {/* <!-- Row (2)Mobile/Email/Address--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <div className="col-sm-4">
                            <label className="">Mobile :</label>
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
                            <label className="">Email :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                type="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder=" "
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                            <label className="">Address :</label>
                            <Form.Group className=" mb-3">
                              <Form.Control
                                type="text"
                                name="address"
                                value={formik.values.address}
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
                {/* <!-- Row (apartment) NumberOfRooms/Apartment Capacity--> */}

                {apartment && (
                  <Row className="row-sm">
                    <Col md={12} lg={12} xl={12}>
                      <div className="">
                        <div className="form-group">
                          <Row className="row-sm">
                            <div className="col-sm-4">
                              <label className="">Number Of Rooms :</label>
                              <Form.Group className=" mb-3">
                                <Form.Control
                                  type="Number"
                                  name="number_of_rooms"
                                  value={formik.values.number_of_rooms}
                                  onChange={formik.handleChange}
                                  placeholder=" "
                                />
                              </Form.Group>
                            </div>
                            <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                              <label className="">Apartment Capacity :</label>
                              <Form.Group className=" mb-3">
                                <Form.Control
                                  type="Number"
                                  name="number_of_peoples"
                                  value={formik.values.number_of_peoples}
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
                )}
                {/* <!-- Row (3) Note--> */}
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
                {/* <!-- Row (4)Video Link--> */}
                <Row className="row-sm">
                  <Col md={12} lg={12} xl={12}>
                    <div className="">
                      <div className="form-group">
                        <Row className="row-sm">
                          <Col md={6} lg={6} xl={6}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <label className="">Video Link :</label>
                                  <Form.Group className=" mb-3">
                                    <Form.Control
                                      type="text"
                                      name="video_link"
                                      value={formik.values.video_link}
                                      onChange={formik.handleChange}
                                      placeholder=" "
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} lg={6} xl={6}>
                            <div className="">
                              <div className="form-group">
                                <div className="pos-relative">
                                  <label className="">Hotel Website :</label>
                                  <Form.Group className=" mb-3">
                                    <Form.Control
                                      type="text"
                                      name="hotel_website"
                                      value={formik.values.hotel_website}
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
                {/* <!-- Row (5) Rate --> */}
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
                                    name="rate"
                                    size="large"
                                    value={Number(formik.values.rate)}
                                    max={5}
                                    onChange={(ratingValue) => {
                                      formik.setValues((prevValues) => ({
                                        ...prevValues,
                                        rate: ratingValue.target.value,
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
                {/* <!-- Row (6) Cover Photo--> */}
                <div className="mb-4">
                  <Row className="row-sm mb-2">
                    <div className="pos-relative">
                      <Form.Group className=" mb-0">
                        <MUIdropzonebutton
                          onSubmit={handleSubmitCoverPhoto}
                          name="Change Cover Photo"
                          number_of_images={1}
                        />
                      </Form.Group>
                    </div>
                  </Row>
                  <Row className="row-sm">
                    {urlCover.map((items, index) => (
                      <div key={index}>
                        <img
                          className="pic-1 ht-150 rounded"
                          alt="product1"
                          src={items}
                        />
                      </div>
                    ))}
                  </Row>
                </div>
                {/* <!-- Row (7) hotel Photos--> */}
                <div className="mb-4">
                  <Row className="row-sm mb-2">
                    <div className="pos-relative">
                      <Form.Group className=" mb-0">
                        <MUIdropzonebutton
                          onSubmit={handleSubmitHotelPhotos}
                          name="Add Hotel Photos"
                          number_of_images={6}
                        />
                      </Form.Group>
                    </div>
                  </Row>
                  <Row className="row-sm ">
                    <div className="d-flex align-items-center flex-wrap ">
                      {item?.accommodation_photos &&
                        item.accommodation_photos.map((items, index) => (
                          <div
                            key={index}
                            className="pos-relative ht-150 wd-200 me-3 mb-2 rounded"
                          >
                            <img
                              src={
                                process.env.REACT_APP_API_BASE_URL +
                                "/HotelPhotos/" +
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
                {/* <!-- Row (8) Price List--> */}
                <div className="mb-0">
                  <Row className="row-sm mb-2">
                    <div className="pos-relative">
                      <Form.Group className=" mb-0">
                        <MUIdropzonebutton
                          onSubmit={handleSubmitPriceList}
                          name="Change Price List"
                          number_of_images={1}
                        />
                      </Form.Group>
                    </div>
                  </Row>
                  <Row className="row-sm">
                    {urlPriceList.map((items, index) => (
                      <div key={index}>
                        <img
                          className="pic-1 ht-150 rounded"
                          alt="product1"
                          src={items}
                        />
                      </div>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row Form Inputs --> */}

        {/* <!-- Row Submit Button --> */}
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
        {/* <!-- End Row Submit Button --> */}
      </Form>
    </>
  );
}

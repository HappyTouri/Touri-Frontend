import Header from "../Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingle } from "../../Redux/TourReducer/tourSlice";
import { Card, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

// =========(show  single tour Page)
export default function SingleTour() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.tour);
  //feach all aingle item data
  useEffect(() => {
    dispatch(getSingle(id));
  }, [dispatch]);

  return (
    <>
      {/* <!-- Page Header --> */}
      <Header
        title={"Tours"}
        subTitle1={item?.city?.city}
        subTitle2={item.tour_title_EN}
      >
        {
          <ButtonGroup aria-label="Basic example" role="group">
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link to={`/all-tours/`} className="btn btn-sm  ">
                Back
              </Link>
            </Button>
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link to={`/tour-edit/${id}`} className="btn btn-sm  ">
                Edit
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
                  <Row className="row-sm">
                    {item.tour_photos?.map((items, index) => (
                      <Col
                        md={2}
                        lg={2}
                        sm={6}
                        xl={2}
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
                                  src={
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/TourImages/" +
                                    items.photo
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Row className="row-sm">
                    <h6>Video Link : {item.video_link} </h6>
                  </Row>
                </Col>
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
                      <h5>{item.tour_title_EN}</h5>
                    </div>
                    <div className="form-group">
                      <div className="pos-relative">
                        <p>{item.tour_description_EN}</p>
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
                      <h3>{item.tour_title_AR}</h3>
                    </div>
                    <div className="form-group">
                      <div className="pos-relative">
                        <p>{item.tour_description_AR}</p>
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
                      <h3>{item.tour_title_RU}</h3>
                    </div>
                    <div className="form-group">
                      <div className="pos-relative">
                        <p>{item.tour_description_RU}</p>
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
                <i className="fa fa-car rounded-pill" title="flag flag-bl "></i>

                <div className="ms-2 fs-5">Local</div>
              </div>
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  <div className="">
                    <div className="form-group">
                      <h3>{item.tour_title_local}</h3>
                    </div>
                    <div className="form-group">
                      <div className="pos-relative">
                        <p>{item.tour_description_local}</p>
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
      {/* <Row className="row-sm">
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
      </Row> */}
      {/* <!-- End Row --> */}
    </>
  );
}

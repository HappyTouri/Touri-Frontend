import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSingleAccommodation } from "../../Redux/accommodationReducer/accommodationSlice";
import { Button, Card, Col, ButtonGroup, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import YouTube from "../YouTube";
import MainHeader from "../TourDetails/Header";
import { Breadcrumb } from "react-bootstrap";
import { Staticcarousel } from "./Staticcarousel";

// =========(show  single tour Page)
export default function ViewAccommodation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.accommodations);
  console.log(item);

  //feach all aingle item data
  useEffect(() => {
    dispatch(GetSingleAccommodation(id));
  }, [dispatch]);

  return (
    <>
      <MainHeader />
      <div className="mt-5 ms-lg-5 me-lg-5">
        {/* <div className=" mt-lg-5 ms-2 me-2">
          <div className="">
            <h2 className="main-content-title tx-24 mg-b-5">
              {"Accommodation"}
            </h2>
            <Breadcrumb>
              <Breadcrumb.Item href="#">{item?.city?.city}</Breadcrumb.Item>
              <Breadcrumb.Item active>
                {item?.city?.country?.country || "loading..."}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div> */}

        <Row className="row-sm ">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm mb-3 mt-2">
                  <div className="">
                    <div className="media d-block d-sm-flex ">
                      {item.cover_photo && (
                        <>
                          <img
                            alt="img"
                            className="wd-100p wd-sm-200 mg-sm-r-20 mg-b-20 mg-sm-b-0"
                            src={
                              process.env.REACT_APP_API_BASE_URL +
                              "/HotelCover/" +
                              item?.cover_photo
                            }
                          />
                        </>
                      )}

                      <div className="media-body">
                        <h4>{item.name}</h4>

                        <h6>
                          <span>
                            {item?.accommodation_type?.accommodation_type ||
                              "loading..."}
                          </span>

                          <span> / </span>
                          <span className="text-success text-uppercase">
                            {item?.city?.city || "loading..."}
                          </span>
                        </h6>
                        <Rating
                          name="no-value"
                          size="small"
                          value={item?.rate || 1}
                          readOnly={true}
                          max={5}
                        />
                        <div className="text-primary mb-1 ">
                          {item?.address || "loading..."}
                        </div>
                        <a
                          href={`${item?.hotel_website || "#"}`}
                          className="btn btn-sm btn-primary me-1"
                          target="_blank" // Optional: Opens the link in a new tab
                          rel="noopener noreferrer" // Optional: Adds security measures for external links
                        >
                          Hotel Website
                        </a>
                      </div>
                    </div>
                  </div>
                </Row>

                <Row className="row-sm pt-3">
                  <div id="carouselExampleSlidesOnly">
                    <div className="carousel-inner ap">
                      <Staticcarousel
                        photos={item.accommodation_photos || []}
                      />
                    </div>
                  </div>
                </Row>
                <Row className="row-sm pt-3">
                  <h6>Hotel Video :</h6>
                  <YouTube hotel_website={item.hotel_website} />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <YouTube /> */}
      </div>
    </>
  );
}

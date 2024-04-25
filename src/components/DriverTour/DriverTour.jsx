import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row, Card } from "react-bootstrap";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { GetSingleOffer } from "../../Redux/offerReducer/offerSlice";
import { GetALLTourtitles } from "../../Redux/tourTitlesReducer/tourTitlesSlice";
import Rating from "@mui/material/Rating";

export default function DriverTour() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.offer);
  const { data } = useSelector((state) => state.tourTitles);
  console.log(item);

  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handelSelectedLanguage = (language) => {
    setSelectedLanguage(language);
  };

  //feach all aingle item data
  useEffect(() => {
    dispatch(GetSingleOffer(id));
    dispatch(GetALLTourtitles());
  }, [dispatch]);
  return (
    <>
      <Header handelSelectedLanguage={handelSelectedLanguage} />
      <div className="page-header  mt-lg-5 d-flex justify-content-center ">
        <div className="mt-lg-5 d-flex justify-content-center ">
          <h2 className="main-content-title tx-24 mg-b-1 text-center  p-0 ">
            {selectedLanguage === "english"
              ? item.tour_header?.title_EN
              : selectedLanguage === "arabic"
              ? item.tour_header?.title_AR
              : selectedLanguage === "russian"
              ? item.tour_header?.title_RU
              : "Loading..."}
          </h2>
        </div>
      </div>

      {item?.tour_details && (
        <>
          {item?.tour_details.map((item, index) => (
            <Row key={index} className="row-sm ">
              <Col lg={12} xl={12} md={12}>
                <Card className="custom-card ms-md-5 me-md-5">
                  <Card.Body className="h-100">
                    <div>
                      <div
                        className={`d-flex  justify-content-between align-items-center ${
                          selectedLanguage === "arabic"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <h6 className="main-content-label mb-0 ">
                          {data[index] && data[index].title_EN && (
                            <>
                              {selectedLanguage === "english"
                                ? data[index].title_EN || "Loading..."
                                : selectedLanguage === "arabic"
                                ? data[index].title_AR || "Loading..."
                                : selectedLanguage === "russian"
                                ? data[index].title_RU || "Loading..."
                                : "Loading..."}
                            </>
                          )}
                        </h6>
                        <p className="main-content-label mb-0 bg-success p-1 rounded">
                          {item?.date || "Loading..."}
                        </p>
                      </div>

                      <p
                        className={`text-muted card-sub-title ${
                          selectedLanguage === "arabic" ? "text-end" : ""
                        }`}
                      >
                        {selectedLanguage === "english"
                          ? item.tour?.tour_title_EN
                          : selectedLanguage === "arabic"
                          ? item.tour?.tour_title_AR
                          : selectedLanguage === "russian"
                          ? item.tour?.tour_title_RU
                          : "Loading..."}
                      </p>
                    </div>
                    <div>
                      <div id="carouselExampleSlidesOnly">
                        <div className="carousel-inner ap">
                          <Staticcarousel
                            photos={item?.tour?.tour_photos || []}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted text-justify">
                        {selectedLanguage === "english"
                          ? item.tour?.tour_description_EN
                          : selectedLanguage === "arabic"
                          ? item.tour?.tour_description_AR
                          : selectedLanguage === "russian"
                          ? item.tour?.tour_description_RU
                          : "Loading..."}
                      </p>
                    </div>
                    {item?.accommodation?.name &&
                      item?.accommodation?.city?.city && (
                        <>
                          <div className="d-flex  align-items-center mb-1">
                            <i className="pe-7s-home  me-1 text-success"></i>
                            <p className=" card-sub-title  my-auto text-primary">
                              {item?.accommodation?.name || "Loading..."}
                            </p>
                          </div>
                          <div className="d-flex  align-items-center mb-2  ">
                            <i className="pe-7s-map-marker  me-1 text-success"></i>
                            <p className="card-sub-title  my-auto text-primary ">
                              {item?.accommodation?.city?.city || "Loading..."}
                            </p>
                          </div>
                          <div className="d-flex  align-items-center  ">
                            <Rating
                              name="no-value"
                              size="small"
                              value={item?.accommodation?.rate || 1}
                              readOnly={true}
                              max={5}
                            />
                          </div>
                        </>
                      )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </>
      )}
      <Row className="row-sm ">
        <Col lg={12} xl={12} md={12}>
          <Card className="custom-card ms-md-5 me-md-5">
            <Card.Body className="h-100">
              <div className="">
                {selectedLanguage === "english" ? (
                  <>
                    <h5>Total Price : {item?.tour_price || "Loading..."} $ </h5>
                  </>
                ) : selectedLanguage === "arabic" ? (
                  <>
                    <h5 className="text-end">
                      ${item?.tour_price || "Loading..."} : السعر الاجمالي
                    </h5>
                  </>
                ) : selectedLanguage === "russian" ? (
                  <>
                    <h5>
                      Итоговая цена : {item?.tour_price || "Loading..."} ${" "}
                    </h5>
                  </>
                ) : (
                  "Loading..."
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

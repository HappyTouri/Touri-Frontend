import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Card, Row, Spinner } from "react-bootstrap";
import { Staticcarousel } from "./Staticcarousel";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GetSingleOffer } from "../../Redux/offerReducer/offerSlice";
import { GetALLTourtitles } from "../../Redux/tourTitlesReducer/tourTitlesSlice";
import Rating from "@mui/material/Rating";

const TourDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.offer);
  // console.log(item.profit_price);
  const { data } = useSelector((state) => state.tourTitles);

  const [selectedLanguage, setSelectedLanguage] = useState("arabic");
  const [loader, setLoader] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    dispatch(GetSingleOffer(id));
    dispatch(GetALLTourtitles());
  }, [dispatch, id]);

  // Memoized function to handle language selection
  const handelSelectedLanguage = useCallback((language) => {
    setSelectedLanguage(language);
  }, []);

  // Memoized function to download PDF
  const downloadPDF = useCallback(() => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  }, []);

  // Return early if data is still loading
  if (!item?.tour_details)
    return (
      <div>
        <div className="text-center  p-3 mg-t-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );

  return (
    <>
      <Header handelSelectedLanguage={handelSelectedLanguage} />
      <div className="actual-receipt">
        <div className="page-header mt-lg-5 d-flex justify-content-center">
          <div className="mt-lg-5 d-flex justify-content-center">
            <h2 className="main-content-title tx-24 mg-b-1 text-center p-0">
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

        {item.tour_details.map((detail, index) => (
          <TourDetailCard
            key={index} // Use unique key for each item
            detail={detail}
            title={data[index]}
            selectedLanguage={selectedLanguage}
          />
        ))}
        {item.profit_price !== 0 && (
          <Row className="row-sm">
            <Col lg={12} xl={12} md={12}>
              <Card className="custom-card ms-md-5 me-md-5">
                <Card.Body className="h-100">
                  <div className="">
                    <h5>
                      {selectedLanguage === "english"
                        ? `Total Price : ${item?.tour_price} $`
                        : selectedLanguage === "arabic"
                        ? `$${item?.tour_price} : السعر الاجمالي`
                        : selectedLanguage === "russian"
                        ? `Итоговая цена : ${item?.tour_price} $`
                        : "Loading..."}
                    </h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>
      <div className="actions-right">
        {/* <button
          className="receipt-modal-download-button"
          onClick={downloadPDF}
          disabled={loader}
        >
          {loader ? <span>Downloading...</span> : <span>Download</span>}
        </button> */}
      </div>
    </>
  );
};

// Memoized TourDetailCard component to prevent unnecessary re-renders
const TourDetailCard = React.memo(({ detail, title, selectedLanguage }) => {
  return (
    <Row className="row-sm">
      <Col lg={12} xl={12} md={12}>
        <Card className="custom-card ms-md-5 me-md-5">
          <Card.Body className="h-100">
            <div>
              <div
                className={`d-flex justify-content-between align-items-center ${
                  selectedLanguage === "arabic"
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <h6 className="main-content-label mb-0">
                  {title && title.title_EN && (
                    <>
                      {selectedLanguage === "english"
                        ? title.title_EN
                        : selectedLanguage === "arabic"
                        ? title.title_AR
                        : selectedLanguage === "russian"
                        ? title.title_RU
                        : "Loading..."}
                    </>
                  )}
                </h6>
                <p className="main-content-label mb-0 bg-success p-1 rounded">
                  {detail.date || "Loading..."}
                </p>
              </div>
              <p
                className={`text-muted card-sub-title ${
                  selectedLanguage === "arabic" ? "text-end" : ""
                }`}
              >
                {selectedLanguage === "english"
                  ? detail.tour?.tour_title_EN
                  : selectedLanguage === "arabic"
                  ? detail.tour?.tour_title_AR
                  : selectedLanguage === "russian"
                  ? detail.tour?.tour_title_RU
                  : "Loading..."}
              </p>
            </div>
            <div id="carouselExampleSlidesOnly">
              <div className="carousel-inner ap">
                <Staticcarousel photos={detail.tour?.tour_photos || []} />
              </div>
            </div>
            <p className="text-muted text-justify">
              {selectedLanguage === "english"
                ? detail.tour?.tour_description_EN
                : selectedLanguage === "arabic"
                ? detail.tour?.tour_description_AR
                : selectedLanguage === "russian"
                ? detail.tour?.tour_description_RU
                : "Loading..."}
            </p>
            {detail.accommodation?.name && detail.accommodation?.city?.city && (
              <>
                <div className="d-flex align-items-center mb-1">
                  <i className="pe-7s-home me-1 text-success"></i>
                  <p className="card-sub-title my-auto text-primary">
                    <Link to={`/view-accommodation/${detail.accommodation.id}`}>
                      {detail.accommodation.name || "Loading..."}
                    </Link>
                  </p>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="pe-7s-map-marker me-1 text-success"></i>
                  <p className="card-sub-title my-auto text-primary">
                    {detail.accommodation.city.city || "Loading..."}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Rating
                    name="no-value"
                    size="small"
                    value={detail.accommodation.rate || 1}
                    readOnly
                    max={5}
                  />
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
});

export default TourDetails;

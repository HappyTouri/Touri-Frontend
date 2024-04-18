import Header from "../Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSingleAccommodation } from "../../Redux/accommodationReducer/accommodationSlice";
import { Button, Card, Col, ButtonGroup, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
// =========(show  single tour Page)
export default function SingleTour() {
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
      {/* <!-- Page Header --> */}
      <Header
        title={"Accommodation"}
        subTitle1={item?.city?.city}
        subTitle2={item?.city?.country?.country || "loading..."}
      >
        {
          <ButtonGroup aria-label="Basic example" role="group">
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link to={`/accommodation/all/`} className="btn btn-sm  ">
                Back
              </Link>
            </Button>
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link
                to={`/edit-accommodation/${item.id}`}
                className="btn btn-sm  "
              >
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
              <Row className="row-sm mb-3">
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
                      <div>{item?.mobile || "loading..."}</div>
                      <div className="text-primary ">
                        {item?.email || "loading..."}
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <Col xl={12}>
                  <div className="table-responsive">
                    <Table className="mb-0 border-top table-bordered text-nowrap">
                      <tbody>
                        <tr>
                          <th className="wd-10 ">Address</th>
                          <td>{item?.address || "loading..."}</td>
                        </tr>
                        {item?.apartment_details && (
                          <>
                            <tr>
                              <td className="wd-10">Number of Rooms</td>
                              <td>
                                {item?.apartment_details?.number_of_rooms ||
                                  "loading..."}
                              </td>
                            </tr>
                            <tr>
                              <td className="wd-10">Number of Capacity</td>
                              <td>
                                {item?.apartment_details?.number_of_peoples ||
                                  "loading..."}
                              </td>
                            </tr>
                          </>
                        )}
                        <tr>
                          <td className="wd-10">Video Link</td>
                          <td>{item?.video_link || "loading..."}</td>
                        </tr>

                        <tr>
                          <td className="wd-10">Note</td>
                          <td>{item?.note || "loading..."}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
              <Row className="row-sm pt-3">
                <div className="d-flex align-items-center flex-wrap">
                  {item.accommodation_photos?.map((items, index) => (
                    <img
                      key={index}
                      className=" rounded ht-100 m-2"
                      alt=""
                      src={
                        process.env.REACT_APP_API_BASE_URL +
                        "/HotelPhotos/" +
                        items.photo
                      }
                    />
                  ))}
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

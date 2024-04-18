import Header from "../Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingle } from "../../Redux/driverReducer/driverSlice";
import { Card, Col, Row, Table, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

// =========(show  single Driver Page)
export default function SingleDriver() {
  const { id } = useParams();
  const dispatch = useDispatch();

  //Selectors
  const { item } = useSelector((state) => state.driver);

  //feach all Single item data
  useEffect(() => {
    dispatch(getSingle(id));
  }, [dispatch]);

  return (
    <>
      {/* <!-- Page Header --> */}
      <Header
        title={"Driver"}
        subTitle1={item?.city?.city}
        subTitle2={item?.city?.country?.country || "loading..."}
      >
        {
          <ButtonGroup aria-label="Basic example" role="group">
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link to={`/driver/all`} className="btn btn-sm  ">
                Back
              </Link>
            </Button>
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link to={`/driver-edit/${item.id}`} className="btn btn-sm  ">
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
                    {item.driver_photos && (
                      <>
                        <img
                          alt="img"
                          className="wd-100p wd-sm-200 mg-sm-r-20 mg-b-20 mg-sm-b-0"
                          src={
                            process.env.REACT_APP_API_BASE_URL +
                            "/DriverImages/" +
                            item?.driver_photos[0].photo
                          }
                        />
                      </>
                    )}

                    <div className="media-body">
                      <h4>{item.name}</h4>

                      <h6>
                        <span>
                          {item?.transportation?.type || "loading..."}
                        </span>

                        <span> / </span>
                        <span className="text-success text-uppercase">
                          {item?.city?.city || "loading..."}
                        </span>
                      </h6>
                      <Rating
                        name="no-value"
                        size="small"
                        value={item?.driver_rate || 1}
                        readOnly={true}
                        max={5}
                      />
                      <div>{item?.mobile || "loading..."}</div>
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
                          <th className="wd-10 ">Car Model</th>
                          <td>{item?.car_model || "loading..."}</td>
                        </tr>
                        <tr>
                          <td className="wd-10">Number of seats</td>
                          <td>{item?.number_of_seats || "loading..."}</td>
                        </tr>
                        <tr>
                          <td className="wd-10">Price per day</td>
                          <td>{item?.driver_price || "loading..."}</td>
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
                  {item.car_photos?.map((items, index) => (
                    <img
                      key={index}
                      className=" rounded ht-100 m-2"
                      alt=""
                      src={
                        process.env.REACT_APP_API_BASE_URL +
                        "/CarImages/" +
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

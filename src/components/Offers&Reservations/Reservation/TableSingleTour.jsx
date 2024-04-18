import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Pagination,
  Spinner,
  Table,
  Col,
  Row,
  Card,
  Button,
} from "react-bootstrap";
import { Share } from "../../../Redux/accommodationReducer/accommodationSlice";

const PagiTableSingleTour = ({ data, tableTitle }) => {
  return (
    <Fragment>
      {/* <!--Cared--> */}

      <Row className=" row-sm">
        <Col sm={12} md={12} xl={12} lg={12} className="grid-margin">
          <Card className="custom-card">
            <Card.Header className="border-bottom-0 pb-0">
              <div className="d-flex justify-content-between">
                <label className="main-content-label mb-0 pt-1">
                  {tableTitle}
                </label>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive border userlist-table">
                {/* Table */}
                <Table
                  responsive
                  className="card-table table-striped table-vcenter text-nowrap mb-0"
                >
                  <tbody>
                    {data && (
                      <>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td className="wd-lg-0p">
                              <span className="bg-success p-1 rounded me-1">
                                {index + 1}
                              </span>
                              <span className="bg-primary p-1 rounded">
                                {item?.date}
                              </span>
                            </td>

                            <td className="wd-lg-0p">
                              {item?.tour?.tour_title_EN}
                            </td>
                            <td className="wd-lg-0p">
                              <span className="text-primary ">
                                {item?.accommodation?.city?.city}
                              </span>
                            </td>

                            <td className="wd-lg-90p">
                              {item?.accommodation?.name && (
                                <>
                                  <i className="pe-7s-home  me-1 text-success"></i>
                                </>
                              )}

                              {item?.accommodation?.name}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </Table>

                {!data && (
                  <>
                    {/* <!-- Spinner  --> */}
                    <div className="text-center  p-3 mg-b-20">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                    {/* <!-- End Spinner  --> */}
                  </>
                )}

                {/* end Table */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- COL END --> */}
      </Row>
      {/* <!-- End Cared  --> */}
    </Fragment>
  );
};

PagiTableSingleTour.propTypes = {};

PagiTableSingleTour.defaultProps = {};

export default PagiTableSingleTour;

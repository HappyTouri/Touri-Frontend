import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Pagination, Spinner, Table, Col, Row, Card } from "react-bootstrap";
import { xorBy } from "lodash";

const PagiTableDriver = ({ data, remove, isLoading, tableTitle }) => {
  // console.log(data);
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const Delete = 0;
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6259ca",
      cancelButtonColor: "#6259ca",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );

        remove(id);
      }
    });
  };

  const handelPage = (n) => {
    setCurrentPage(n);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                  <thead>
                    <tr>
                      <th className="wd-lg-0p">
                        <span>Index</span>
                      </th>
                      <th className="wd-lg-0p">
                        <span>Driver</span>
                      </th>
                      <th className="wd-lg-0p">
                        <span>Car</span>
                      </th>
                      <th className="wd-lg-10p">
                        <span>Name</span>
                      </th>
                      <th className="wd-lg-60p">
                        <span>Mobile</span>
                      </th>

                      <th className="wd-lg-20p">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item?.driver_photos[0]?.photo && (
                            <>
                              <img
                                alt="avatar"
                                className="driver rounded avatar-md me-2"
                                src={
                                  process.env.REACT_APP_API_BASE_URL +
                                  "/DriverImages/" +
                                  item?.driver_photos[0]?.photo
                                }
                              />
                            </>
                          )}
                        </td>
                        <td>
                          <img
                            alt="avatar"
                            className="driver rounded avatar-md me-2"
                            src={
                              process.env.REACT_APP_API_BASE_URL +
                              "/CarImages/" +
                              item?.car_photos[0]?.photo
                            }
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.mobile}</td>

                        <td>
                          <Link
                            to={`/driver/${item.id}`}
                            className="btn btn-sm btn-primary me-1"
                          >
                            <i className="fe fe-search"></i>
                          </Link>
                          <Link
                            to={`/driver-edit/${item.id}`}
                            className="btn btn-sm btn-info me-1"
                          >
                            <i className="fe fe-edit-2"></i>
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-sm btn-danger me-1"
                            onClick={() => {
                              handleDeleteClick(item.id);
                            }}
                          >
                            <i className="fe fe-trash"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {isLoading && (
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
              <div className="mt-5 d-flex justify-content-end">
                {/* pagination */}
                <Pagination className="pagination mb-0">
                  <Pagination.Item onClick={prePage}>Previous</Pagination.Item>

                  {numbers.map((n, index) => (
                    <Pagination.Item
                      key={index}
                      onClick={() => handelPage(n)}
                      className={`page-item ${
                        currentPage === n ? "active" : ""
                      } `}
                    >
                      {n}
                    </Pagination.Item>
                  ))}

                  <Pagination.Item onClick={nextPage}>Next</Pagination.Item>
                </Pagination>
                {/* end Pagination */}
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

PagiTableDriver.propTypes = {};

PagiTableDriver.defaultProps = {};

export default PagiTableDriver;

import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Multiselect from "react-select";
import { toast, ToastContainer } from "react-toastify";

import axiosTouri from "../../axiosTouri";

import {
  Breadcrumb,
  Card,
  Form,
  FormControl,
  InputGroup,
  Col,
  Row,
  Button,
  Table,
  Dropdown,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Paginate from "../Paginate";

const Countries = () => {
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState("");
  const [toggleData, setTogleData] = useState(false);

  const [countriesList, setCountriesList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  //pagination variables

  // Paginate
  // const per_page = 5;\

  // const Paginate = ({ per_page }) => {
  //   const [activePage, setActivePage] = useState(1);

  //   const pages = [...Array(countriesList.length / per_page)];
  //   console.log(pages);

  //   const change_page = (p) => {
  //     setActivePage(p);
  //   };

  //   return (
  //     <Pagination className="mb-0 justify-content-end">
  //       <Pagination.Item>Previous</Pagination.Item>
  //       {pages.map((page, i) => (
  //         <Pagination.Item
  //           key={i}
  //           className={` page-item ${activePage == i + 1 && "active"}  `}
  //           onClick={() => change_page(i + 1)}
  //         >
  //           {i + 1}
  //         </Pagination.Item>
  //       ))}

  //       <Pagination.Item>Next</Pagination.Item>
  //     </Pagination>
  //   );
  // };

  //Feach Data on page
  useEffect(() => {
    GetData();
  }, []);
  const GetData = () => {
    axiosTouri
      .get("/country")
      .then((Data) => {
        console.log("Data", Data);
        setCountriesList(Data.data);
      })
      .then(() => {
        setTogleData(true);
      })
      .catch(() => {});
  };

  // Notification Success
  const IconsSuccess = () =>
    toast.success(
      <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
        Country added Successfully
      </p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        theme: "colored",
      }
    );

  // Notification Error
  const Iconserror = (msg) =>
    toast.error(
      <p className="mx-2 tx-16 d-flex align-items-center mb-0">{msg}</p>,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        hideProgressBar: true,
        theme: "colored",
      }
    );

  // Submit Add Country
  const onSubmit = () => {
    if (country == "" || icon == "") {
      Iconserror("Please enter Country name & icon");
      return;
    }

    const payload = {
      country: country,
      country_icon: icon,
    };
    axiosTouri
      .post("/country", payload)
      .then(({ data }) => {
        GetData();
      })
      .then(() => {
        IconsSuccess();
        setCountry("");
        setIcon(" ");
      })
      .catch((err) => {
        // console.log(err);
        console.log(process.env.REACT_APP_API_BASE_URL);
      });
  };

  //Submit Edit Country
  var Edit = (id, country, icon) => {
    const payload = {
      country: country,
      country_icon: icon,
    };

    axiosTouri
      .put(`/country/${id}`, payload)
      .then(() => {
        GetData();
      })
      .catch(() => {});
  };

  // Delete Contry
  var Delete = (id) => {
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

        axiosTouri
          .delete(`/country/${id}`)
          .then(({}) => {
            GetData();
          })
          .catch(() => {});
      }
    });
  };

  // Row component in table
  const DataTable = ({ item, index }) => {
    const [toggle, setToggle] = useState(true);
    const [toggleSpinner, setToggleSpinner] = useState(false);
    const [country, setCountry] = useState(item.country);
    const [icon, setIcon] = useState(item.country_icon);
    return (
      <Fragment>
        <tr key={index}>
          <td>
            <h6>{item.id}</h6>
          </td>
          <td>
            {toggle ? (
              <>
                {!toggleSpinner && (
                  <>
                    <i className={item.country_icon}></i>
                  </>
                )}
                {toggleSpinner && (
                  <>
                    {/* Spinner */}
                    <Spinner
                      animation="border"
                      role="status"
                      className="spinner-border spinner-border-sm"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    {/*End Spinner */}
                  </>
                )}
              </>
            ) : (
              <>
                <InputGroup size="sm wd-100">
                  <FormControl
                    className=""
                    value={icon}
                    onChange={(e) => {
                      setIcon(e.target.value);
                    }}
                  />
                </InputGroup>
              </>
            )}
          </td>

          <td>
            {toggle ? (
              <>
                {!toggleSpinner && <>{item.country}</>}
                {toggleSpinner && (
                  <>
                    {/* Spinner */}
                    <Spinner
                      animation="border"
                      role="status"
                      className="spinner-border spinner-border-sm"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    {/*End Spinner */}
                  </>
                )}
              </>
            ) : (
              <>
                <InputGroup size="sm wd-100">
                  <FormControl
                    className="w-25"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </InputGroup>
              </>
            )}
          </td>
          <td>
            {toggle ? (
              <>
                <Link
                  to="#"
                  className="btn btn-sm btn-info me-1"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <i className="fe fe-edit-2"></i>
                </Link>
              </>
            ) : (
              <>
                {/* save button */}
                <Link
                  to="#"
                  className="btn btn-sm btn-success me-1"
                  onClick={() => {
                    setToggleSpinner(true);
                    Edit(item.id, country, icon);

                    setToggle(true);
                  }}
                >
                  <i className="fe fe-save"></i>
                </Link>
              </>
            )}

            <Link
              to="#"
              className="btn btn-sm btn-danger me-1"
              onClick={() => {
                Delete(item.id);
              }}
            >
              <i className="fe fe-trash"></i>
            </Link>
          </td>
        </tr>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <ToastContainer />
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div>
          <h2 className="main-content-title tx-24 mg-b-5">Countries</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="#">All Countries</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Country</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <!-- End Page Header --> */}

      {/* <!-- Row Add Counry --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              <Row className="row-sm">
                <Col md={3} lg={3} xl={3}>
                  <label className="">Add Country :</label>
                  <Form.Group className=" mb-3">
                    <Form.Control
                      type="text"
                      placeholder=" "
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} lg={3} xl={3}>
                  <label className="">Icon Name :</label>
                  <Form.Group className=" mb-3">
                    <Form.Control
                      type="text"
                      placeholder=" "
                      value={icon}
                      onChange={(e) => {
                        setIcon(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} lg={6} xl={6}>
                  <div className="text-center  wd-100">
                    <label className="">&nbsp;</label>
                    <Button
                      className="btn ripple btn-main-primary btn-block"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      ADD
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- End Row add country --> */}

      {/* <!--Row table--> */}

      <Row className=" row-sm">
        <Col sm={12} md={12} xl={12} lg={12} className="grid-margin">
          <Card className="custom-card">
            <Card.Header className="border-bottom-0 pb-0">
              <div className="d-flex justify-content-between">
                <label className="main-content-label mb-0 pt-1">
                  All Countries
                </label>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive border userlist-table">
                <Table
                  responsive
                  className="card-table table-striped table-vcenter text-nowrap mb-0"
                >
                  <thead>
                    <tr>
                      <th className="wd-lg-0p">
                        <span>#</span>
                      </th>
                      <th className="wd-lg-0p">
                        <span>Icon</span>
                      </th>

                      <th className="wd-lg-70p">
                        <span>Country</span>
                      </th>
                      <th className="wd-lg-0p">Action</th>
                    </tr>
                  </thead>

                  {toggleData && (
                    <>
                      <tbody>
                        {countriesList.map((item, index) => (
                          <DataTable key={index} item={item} index={index} />
                        ))}
                      </tbody>
                    </>
                  )}
                </Table>

                {!toggleData && (
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
              </div>
              <div className="mt-5">
                <Paginate list={countriesList} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- COL END --> */}
      </Row>
      {/* <!-- row closed  --> */}

      {/* <!--component--> */}

      <Row className=" row-sm">
        <Col sm={12} md={12} xl={12} lg={12} className="grid-margin">
          <Card className="custom-card">
            <Card.Header className="border-bottom-0 pb-0">
              <div className="d-flex justify-content-between">
                <label className="main-content-label mb-0 pt-1">
                  All Countries
                </label>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="mt-5">
                <Paginate list={countriesList} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- COL END --> */}
      </Row>
      {/* <!-- end component --> */}
    </Fragment>
  );
};

Countries.propTypes = {};

Countries.defaultProps = {};

export default Countries;

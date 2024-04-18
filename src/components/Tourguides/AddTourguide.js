import React, { Fragment, useState } from "react";
import Multiselect from "react-select";
import { MultiSelect } from "react-multi-select-component";
import { MUIdropzonebutton } from "./MUIdropzonebutton";
import Searchable from "react-searchable-dropdown";
import Rating from "@mui/material/Rating";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
// import {
//   Singleselectday,
//   SingleselectMonth,
//   Singleselectyear,
// } from "../../../data/Forms/formlayout";
import { Link } from "react-router-dom";

export default function AddTourguide() {
  const Selectinputsizemd = [
    {
      value: "Tbilisi",
      label: "Tbilisi",
    },
    {
      value: "germany",
      label: "Germany",
    },
    {
      value: "poland",
      label: "Poland",
    },
  ];
  const objectArray = [
    { value: "Firefox", label: "firefox" },
    { value: "Chrome", label: "chrome " },
    { value: "Safari", label: "safari" },
    { value: "Operate", label: "operate" },
    { value: " Internet Explore", label: "internet explore " },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div>
          <h2 className="main-content-title tx-24 mg-b-5">Add Tourguide</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="#"> Add Tourguide </Breadcrumb.Item>
            <Breadcrumb.Item active>Georgia</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="d-flex">
          <div className="justify-content-center">
            <Button
              variant="white"
              type="button"
              className=" btn-icon-text my-2 me-2"
            >
              <i className="fe fe-download me-2"></i> Import
            </Button>
            <Button
              variant="white"
              type="button"
              className=" btn-icon-text my-2 me-2"
            >
              <i className="fe fe-filter me-2"></i> Filter
            </Button>
            <Button
              variant="primary"
              type="button"
              className="my-2 btn-icon-text"
            >
              <i className="fe fe-download-cloud me-2"></i> Download Report
            </Button>
          </div>
        </div>
      </div>
      {/* <!-- End Page Header --> */}

      {/* <!-- Row --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              {/* <!-- Row (1)--> */}
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  <div className="">
                    <div className="form-group">
                      <Row className="row-sm">
                        <div className="col-sm-4">
                          <label className="">Tourguide Name :</label>
                          <Form.Group className=" mb-3">
                            <Form.Control type="text" placeholder=" " />
                          </Form.Group>
                        </div>
                        <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                          <label className="">Mobile Number :</label>
                          <Form.Group className=" mb-3">
                            <Form.Control type="text" placeholder=" " />
                          </Form.Group>
                        </div>
                        <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                          <label className="">City :</label>
                          <Form.Group className="form-group select2-md">
                            <Searchable
                              className="form-control select2"
                              value="test"
                              placeholder="Choose one" // by default "Search"
                              notFoundText="No result found" // by default "No result found"
                              noInput
                              options={Selectinputsizemd}
                              onSelect={(value) => {
                                console.log(value);
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
              {/* <!-- Row (2)--> */}
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  <div className="">
                    <div className="form-group">
                      <Row className="row-sm">
                        <div className="col-sm-4">
                          <label className="">Email :</label>
                          <Form.Group className=" mb-3">
                            <Form.Control type="text" placeholder=" " />
                          </Form.Group>
                        </div>
                        <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                          <label className="">Date Of Birth :</label>
                          <Form.Group className=" mb-3">
                            <Form.Control type="text" placeholder=" " />
                          </Form.Group>
                        </div>
                        <div className="col-sm-4 mg-t-20 mg-sm-t-0">
                          <label className="">Price Per Day :</label>
                          <Form.Group className=" mb-3">
                            <Form.Control type="text" placeholder=" " />
                          </Form.Group>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* <!-- Row (3)--> */}
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
                                  <Form.Control as="textarea" rows={4} />
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

              {/* <!-- Row (4)--> */}
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
                                  <p className="mg-b-10">Tourguide Photo :</p>
                                  <MUIdropzonebutton name="Add Tourguide Photo" />
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- End Row --> */}

      {/* <!-- Row --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  <div className="">
                    <Button className="btn ripple btn-main-primary btn-block">
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- End Row --> */}
    </>
  );
}

import React, { Fragment, useState, useEffect } from "react";
import Header from "../Header";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Datepicker } from "../Datepicker";
import {
  Card,
  ButtonGroup,
  FormControl,
  InputGroup,
  Col,
  Row,
  Button,
  Table,
} from "react-bootstrap";

const Listpages = {
  ID: "1",
  Name: "Joan Powell",
  POSITION: "Associate Developer",
  SALARY: "$450,870",
};

const HotelPrice = () => {
  const [data, setData] = useState({
    from: "",
    till: "",
    extraBed: "",
    rooms: [],
  });
  // console.log(data);
  const [fromDates, setFromDates] = useState([{ key: "" }]);
  // console.log(fromDates);
  const [currentDate, setCurrentDate] = useState("");
  const [fromtDate, setFromDate] = useState("");
  const [roomCategories, setRoomCategories] = useState([]);
  const [seasonRow, setSeasonRow] = useState([]);
  console.log(seasonRow);
  const Prefilledinput = makeAnimated();
  const optionset2 = [
    { value: "1", label: "Single Room" },
    { value: "2", label: "Double room " },
    { value: "3", label: "Family Room" },
    { value: "4", label: "Delux Room" },
    { value: "5", label: "Suit" },
  ];

  // handle change dropdown multiselect room categories
  const handleChange = (selectedOption) => {
    setRoomCategories(selectedOption);
    const labels = selectedOption.map((option) => option.label);

    setData((prevData) => ({
      ...prevData,
      rooms: [
        ...prevData.rooms,
        ...labels.map((label) => ({ Category: label, price: "" })),
      ],
    }));
  };

  // function add season Row onClick
  const addSeasonRow = () => {
    setSeasonRow((prevSeasonRow) => [...prevSeasonRow, data]);
  };

  // function delete season Row onClick
  const deleteSeasonRow = () => {
    setSeasonRow((prevSeasonRow) => prevSeasonRow.slice(0, -1));
  };

  useEffect(() => {
    const today = new Date();
    const monthText = today.toLocaleString("default", { month: "long" });
    const day = today.getDate();
    const year = today.getFullYear();

    const formattedDate = `${day} ${monthText} ${year}`;
    const formattedDateWithSpace = formattedDate.replace(/\//g, " ");

    setCurrentDate(formattedDateWithSpace);
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      {/* <!-- End Page Header --> */}
      <Header
        title={"Hotel Name"}
        subTitle1={"Add"}
        subTitle2={"price"}
      ></Header>
      {/* <!-- Row Select Room Categories --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  <p className="mg-b-10">Choose Room Categories :</p>
                  <Select
                    classNamePrefix="Select2"
                    closeMenuOnSelect={false}
                    defaultValue={[optionset2[3], optionset2[5]]}
                    components={Prefilledinput}
                    //
                    isMulti
                    options={optionset2}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- End Row Select Room Categories --> */}

      {/* <!-- Row Season Prices --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  {" "}
                  <div>
                    <h6 className="main-content-label mb-1">Bordered Table</h6>
                    <p className="text-muted card-sub-title">
                      Add borders on all sides of the table and cells.
                    </p>
                  </div>
                  <div className="table-responsive" responsive="true">
                    <Table className="table text-nowrap text-md-nowrap table-bordered mg-b-0">
                      <thead>
                        <tr>
                          <th className="wd-lg-0p">From</th>
                          <th className="wd-lg-0p">Till</th>
                          <th className="wd-lg-0p">Extra Bed</th>
                          {roomCategories?.map((item, index) => (
                            <th key={index} className="wd-lg-0p">
                              {item.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {seasonRow?.map((list, index) => (
                          <tr key={index} data-index={index}>
                            <th scope="row">
                              {index === 0
                                ? currentDate
                                : fromDates[index - 1]?.key || ""}
                            </th>
                            <td>
                              <InputGroup className="input-group">
                                <Datepicker
                                  onChange={(date) => {
                                    // console.log(index);
                                    // console.log(date);
                                    setFromDates((prevFromDates) => {
                                      const newFromDates = [...prevFromDates];
                                      if (!newFromDates[index - 1]) {
                                        newFromDates[index - 1] = { key: "" };
                                      }
                                      newFromDates[index - 1].key = date;
                                      return newFromDates;
                                    });
                                  }}
                                />
                              </InputGroup>
                            </td>
                            <td>
                              <InputGroup size="sm">
                                <FormControl
                                  className="bd-t-0 bd-b-0 bd-r-0 bd-l-0"
                                  type="number"
                                />
                              </InputGroup>
                            </td>
                            {roomCategories?.map((item, index) => (
                              <td key={index}>
                                <InputGroup size="sm">
                                  <FormControl
                                    key={index}
                                    className="bd-t-0 bd-b-0 bd-r-0 bd-l-0"
                                    type="number"
                                  />
                                </InputGroup>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
              <Row className="row-sm mt-2 d-flex flex-row-reverse">
                <Col className="d-flex flex-row-reverse" md={2} lg={2} xl={2}>
                  <ButtonGroup aria-label="Basic example" role="group">
                    <Button
                      type="button"
                      onClick={deleteSeasonRow}
                      variant="primary"
                    >
                      <i className="fe fe-minus"></i>
                    </Button>
                    <Button
                      type="button"
                      onClick={addSeasonRow}
                      variant="primary"
                    >
                      <i className="fe fe-plus"></i>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- End Row Season Prices --> */}
      {/* <!-- Row Submit Button --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              <Row className="row-sm">
                <Col md={12} lg={12} xl={12}>
                  <Button
                    type="submit"
                    className="btn ripple btn-main-primary btn-block"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- End Row Submit Button --> */}
    </Fragment>
  );
};

HotelPrice.propTypes = {};

HotelPrice.defaultProps = {};

export default HotelPrice;

import React, { Fragment, useState, useEffect } from "react";
import Header from "../Header";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import makeAnimated from "react-select/animated";
import { useParams } from "react-router-dom";
// import { Datepicker } from "../Datepicker";
import DatePicker from "react-datepicker";
import { Datepicker } from "../Datepicker";

import { toast } from "react-toastify";
import { GetALLItems } from "../../Redux/roomCategoryReducer/roomCategorySlice";
import { CreateHotelRoomCategories } from "../../Redux/accommodationReducer/accommodationSlice";
import {
  GetSingleAccommodation,
  AddHotelPrices,
} from "../../Redux/accommodationReducer/accommodationSlice";
import {
  Card,
  ButtonGroup,
  FormControl,
  InputGroup,
  Col,
  Row,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
//
//
//
//
//
//
//
//

const xdata = [
  {
    from: "27 Feb 2024",
    till: "6 Mar 2024",
    extraBed: 44,
    RoomsCategory: [],
  },
];
//
//============(Hotel Price List Page)===============
const HotelPriceList = () => {
  //===================================================

  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading } = useSelector((state) => state.accommodations);
  const SelectedRooms = useSelector(
    (state) => state.accommodations?.item.hotel_room_categories
  );
  // console.log(SelectedRooms);

  const [roomCategories, setRoomCategories] = useState();

  const [seasonRow, setSeasonRow] = useState(xdata);
  // console.log(seasonRow);
  const [tillError, setTillError] = useState(true);

  // Get all Rooms categories and put it in Dropdown Options
  const allRoomsCategory = useSelector((state) => state.roomCategory?.data);
  const dropdownOptions = allRoomsCategory?.map((item) => ({
    value: item.id,
    label: item.room_category,
  }));

  // Get Single Accommodation from redux store -> Get All Rooms categories
  const AccommodationDatails = useSelector(
    (state) => state.accommodations?.item.hotel_room_categories
  );

  const Hoteldetails = useSelector((state) => state.accommodations?.item);

  const dropdownOptionsRedux = AccommodationDatails?.map((item) => ({
    value: item.room_category.id,
    label: item.room_category.room_category,
  }));

  console.log(Hoteldetails);

  // Set saved Room Categories in multi Select
  useEffect(() => {
    setRoomCategories(dropdownOptionsRedux);
  }, [AccommodationDatails]);

  // handle change dropdown multiselect room categories
  const handleChange = (selectedOption) => {
    setRoomCategories(selectedOption);
  };

  // Send room Categories when press save Button
  const saveRomosCategories = () => {
    const data = roomCategories?.map((item) => item.value);
    const x = { accommodation_id: id, room_category_id: data };
    dispatch(CreateHotelRoomCategories(x));
    dispatch(GetSingleAccommodation(id));
  };

  //============================================================

  const Prefilledinput = makeAnimated();

  // Function to clone the existing row data
  const cloneRowData = (rowData) => {
    return { ...rowData };
  };

  // function add season Row onClick
  const addSeasonRow = () => {
    if (tillError) {
      const newRow = {
        from: "", // Set "from" date to an empty string
        till: "", // Set "till" date to an empty string
        extraBed: "", // Set "extraBed" to an empty string
        RoomsCategory: roomCategories.map((category) => ({
          id: category.value,
          Price: "", // Initialize Price to an empty string
        })),
      };

      // Set the "from" value of the new row to the "till" value of the last row
      const lastRowTillDate = seasonRow[seasonRow.length - 1]?.till || "";
      newRow.from = lastRowTillDate;

      // Add the new row to the season row array
      setSeasonRow((prevSeasonRow) => [...prevSeasonRow, newRow]);
      setTillError(false); // Clear the till error flag
    } else {
      toast.warning("Till Date Should be After From");
    }
  };

  // function delete season Row onClick
  const deleteSeasonRow = () => {
    setSeasonRow((prevSeasonRow) => prevSeasonRow.slice(0, -1));
  };

  // Function to handle changes in the table cells (fromm-till-Extrabed)
  const handleTableCellChange = (value, rowIndex, columnName) => {
    if (columnName === "till") {
      // Check if the till date is before the from date
      if (new Date(value) > new Date(seasonRow[rowIndex].from)) {
        // Set an error flag if the till date is before the from date
        setTillError(true);
      } else {
        // Clear the error flag if the till date is after or equal to the from date
        setTillError(false);
      }
    }

    setSeasonRow((prevSeasonRow) => {
      const updatedSeasonRow = [...prevSeasonRow];

      // Update the specific column value in the row
      updatedSeasonRow[rowIndex][columnName] = value;

      // If the column name is "till" and there's a next row, update its "from" date
      if (columnName === "till" && updatedSeasonRow[rowIndex + 1]) {
        updatedSeasonRow[rowIndex + 1].from = value;
      }

      return updatedSeasonRow;
    });
  };

  // Function to handle changes in the table cells (Rooms Categories)
  const handleRoomTypeChange = (value, rowIndex, columnName, id) => {
    setSeasonRow((prevSeasonRow) => {
      const updatedSeasonRow = [...prevSeasonRow];
      const updatedRoomsCategory = {
        ...updatedSeasonRow[rowIndex].RoomsCategory,
      };
      updatedRoomsCategory[columnName] = {
        id: id,
        Price: parseFloat(value),
      };
      updatedSeasonRow[rowIndex].RoomsCategory = updatedRoomsCategory;
      return updatedSeasonRow;
    });
  };

  useEffect(() => {
    dispatch(GetALLItems());
    dispatch(GetSingleAccommodation(id)).then((response) => {
      const seasonsData = response.payload.hotel_seasons;
      // console.log(seasonsData);

      // Format seasons data into the structure of seasonRow state
      const formattedSeasonsData = seasonsData.map((season) => ({
        from: season.from,
        till: season.till,
        extraBed: season.extrabed_price,
        RoomsCategory: season.hotel_prices.map((room) => ({
          id: room.hotel_room_categories_id,
          Price: room.price, // Initialize Price to an empty string
        })),
      }));
      // Set the formatted data to the seasonRow state
      setSeasonRow(formattedSeasonsData);
    });
  }, [dispatch]);

  // Submit Table data to BackEND
  const SubmitData = () => {
    if (!isValidTillDates() || !isValidPrices()) {
      toast.warning("Please fix the validation errors.");
      return;
    }
    const data = { accommodation_id: id, season_prices: seasonRow };
    dispatch(AddHotelPrices(data));
    // console.log(data);
  };

  //======================================================================
  //==== (Validation)
  //=======================================================================
  // Function to check if all till fields are greater than the corresponding from fields
  const isValidTillDates = () => {
    for (let i = 0; i < seasonRow.length; i++) {
      const fromDate = new Date(seasonRow[i].from);
      const tillDate = new Date(seasonRow[i].till);
      // Compare the "till" date with the "from" date
      if (tillDate <= fromDate) {
        return false; // If "till" date is not after "from" date, return false
      }
    }
    return true; // All dates are valid
  };

  // Function to check if all prices are greater than 0
  const isValidPrices = () => {
    let isValid = true;
    seasonRow.forEach((row) => {
      Object.values(row.RoomsCategory).forEach((category) => {
        const price = parseFloat(category.Price);
        if (isNaN(price) || price <= 0) {
          isValid = false;
        }
      });
    });
    return isValid;
  };

  return (
    <Fragment>
      <ToastContainer />
      {/* <!-- Page Header --> */}

      {/* <!-- End Page Header --> */}
      {Hoteldetails.name && (
        <>
          <Header
            title={Hoteldetails.name}
            subTitle1={Hoteldetails.accommodation_type.accommodation_type}
            subTitle2={Hoteldetails.city.city}
          ></Header>
        </>
      )}

      {/* <!-- Row Select Room Categories --> */}
      <Row className="row-sm">
        <Col lg={12} md={12}>
          <Card className=" custom-card">
            <Card.Body>
              <Row className="row-sm">
                <Col md={10} lg={10} xl={10}>
                  <p className="mg-b-10">Choose Room Categories :</p>
                  <Select
                    classNamePrefix="Select2"
                    closeMenuOnSelect={false}
                    // defaultValue={[dropdownOptions[1], dropdownOptions[2]]}
                    value={roomCategories}
                    components={Prefilledinput}
                    isMulti
                    options={dropdownOptions}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={2} lg={2} xl={2} className="d-flex flex-row">
                  <Button
                    className="btn ripple btn-main-primary btn-block align-self-end mt-1"
                    onClick={saveRomosCategories}
                  >
                    Save
                  </Button>
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
                    <h6 className="main-content-label mb-1">
                      {Hoteldetails.name}
                    </h6>
                    <p className="text-muted card-sub-title">
                      Add Seasons Price List (All Prices should be in USD Dollar
                      $).
                    </p>
                  </div>
                  <div className="table-responsivex" responsive="true">
                    <Table className="table text-nowrap text-md-nowrap table-bordered mg-b-0">
                      <thead>
                        <tr>
                          <th className="wd-30v">From</th>
                          <th className="wd-30v">Till</th>
                          <th className="wd-lg-0p">Extra Bed</th>
                          {SelectedRooms?.map((item, index) => (
                            <th key={index} className="wd-lg-0p">
                              {item.room_category.room_category}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading && (
                          <>
                            <>
                              {" "}
                              {seasonRow?.map((rowData, rowIndex) => (
                                <tr key={rowIndex} data-index={rowIndex}>
                                  <th scope="row">
                                    <InputGroup
                                      className="input-group p-0 m-0"
                                      style={{ width: "150px" }}
                                    >
                                      <Datepicker
                                        ReadOnly={rowIndex === 0 ? false : true}
                                        value={rowData.from}
                                        onChange={(date) =>
                                          handleTableCellChange(
                                            date,
                                            rowIndex,
                                            "from"
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </th>
                                  <td>
                                    <InputGroup
                                      className="input-group wd-100"
                                      style={{ width: "150px" }}
                                    >
                                      <Datepicker
                                        ReadOnly={false}
                                        value={rowData.till}
                                        onChange={(date) =>
                                          handleTableCellChange(
                                            date,
                                            rowIndex,
                                            "till"
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </td>
                                  <td>
                                    <InputGroup size="sm">
                                      <FormControl
                                        value={rowData.extraBed}
                                        onChange={(e) =>
                                          handleTableCellChange(
                                            parseFloat(e.target.value),
                                            rowIndex,
                                            "extraBed"
                                          )
                                        }
                                        className="bd-t-0 bd-b-0 bd-r-0 bd-l-0"
                                        type="number"
                                      />
                                    </InputGroup>
                                  </td>
                                  {SelectedRooms?.map((category, colIndex) => (
                                    <td key={colIndex}>
                                      <InputGroup size="sm">
                                        <FormControl
                                          key={colIndex}
                                          value={
                                            seasonRow[rowIndex].RoomsCategory[
                                              colIndex
                                            ]?.Price || ""
                                          }
                                          onChange={(e) =>
                                            handleRoomTypeChange(
                                              e.target.value,
                                              rowIndex,
                                              colIndex,
                                              category.id
                                            )
                                          }
                                          className="bd-t-0 bd-b-0 bd-r-0 bd-l-0"
                                          type="number"
                                        />
                                      </InputGroup>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </>
                          </>
                        )}
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
                    onClick={SubmitData}
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

HotelPriceList.propTypes = {};

HotelPriceList.defaultProps = {};

export default HotelPriceList;

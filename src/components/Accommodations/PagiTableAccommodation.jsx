import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Searchable from "react-searchable-dropdown";
import {
  Pagination,
  Spinner,
  Table,
  Col,
  Row,
  Card,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { Share } from "../../Redux/accommodationReducer/accommodationSlice";
import { xorBy } from "lodash";

const ratedropdown = [
  {
    value: 4,
    label: "4 Star",
  },
  {
    value: 5,
    label: "5 Star",
  },
];

const PagiTableAccommodation = ({ data, remove, isLoading, tableTitle }) => {
  const [share, setShare] = useState([]);
  // Create a ref for the search input
  const inputRef = useRef(null);

  //Selectors
  const selectedItem = useSelector((state) => state.country?.item);

  //Get the cities dropdown
  const dropdownCities = useMemo(() => {
    if (!selectedItem || !selectedItem.cities) {
      return [];
    }
    return selectedItem.cities.map((item) => ({
      value: item.id,
      label: item.city,
    }));
  }, [selectedItem]);

  // States for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRate, setSelectedRate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedAccommodationType, setSelectedAccommodationType] =
    useState(null);
  const [cityPlaceholder, setCityPlaceholder] = useState("City");
  const [typePlaceholder, setTypePlaceholder] = useState("Type..");
  const [ratePlaceholder, setRatePlaceholder] = useState("Rate..");

  //Get the Accommodation Types dropdown
  const uniqueAccommodationTypes = useMemo(() => {
    const allAccommodationTypes = data.map((item) => ({
      value: item.accommodation_type.id,
      label: item.accommodation_type.accommodation_type,
    }));

    const unique = allAccommodationTypes.reduce(
      (unique, current) => {
        if (!unique.find((item) => item.label === current.label)) {
          unique.push(current);
        }
        return unique;
      },
      [] // Initialize unique array as an empty array
    );

    // Optionally, you can prepend "No Accommodation" here if needed
    return unique;
  }, [data]);

  // Event handler for the search button
  const handleSearchButtonClick = () => {
    const searchValue = inputRef.current.value;
    setSearchQuery(searchValue);
  };

  // Filter accommodations based on the selected criteria
  const filteredAccommodations = useMemo(() => {
    return data.filter((item) => {
      // Filter by rate
      const rateMatch = selectedRate ? item.rate == selectedRate : true;
      // Filter by city
      const cityMatch = selectedCity ? item.city.id === selectedCity : true;
      // Filter by search query
      const searchMatch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      // Filter by accommodation type
      const typeMatch = selectedAccommodationType
        ? item.accommodation_type.id === selectedAccommodationType
        : true;
      // Return true if all filters match
      return rateMatch && cityMatch && typeMatch && searchMatch;
    });
  }, [
    data,
    selectedRate,
    selectedCity,
    selectedAccommodationType,
    searchQuery,
  ]);

  const dispatch = useDispatch();

  //paginate
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredAccommodations.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredAccommodations.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const Delete = 0;

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

  const handleShareChange = (index, item) => {
    const updatedShare = [...share];
    updatedShare[index] = updatedShare[index] === 1 ? 0 : 1;
    setShare(updatedShare);

    const updatedItem = { id: item.id, share: updatedShare[index] };
    // console.log(updatedItem);
    dispatch(Share(updatedItem));
  };
  useEffect(() => {
    if (data && data.length > 0) {
      const shareValues = data.map((item) => item.share);
      setShare(shareValues);
    }
  }, [data]);

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
              <Row className="row-sm">
                <Col md={6} lg={4} xl={4} className="mb-2">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Search ..."
                      ref={inputRef} // Attach the ref to the input field
                    />
                    <Button
                      variant="primary"
                      className="btn ripple"
                      type="button"
                      onClick={handleSearchButtonClick} // Bind the event handler to the button's onClick event
                    >
                      Search
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={6} lg={2} xl={2} className="mb-2">
                  <Searchable
                    className="form-control select2"
                    value={selectedCity}
                    placeholder={cityPlaceholder}
                    notFoundText="No result found" // by default "No result found"
                    noInput
                    options={dropdownCities}
                    onSelect={(value) => {
                      setSelectedCity(value);
                    }}
                    listMaxHeight={140} //by default 140
                  />
                </Col>
                <Col md={6} lg={2} xl={2} className="mb-2">
                  <Searchable
                    className="form-control select2"
                    value="test"
                    placeholder="Type.." // by default "Search"
                    notFoundText="No result found" // by default "No result found"
                    noInput
                    options={uniqueAccommodationTypes}
                    onSelect={(value) => {
                      setSelectedAccommodationType(value);
                    }}
                    listMaxHeight={140} //by default 140
                  />
                </Col>
                <Col md={6} lg={2} xl={2} className="mb-2">
                  <Searchable
                    className="form-control select2"
                    value="test"
                    placeholder="Rate.." // by default "Search"
                    notFoundText="No result found" // by default "No result found"
                    noInput
                    options={ratedropdown}
                    onSelect={(value) => {
                      setSelectedRate(value);
                    }}
                    listMaxHeight={140} //by default 140
                  />
                </Col>
                <Col md={6} lg={2} xl={2} className="mb-2">
                  {" "}
                  <Button
                    // type="submit"
                    className="btn ripple btn-main-primary btn-block"
                    onClick={() => {
                      setSelectedRate(null);
                      setSelectedCity(null);
                      setSelectedAccommodationType(null);
                      setSearchQuery("");
                      inputRef.current.value = "";
                      setCityPlaceholder("City"); // Reset the placeholder to its default value
                      setTypePlaceholder("Type.."); // Reset the placeholder to its default value
                      setRatePlaceholder("Rate.."); // Reset the placeholder to its default value
                    }}
                  >
                    Reset Filter
                  </Button>
                </Col>
              </Row>
              <div className="table-responsive border userlist-table">
                {/* Table */}
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
                        <span>Share</span>
                      </th>
                      <th className="wd-lg-0p">
                        <span>Photo</span>
                      </th>

                      <th className="wd-lg-10p">
                        <span>Name</span>
                      </th>
                      <th className="wd-lg-60p">
                        <span>Mobile</span>
                      </th>
                      <th className="wd-lg-60p">
                        <span>Prices</span>
                      </th>

                      <th className="wd-lg-20p">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!isLoading && (
                      <>
                        {records.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <label className="custom-switch form-switch mb-0  p-0">
                                <input
                                  type="checkbox"
                                  name="custom-switch-radio"
                                  checked={share[index] === 1 ? true : false}
                                  className="custom-switch-input"
                                  onChange={(event) => {
                                    // console.log(event.target.checked);
                                    handleShareChange(index, item);
                                  }}
                                />
                                <span className="custom-switch-indicator"></span>
                              </label>
                            </td>
                            <td>
                              <img
                                alt="avatar"
                                className="driver rounded avatar-md me-2"
                                src={
                                  process.env.REACT_APP_API_BASE_URL +
                                    "/HotelCover/" +
                                    item.cover_photo || ""
                                }
                              />
                            </td>

                            <td>
                              <Link
                                to={`/view-accommodation/${item.id}`}
                                className="  "
                              >
                                {item.name}
                              </Link>
                            </td>
                            <td>{item.mobile}</td>
                            <td>
                              {item.accommodation_type.id == 1 ? (
                                <>
                                  <Link
                                    to={`/hotel-price-list/${item.id}`}
                                    className="btn btn-sm btn-primary me-1"
                                  >
                                    Prices
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <Link
                                    to={`/apartment-price-list/${item.id}`}
                                    className="btn btn-sm btn-primary me-1"
                                  >
                                    Prices
                                  </Link>
                                </>
                              )}
                            </td>

                            <td>
                              <Link
                                to={`/accommodation/${item.id}`}
                                className="btn btn-sm btn-primary me-1"
                              >
                                <i className="fe fe-search"></i>
                              </Link>

                              <Link
                                to={`/edit-accommodation/${item.id}`}
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

PagiTableAccommodation.propTypes = {};

PagiTableAccommodation.defaultProps = {};

export default PagiTableAccommodation;

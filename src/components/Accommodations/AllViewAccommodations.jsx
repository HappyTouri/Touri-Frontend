import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../TourDetails/Header";
import Rating from "@mui/material/Rating";
// import { Breadcrumb } from "react-bootstrap";
import { GetALLItems } from "../../Redux/accommodationReducer/accommodationSlice";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Pagination,
  Row,
  InputGroup,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { GetALLCities } from "../../Redux/cityReducer/citySlice";

const AllViewAccommodations = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //Selectors
  const { data } = useSelector((state) => state.accommodations);
  const AllCities = useSelector((state) => state.city?.data || []);
  // console.log(AllCities);

  // States for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRate, setSelectedRate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedAccommodationType, setSelectedAccommodationType] =
    useState(null);

  // Create a ref for the search input
  const inputRef = useRef(null);

  // Event handler for the search button
  const handleSearchButtonClick = () => {
    // Get the value from the input field using the ref
    const searchValue = inputRef.current.value;
    // Update the searchQuery state
    setSearchQuery(searchValue);
  };

  // Filter accommodations based on the selected criteria
  const filteredAccommodations = useMemo(() => {
    return data.filter((item) => {
      // Filter by Hotel Share
      const share = item.share == 1;
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
      return rateMatch && cityMatch && typeMatch && share && searchMatch;
    });
  }, [
    data,
    selectedRate,
    selectedCity,
    selectedAccommodationType,
    searchQuery,
  ]);

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

  useEffect(() => {
    if (id) {
      dispatch(GetALLItems(id));
      dispatch(GetALLCities(id));
    }
  }, [dispatch, id]);

  return (
    <Fragment>
      <MainHeader />
      <div className="main-content ">
        <div className="main-container container-fluid">
          <div className="inner-body">
            <ToastContainer />
            {/* <!-- Page Header --> */}
            <div className="page-header layer3 ">
              <div className="">
                <h2 className="main-content-title tx-24 mg-b-5">
                  All Accommodations
                </h2>
                {/* <Breadcrumb>
                  <Breadcrumb.Item href="#">All</Breadcrumb.Item>
                  <Breadcrumb.Item active> Accommodations</Breadcrumb.Item>
                </Breadcrumb> */}
              </div>
            </div>
            {/* <!-- End Page Header --> */}

            {/* <!--Row cards and filter and paginate--> */}
            <Row className="row-sm">
              <Col md={8} xl={9}>
                <Row className="row-sm">
                  {records?.map((items, index) => (
                    <Col
                      md={6}
                      lg={6}
                      xl={4}
                      sm={6}
                      key={index}
                      data-index={index}
                    >
                      <Card className="custom-card">
                        <div className="p-0 ht-100p">
                          <div className="product-grid">
                            <div className="product-image">
                              <Link
                                to={`/view-accommodation/${items.id}`}
                                className="image"
                              >
                                <img
                                  className="pic-1"
                                  alt="product1"
                                  src={
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/HotelCover/" +
                                    items?.cover_photo
                                  }
                                />
                              </Link>
                              <Link to="#" className="product-like-icon">
                                <i className={`far fa-${items.Favorite}`}></i>
                              </Link>
                              <Badge
                                className={`product-${items.discountoffer}-label`}
                                bg={items.Productdiscounttext}
                              >
                                {items.Productdiscount}
                              </Badge>
                            </div>
                            <div className="product-content">
                              <h3 className="title mb-2">
                                <Link to="#">{items.name}</Link>
                              </h3>
                              <div className="mb-2">
                                <span className="me-1">
                                  {items.accommodation_type.accommodation_type}
                                </span>
                                <span className="text-primary ms-1">
                                  {items.city.city}
                                </span>
                              </div>
                              <Rating
                                name="no-value"
                                size="small"
                                value={items?.rate || 1}
                                readOnly={true}
                                max={5}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row className="row-sm mb-3">
                  <nav>
                    {/* pagination */}
                    <Pagination className="pagination mb-0">
                      <Pagination.Item onClick={prePage}>
                        Previous
                      </Pagination.Item>

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
                  </nav>
                </Row>
              </Col>

              <Col md={4} xl={3}>
                <Card className="custom-card">
                  <Card.Body>
                    <Row className="row-sm">
                      <Col sm={12}>
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
                    </Row>
                  </Card.Body>
                </Card>
                <Row className="row-sm">
                  <Col md={12} lg={12}>
                    <Card className="custom-card">
                      <Card.Header className="custom-card-header">
                        <h6 className="main-content-label mb-3">Filter</h6>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Rating :</Form.Label>
                          <Form.Check
                            type="radio"
                            name="rate"
                            value={4}
                            checked={selectedRate == 4}
                            label="4.Star"
                            onChange={(e) => setSelectedRate(e.target.value)}
                          />
                          <Form.Check
                            type="radio"
                            name="rate"
                            value={5}
                            label="5.Star"
                            checked={selectedRate == 5}
                            onChange={(e) => setSelectedRate(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Category :</Form.Label>
                          {uniqueAccommodationTypes?.map((items, index) => (
                            <Form.Check
                              key={index}
                              type="radio"
                              name="accommodationType"
                              value={items.value}
                              label={items.label}
                              checked={
                                selectedAccommodationType === items.value
                              }
                              onChange={(e) =>
                                setSelectedAccommodationType(
                                  parseInt(e.target.value)
                                )
                              }
                              // defaultChecked={index === 0} // You can set the first option as default checked if needed
                            />
                          ))}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>City :</Form.Label>
                          {AllCities?.map((city, index) => (
                            <Form.Check
                              key={index}
                              type="radio"
                              name="city"
                              value={city.id}
                              label={city.city}
                              checked={selectedCity === city.id}
                              onChange={(e) =>
                                setSelectedCity(parseInt(e.target.value))
                              }
                              // defaultChecked={index === 0} // You can set the first option as default checked if needed
                            />
                          ))}
                        </Form.Group>

                        <Link
                          to
                          className="btn ripple btn-primary btn-block mt-3"
                          href="#"
                          onClick={() => {
                            setSelectedRate(null);
                            setSelectedCity(null);
                            setSelectedAccommodationType(null);
                            setSearchQuery("");
                            inputRef.current.value = "";
                          }}
                        >
                          Reset Filter
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* <!- End Row cards and filter and paginate--> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AllViewAccommodations.propTypes = {};

AllViewAccommodations.defaultProps = {};

export default AllViewAccommodations;

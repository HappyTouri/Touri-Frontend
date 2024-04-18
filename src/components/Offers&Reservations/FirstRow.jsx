import React, { useEffect, useState, useMemo } from "react";
import Searchable from "react-searchable-dropdown";
import { useSelector, useDispatch } from "react-redux";
import SecondRowS from "./SecondRowS";
import ThirdRow from "./ThirdRow";
import { Col, Form, Row } from "react-bootstrap";
import {
  handleChange_City,
  handleChange_tourTitle,
  handleChange_accommodation_type,
  handleChange_tourguide_checked,
  calculateTourguidePrice,
  calculateAccommodationsPrice,
  calculateTotalPrice,
} from "./TourSlice";

export default function FirstRow({ item, index }) {
  const dispatch = useDispatch();
  // console.log(item);
  //Selectors
  const selectedItem = useSelector((state) => state.country?.item);
  const AllTours = useSelector((state) => state.tour.data);
  const AllHotels = useSelector((state) => state.accommodations.data);

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

  //Get the Tours dropdown
  const dropdownTours = useMemo(() => {
    if (!AllTours || item.city_id === 0) {
      return [];
    }
    // Filter tours by cityId
    const toursFilteredByCity = AllTours.filter((tour) => {
      return tour.city_id === item.city_id;
    });
    return toursFilteredByCity.map((item) => ({
      value: item.id,
      label: item.tour_title_EN,
    }));
  }, [AllTours, item.city_id]);

  //Get the Accommodation Types dropdown
  const uniqueAccommodationTypes = useMemo(() => {
    const allAccommodationTypes = AllHotels.map((item) => ({
      value: item.accommodation_type.id,
      label: item.accommodation_type.accommodation_type,
    }));
    const unique = allAccommodationTypes.reduce((unique, current) => {
      if (!unique.find((item) => item.label === current.label)) {
        unique.push(current);
      }
      return unique;
    }, []);
    const newObj = {
      value: 0,
      label: "No Accommodation",
    };
    // Prepend "No Accommodation" to the array of unique accommodation types
    return [newObj, ...unique];
  }, [AllHotels]);

  //handel chande tourguide check box
  const handleTourguidePrice = (checked) => {
    if (checked) {
      const price = selectedItem.tourguide_prices[0].price;
      dispatch(
        handleChange_tourguide_checked({
          index: index,
          check: true,
          price: price,
        })
      );
    } else {
      dispatch(
        handleChange_tourguide_checked({ index: index, check: false, price: 0 })
      );
    }

    dispatch(calculateTourguidePrice());
    dispatch(calculateTotalPrice());
  };

  return (
    <>
      {/* first row */}

      <Row className="p-1 m-0  align-items-center pos-relative ">
        <Col xxl={2} className="p-1 ">
          <span className="bg-success p-1 rounded me-1">
            {item?.index || "0"}
          </span>
          <span className="bg-primary p-1 rounded">
            {item?.date || "Loading..."}
          </span>
        </Col>
        <Col xxl={2} className="p-1   z-index-30">
          <Form.Group className=" select2-sm ">
            <Searchable
              className="form-control select2 "
              value=""
              placeholder={item?.city_name || "Loading..."}
              notFoundText="No result found" // by default "No result found"
              noInput
              options={dropdownCities}
              onSelect={(select) => {
                dispatch(handleChange_City({ index: index, id: select }));
              }}
              listMaxHeight={140} //by default 140
              // dropdownStyle={{ zIndex: 2000 }}
            />
          </Form.Group>
        </Col>
        <Col xxl={3} className="p-1   z-index-20">
          <Form.Group className=" select2-sm">
            <Searchable
              className="form-control select2"
              value=""
              placeholder={item?.tour_name || "Tour Title"} // by default "Search"
              notFoundText="No result found" // by default "No result found"
              noInput
              options={dropdownTours}
              onSelect={(select) => {
                dispatch(handleChange_tourTitle({ index: index, id: select }));
              }}
              listMaxHeight={140} //by default 140
            />
          </Form.Group>
        </Col>
        <Col xxl={2} className="p-1   z-index-20">
          <Form.Group className=" select2-sm">
            <Searchable
              className="form-control select2"
              value=""
              placeholder={item?.accommodation_type_name || "No Accommodation"}
              notFoundText="No result found"
              options={uniqueAccommodationTypes}
              onSelect={(select) => {
                dispatch(
                  handleChange_accommodation_type({ index: index, id: select })
                );
                dispatch(calculateAccommodationsPrice());
                dispatch(calculateTotalPrice());
              }}
              listMaxHeight={140} //by default 140
            />
          </Form.Group>
        </Col>
        <Col xxl={2} className="p-1   z-index-0">
          <label className=" custom-control custom-checkbox  flex-grow-1 mb-0">
            <input
              type="checkbox"
              className="custom-control-input"
              name="example-checkbox1"
              value="option1"
              defaultChecked={item?.tourguide}
              onChange={(e) => handleTourguidePrice(e.target.checked)}
            />
            <span className="custom-control-label custom-control-label-md  tx-16">
              Tourguide
            </span>
          </label>
        </Col>
        <Col xxl={1} className="p-1 ">
          <span className="d-flex justify-content-end">
            price : {item.tourguide_price}$
          </span>
        </Col>
      </Row>
      {/* Second row */}
      {item.accommodation_type_id == 1 && (
        <>
          <SecondRowS item={item} index={index} />
        </>
      )}

      {/* Third row */}
      {item.accommodation_type_id !== 1 &&
        item.accommodation_type_id !== 0 &&
        item.accommodation_type_id && (
          <>
            <ThirdRow item={item} index={index} />
          </>
        )}
    </>
  );
}

import React, { useState, useMemo, useCallback } from "react";
import Searchable from "react-searchable-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";

import {
  handleChange_apartment,
  calculateAccommodationsPrice,
  calculateTotalPrice,
} from "./TourSlice";

export default function ThirdRow({ index, item }) {
  const dispatch = useDispatch();
  // console.log(item);
  //selectors
  const AllHotels = useSelector((state) => state.accommodations.data);

  //States
  const [price, setPrice] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState();
  // console.log(selectedApartment);

  // filter all hotels by TypeOfAccommodation_id & City_id
  const AccommodationDropdown = useMemo(() => {
    // Filter all hotels by TypeOfAccommodation_id & City_id
    const filterHotels = AllHotels.filter((hotel) => {
      return (
        hotel.accommodation_type.id === item.accommodation_type_id &&
        hotel.city.id === item.city_id &&
        hotel.share === 1
      );
    });

    // Map filtered hotels to dropdown options
    return filterHotels.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [AllHotels, item.accommodation_type_id, item.city_id]);

  const handelAccommodationDropdown = useCallback(
    (value) => {
      // onDataChange(index, "number_of_rooms", 0);
      const Apartment = AllHotels.find((item) => item.id === value);
      setSelectedApartment(Apartment);
      const filter_by_date = Apartment.apartment_season_prices.find(
        (apartment) => {
          const fromDateItem = new Date(apartment.from);
          const toDateItem = new Date(apartment.till);
          const date = new Date(item.date);

          // Add one day to each date
          fromDateItem.setDate(fromDateItem.getDate() + 1);
          toDateItem.setDate(toDateItem.getDate() + 1);
          date.setDate(date.getDate() + 1);

          // Convert all dates to the same timezone to ensure accurate comparison
          fromDateItem.setHours(0, 0, 0, 0);
          toDateItem.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);

          return fromDateItem <= date && toDateItem > date;
        }
      );

      const getPrice = filter_by_date.season_price;
      setPrice(getPrice);
      dispatch(handleChange_apartment({ index, id: value, price: getPrice }));
      dispatch(calculateAccommodationsPrice());
      dispatch(calculateTotalPrice());
    },
    [AllHotels, item.date]
  );

  return (
    <>
      {/* Third Row */}
      <Row className="p-1 m-0  align-items-center bg-primary-transparent rounded">
        <Col xxl={3} className="p-1">
          <Form.Group className=" select2-sm  ">
            <Searchable
              className="form-control select2 z-index-0"
              value="test"
              placeholder={item?.accommodation_name || "Accommodation"}
              notFoundText="No result found" // by default "No result found"
              noInput
              options={AccommodationDropdown}
              onSelect={handelAccommodationDropdown}
              listMaxHeight={140} //by default 140
            />
          </Form.Group>
        </Col>
        <Col xxl={2} className="p-1">
          {selectedApartment && (
            <>
              <span>
                Number of Rooms :
                {selectedApartment?.apartment_details?.number_of_rooms || 0}
              </span>
            </>
          )}
        </Col>
        <Col xxl={2} className="p-1">
          {selectedApartment && (
            <>
              <span>
                Capacity :
                {selectedApartment?.apartment_details?.number_of_peoples || 0}
              </span>
            </>
          )}
        </Col>
        <Col xxl={5} className="p-1">
          <span className="d-flex justify-content-end">
            price : {item?.accommodation_price}$
          </span>
        </Col>
      </Row>
    </>
  );
}

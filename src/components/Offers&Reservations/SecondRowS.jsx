import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Searchable from "react-searchable-dropdown";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import SecondRowE from "./SecondRowE";
import {
  handleChange_accomodation,
  handleChange_number_of_rooms,
} from "./TourSlice";

const RoomsType = {
  room_category_id: 0,
  extrabed: 0,
};

export default function SecondRowS({ index, item }) {
  const dispatch = useDispatch();
  //selectors
  const AllHotels = useSelector((state) => state.accommodations.data);
  // console.log(item);

  const [roomsCategories, setRoomCategories] = useState([1]);

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
  useEffect(() => {
    setRoomCategories(item.roomsCategories);
  }, [item.roomsCategories]);
  return (
    <>
      {/* Second Row Start */}

      <Row className="p-0 m-0  align-items-start bg-primary-transparent rounded">
        <Col xxl={4} className="p-0 ">
          <Row className="p-1 m-0  align-items-center pos-relative ">
            <Col xxl={8} className="p-1 z-index-20">
              <Form.Group className=" select2-sm  ">
                <Searchable
                  className="form-control select2 z-index-0"
                  value="test"
                  placeholder={item?.accommodation_name || "Accommodation"} // by default "Search"
                  notFoundText="No result found" // by default "No result found"
                  noInput
                  options={AccommodationDropdown}
                  onSelect={(select) => {
                    dispatch(
                      handleChange_accomodation({
                        index: index,
                        id: select,
                      })
                    );
                  }}
                  listMaxHeight={140} //by default 140
                />
              </Form.Group>
            </Col>
            <Col xxl={4} className="p-1">
              <InputGroup size="sm">
                <FormControl
                  type="number"
                  placeholder="# Rooms"
                  value={item?.number_of_rooms}
                  min={1}
                  max={10}
                  onChange={(e) => {
                    dispatch(
                      handleChange_number_of_rooms({
                        index,
                        number: e.target.value,
                      })
                    );
                  }}
                />
              </InputGroup>
            </Col>
          </Row>
        </Col>
        <Col xxl={8} className="p-0">
          {roomsCategories &&
            roomsCategories.length > 0 &&
            roomsCategories.map((roomCategory, indexx) => (
              <SecondRowE
                key={indexx}
                item={roomCategory}
                hotel_id={item.accommodation_id}
                index={index}
                indexx={indexx}
                indexDate={item.date}
              />
            ))}
        </Col>
      </Row>
    </>
  );
}

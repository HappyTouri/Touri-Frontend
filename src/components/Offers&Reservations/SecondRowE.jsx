import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Searchable from "react-searchable-dropdown";
import { Col, Form, Row } from "react-bootstrap";
import {
  handleChange_roomCategory,
  handleChange_extrabed_checkbox,
  calculateHotelPrice,
  calculateAccommodationsPrice,
  calculateTotalPrice,
} from "./TourSlice";

export default function SecondRowE({
  item,
  hotel_id,
  index,
  indexx,
  indexDate,
}) {
  const dispatch = useDispatch();
  // console.log(item);
  //Selectors
  const AllHotels = useSelector((state) => state.accommodations.data);
  const { data } = useSelector((state) => state.c_tour);

  //States
  const [selectedRoomCategory, setSelectedRoomCategory] = useState();

  //calculate room Price
  const roomPrice = useMemo(() => {
    // Ensure that data.tourDetails[index] exists
    if (data.tourDetails[index]) {
      // Ensure that data.tourDetails[index].roomsCategories[indexx] exists
      if (data.tourDetails[index].roomsCategories[indexx]) {
        const { room_price, extrabed_price } =
          data.tourDetails[index].roomsCategories[indexx];
        // Calculate total room price including extrabed price
        return room_price + extrabed_price;
      }
    }
    // Return a default value if the data is not available
    return 0; // You can adjust this default value as needed
  }, [data.tourDetails[index], indexx]); // Include dependencies in the array

  // Get dropdown rooms categories
  const dropdowmRoomsCategories = useMemo(() => {
    const filterHotels = AllHotels.find((hotel) => {
      return hotel.id == hotel_id;
    });

    if (filterHotels) {
      // Map filtered hotels to dropdown options
      return filterHotels.hotel_room_categories.map((item) => ({
        value: item.id,
        label: item.room_category.room_category,
      }));
    }

    return [];
  }, [AllHotels, hotel_id]); // Dependency array

  //handelChange Room Category dropdown
  const handelRoomCategoryDropdown = useCallback(
    (value) => {
      const filterHotels = AllHotels.find((hotel) => {
        return hotel.id == hotel_id;
      });
      console.log(filterHotels);

      const roomCategory = filterHotels.hotel_room_categories.find(
        (category) => category.id === value
      );

      const filter_by_date = roomCategory.hotel_prices.find((item) => {
        const fromDateItem = new Date(item.hotel_season.from);
        const toDateItem = new Date(item.hotel_season.till);
        const date = new Date(indexDate);
        return fromDateItem <= date && toDateItem > date;
      });

      setSelectedRoomCategory(filter_by_date);
      // setRoomPrice(filter_by_date.price);
      dispatch(
        handleChange_roomCategory({
          tourDetailIndex: index,
          roomCategoryIndex: indexx,
          roomCategoryId: value,
          roomPrice: filter_by_date.price,
        })
      );
      dispatch(calculateHotelPrice({ tourDetailIndex: index }));
      dispatch(calculateAccommodationsPrice());
      dispatch(calculateTotalPrice());
    },
    [AllHotels]
  );

  // handel change checkbox extrabed
  const handleExtrabedPrice = useCallback(
    (checked) => {
      const extrabed_price = checked
        ? selectedRoomCategory.hotel_season.extrabed_price
        : 0;
      dispatch(
        handleChange_extrabed_checkbox({
          tourDetailIndex: index,
          roomCategoryIndex: indexx,
          extrabed: checked,
          extrabed_price: extrabed_price,
        })
      );
      dispatch(calculateHotelPrice({ tourDetailIndex: index }));
      dispatch(calculateAccommodationsPrice());
      dispatch(calculateTotalPrice());
    },
    [indexx, selectedRoomCategory, roomPrice]
  );

  return (
    <>
      {/* Second Row End */}

      <Row className="p-1 m-0  align-items-center  ">
        <Col xxl={4} className="p-1 z-index-20">
          <Form.Group className=" select2-sm ">
            <div className="d-flex  ">
              <Searchable
                className="form-control select2 z-index-200 pos-absolute"
                value="test"
                placeholder={item?.room_category_name} // by default "Search"
                notFoundText="No result found" // by default "No result found"
                noInput
                options={dropdowmRoomsCategories}
                onSelect={(value) => {
                  handelRoomCategoryDropdown(value);
                }}
                listMaxHeight={140} //by default 140
              />
            </div>
          </Form.Group>
        </Col>
        <Col xxl={3} className="p-1">
          <label className=" custom-control custom-checkbox  flex-grow-1 mb-0">
            <input
              type="checkbox"
              className="custom-control-input"
              name="example-checkbox1"
              value="option1"
              defaultChecked={item?.extrabed}
              onChange={(e) => handleExtrabedPrice(e.target.checked)}
              disabled={selectedRoomCategory ? false : true}
            />
            <span className="custom-control-label custom-control-label-md  tx-16">
              Extra Bed
            </span>
          </label>
        </Col>
        <Col xxl={5} className="p-1 ">
          <span className="d-flex justify-content-end">
            price :&ensp;
            {roomPrice}
            &ensp;$
          </span>
        </Col>
      </Row>
    </>
  );
}

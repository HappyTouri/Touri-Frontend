import { createSlice } from "@reduxjs/toolkit";

const name = "c_tour";

const RoomsType = {
  index: 0,
  room_category_id: 0,
  room_category_name: "Room Category",
  room_price: 0,
  extrabed: false,
  extrabed_price: 0,
};

const tourD = {
  index: 0,
  date: " ",
  city_id: 0,
  city_name: "City",
  title: "",
  tour_id: 0,
  tour_name: "Tour Title",
  accommodation_type_id: null,
  accommodation_type_name: "Accommodation Type",
  tourguide: 0,
  tourguide_price: 0,
  accommodation_id: null,
  accommodation_name: "Accommodation",
  accommodation_price: 0,
  number_of_rooms: 0,
  roomsCategories: [],
};

// custom function to icrease date
const incrementDate = (dateToInc, index) => {
  const initialDate = new Date(dateToInc);
  initialDate.setDate(initialDate.getDate() + index);
  return initialDate.toISOString().split("T")[0];
};

const initialState = {
  data: {
    operator_id: 1,
    country_id: 1,
    website_share: false,
    tour_name: "",
    tour_title: "",
    tour_header_name: "",
    transportation_id: 0,
    transportation_name: " ",
    transportation_Type_price: 0,
    from: "",
    till: "",
    number_of_days: 0,
    tourDetails: [],
    tourguide_price: 0,
    transportation_price: 0,
    hotels_price: 0,
    profit_price: 0,
    total_price: 0,
  },
  TourHeaders: [],
};

const reducers = {
  set_edit: (state, { payload }) => {
    return {
      ...state,
      data: payload,
    };
  },
  set_country_id: (state, { payload }) => {
    return { ...state, data: { ...state.data, country_id: payload } };
  },
  handleChange_website_share: (state, { payload }) => {
    return { ...state, data: { ...state.data, website_share: payload } };
  },
  handleChange_tour_name: (state, { payload }) => {
    return { ...state, data: { ...state.data, tour_name: payload } };
  },
  handleChange_transportation_id: (state, { payload: { id, price } }) => {
    const transportation_Type_price = price;
    return {
      ...state,
      data: {
        ...state.data,
        transportation_id: id,
        transportation_Type_price: transportation_Type_price,
      },
    };
  },
  handleChange_from_date: (state, { payload: { from, till } }) => {
    // Update from and till dates in the tour data
    const updatedData = {
      ...state.data,
      from,
      till,
    };

    // Convert the from date to a Date object
    const fromDate = new Date(from);

    // Update dates in tourDetails
    const updatedTourDetails = state.data.tourDetails.map((detail, index) => {
      // Add the index number of days to the from date
      const detailDate = new Date(fromDate);
      detailDate.setDate(fromDate.getDate() + index);

      return {
        ...detail,
        date: detailDate.toISOString().split("T")[0],
      };
    });

    return {
      ...state,
      data: {
        ...updatedData,
        tourDetails: updatedTourDetails,
      },
    };
  },
  handleChange_inc: (state) => {
    const newNumberOfDays = state.data.number_of_days + 1;
    const tillDate = new Date(state.data.till);
    tillDate.setDate(tillDate.getDate() + 1);
    const till = tillDate.toISOString().split("T")[0];

    if (newNumberOfDays <= 30) {
      const tourHeader = state.TourHeaders.find(
        (item) => item.day === newNumberOfDays
      );

      const existingTourDetails = state.data.tourDetails; // Copy existing tour details
      const lastTourDetailIndex = existingTourDetails.length - 1; // Index of the last tour detail

      // If the last tour detail exists, start incrementing the index from its next index
      const startIndex = lastTourDetailIndex >= 0 ? lastTourDetailIndex + 1 : 0;

      const newTourDetails = Array.from(
        { length: newNumberOfDays - existingTourDetails.length }, // Calculate the length of new tour details to be added
        (_, index) => ({
          ...tourD,
          index: startIndex + index + 1, // Increment index by startIndex + 1 to avoid repetition
          date: incrementDate(state.data.from, startIndex + index),
        })
      );

      return {
        ...state,
        data: {
          ...state.data,
          number_of_days: newNumberOfDays,
          till,
          tour_title: tourHeader ? tourHeader.id : 0,
          tour_header_name: tourHeader ? tourHeader.title_EN : "",
          tourDetails: [...existingTourDetails, ...newTourDetails], // Concatenate existing and new tour details
          //   tourguide_price: [...state.data.tourguide_price, { price: 0 }],
        },
      };
    }
    return state; // Return state unchanged if the number of days exceeds 30
  },
  handleChange_dec: (state) => {
    const newNumberOfDays = state.data.number_of_days - 1;

    if (newNumberOfDays >= 1) {
      const tourHeader = state.TourHeaders.find(
        (item) => item.day === newNumberOfDays
      );
      const slicedTourDetails = state.data.tourDetails.slice(0, -1);

      return {
        ...state,
        data: {
          ...state.data,
          number_of_days: newNumberOfDays,
          till: incrementDate(state.data.till, -1), // Subtracting 1 day from till date
          tour_title: tourHeader ? tourHeader.id : 0,
          tour_header_name: tourHeader ? tourHeader.title_EN : "",
          tourDetails: slicedTourDetails,
        },
      };
    }

    return state; // Return state unchanged if the number of days is already 1
  },
  handleChange_City: (state, { payload: { index, id } }) => {
    if (state.data.tourDetails[index]) {
      const updatedTourDetails = [...state.data.tourDetails];
      updatedTourDetails[index] = { ...updatedTourDetails[index], city_id: id };
      return {
        ...state,
        data: { ...state.data, tourDetails: updatedTourDetails },
      };
    }
    return state; // Return state unchanged if the index is out of bounds
  },
  handleChange_tourTitle: (state, { payload: { index, id } }) => {
    if (state.data.tourDetails[index]) {
      const updatedTourDetails = [...state.data.tourDetails];
      updatedTourDetails[index] = { ...updatedTourDetails[index], tour_id: id };
      return {
        ...state,
        data: { ...state.data, tourDetails: updatedTourDetails },
      };
    }
    return state; // Return state unchanged if the index is out of bounds
  },
  handleChange_accommodation_type: (state, { payload: { index, id } }) => {
    if (state.data.tourDetails[index]) {
      const updatedTourDetails = [...state.data.tourDetails];

      updatedTourDetails[index] = {
        ...updatedTourDetails[index],
        accommodation_type_id: id,
        accommodation_id: null,
        accommodation_price: 0,
        roomsCategories: [],
      };
      return {
        ...state,
        data: { ...state.data, tourDetails: updatedTourDetails },
      };
    }
    return state; // Return state unchanged if the index is out of bounds
  },

  handleChange_tourguide_checked: (
    state,
    { payload: { index, check, price } }
  ) => {
    if (state.data.tourDetails[index]) {
      const updatedTourDetails = [...state.data.tourDetails];
      updatedTourDetails[index] = {
        ...updatedTourDetails[index],
        tourguide: check,
        tourguide_price: price,
      };
      return {
        ...state,
        data: { ...state.data, tourDetails: updatedTourDetails },
      };
    }
    return state; // Return state unchanged if the index is out of bounds
  },
  handleChange_accomodation: (state, { payload: { index, id } }) => {
    if (state.data.tourDetails[index]) {
      const updatedTourDetails = [...state.data.tourDetails];
      updatedTourDetails[index] = {
        ...updatedTourDetails[index],
        accommodation_id: id,
      };
      return {
        ...state,
        data: { ...state.data, tourDetails: updatedTourDetails },
      };
    }
    return state; // Return state unchanged if the index is out of bounds
  },
  handleChange_number_of_rooms: (state, { payload: { index, number } }) => {
    // Update number_of_rooms in tourDetails at the specified index
    if (state.data.tourDetails[index]) {
      state.data.tourDetails[index].number_of_rooms = parseFloat(number);
      // Generate RoomsType array with length equal to number
      const roomsCategories = Array.from(
        { length: number },
        (_, roomIndex) => ({
          ...RoomsType,
          index: roomIndex + 1,
        })
      );
      // Update roomsCategories in tourDetails at the specified index
      state.data.tourDetails[index].roomsCategories = roomsCategories;
    }

    return state;
  },
  handleChange_roomCategory: (
    state,
    {
      payload: {
        tourDetailIndex,
        roomCategoryIndex,
        roomCategoryId,
        roomPrice,
      },
    }
  ) => {
    // Check if the tourDetailIndex is within bounds
    if (state.data.tourDetails[tourDetailIndex]) {
      // Check if the roomCategoryIndex is within bounds
      if (
        state.data.tourDetails[tourDetailIndex].roomsCategories[
          roomCategoryIndex
        ]
      ) {
        // Update room_category_id and room_price in the specified roomsCategories array
        state.data.tourDetails[tourDetailIndex].roomsCategories[
          roomCategoryIndex
        ].room_category_id = roomCategoryId;
        state.data.tourDetails[tourDetailIndex].roomsCategories[
          roomCategoryIndex
        ].room_price = roomPrice;
      }
    }

    return state;
  },
  handleChange_extrabed_checkbox: (
    state,
    {
      payload: { tourDetailIndex, roomCategoryIndex, extrabed, extrabed_price },
    }
  ) => {
    // Check if the tourDetailIndex is within bounds
    if (state.data.tourDetails[tourDetailIndex]) {
      // Check if the roomCategoryIndex is within bounds
      if (
        state.data.tourDetails[tourDetailIndex].roomsCategories[
          roomCategoryIndex
        ]
      ) {
        // Update room_category_id and room_price in the specified roomsCategories array
        state.data.tourDetails[tourDetailIndex].roomsCategories[
          roomCategoryIndex
        ].extrabed = extrabed;
        state.data.tourDetails[tourDetailIndex].roomsCategories[
          roomCategoryIndex
        ].extrabed_price = extrabed_price;
      }
    }

    return state;
  },
  handleChange_apartment: (state, { payload: { index, id, price } }) => {
    if (state.data.tourDetails[index]) {
      const updatedTourDetails = state.data.tourDetails.map((tourDetail, i) => {
        if (i === index) {
          const accommodationPrice = parseFloat(price); // Set price to 0 if id is 0 or 1
          return {
            ...tourDetail,
            accommodation_id: id,
            accommodation_price: accommodationPrice,
          };
        }
        return tourDetail;
      });

      // Call the calculateTransportationPrice reducer to update the state with the new transportation price
      const nextState = calculateTransportationPrice(state);

      return {
        ...state,
        data: { ...state.data, tourDetails: updatedTourDetails },
      };
    }
    return state; // Return state unchanged if the index is out of bounds
  },
  handleChange_profit_price: (state, { payload }) => {
    return {
      ...state,
      data: { ...state.data, profit_price: parseFloat(payload) },
    };
  },
  calculateHotelPrice: (state, { payload: { tourDetailIndex } }) => {
    // Get the current tour details
    const { tourDetails } = state.data;

    // Check if the specified tourDetailIndex is within bounds
    if (tourDetails[tourDetailIndex]) {
      // Get the tour detail at the specified index
      const tourDetail = tourDetails[tourDetailIndex];

      // Calculate total room price for the specified tour detail
      const totalRoomPrice = tourDetail.roomsCategories.reduce(
        (roomTotal, roomCategory) => {
          // Add room price
          let roomPrice = roomCategory.room_price;
          // Add extrabed price if extrabed is selected
          if (roomCategory.extrabed) {
            roomPrice += roomCategory.extrabed_price;
          }
          return roomTotal + roomPrice;
        },
        0
      );

      // Update the specified tour detail's accommodation price with the calculated total room price
      const updatedTourDetails = [...tourDetails];
      updatedTourDetails[tourDetailIndex] = {
        ...tourDetail,
        accommodation_price: totalRoomPrice,
      };

      // Update state with the updated tour details
      return {
        ...state,
        data: {
          ...state.data,
          tourDetails: updatedTourDetails,
        },
      };
    }

    return state; // Return state unchanged if the index is out of bounds
  },

  calculateTransportationPrice: (state) => {
    // Calculate total transportation price
    const transportationPrice =
      state.data.transportation_Type_price * state.data.number_of_days;

    // Update state with the calculated total transportation price
    return {
      ...state,
      data: {
        ...state.data,
        transportation_price: transportationPrice,
      },
    };
  },
  calculateAccommodationsPrice: (state) => {
    // Calculate total hotels price by summing up accommodation prices in tourDetails
    const totalHotelsPrice = state.data.tourDetails.reduce((total, detail) => {
      return total + detail.accommodation_price;
    }, 0);

    // Update state with the calculated total hotels price
    return {
      ...state,
      data: {
        ...state.data,
        hotels_price: totalHotelsPrice,
      },
    };
  },
  calculateTourguidePrice: (state) => {
    // Calculate total tourguide price by summing up tourguide prices in tourDetails
    const totalTourguidePrice = state.data.tourDetails.reduce(
      (total, detail) => {
        return total + detail.tourguide_price;
      },
      0
    );

    // Update state with the calculated total tourguide price
    return {
      ...state,
      data: {
        ...state.data,
        tourguide_price: totalTourguidePrice,
      },
    };
  },
  calculateTotalPrice: (state) => {
    // Calculate total price
    const totalPrice =
      state.data.tourguide_price +
      state.data.transportation_price +
      state.data.hotels_price +
      state.data.profit_price;

    // Update state with the calculated total price
    return {
      ...state,
      data: {
        ...state.data,
        total_price: totalPrice,
      },
    };
  },

  Get_tour_headers: (state, { payload }) => {
    return { ...state, TourHeaders: payload };
  },
  resetState: (state) => initialState,
};

const TourSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const {
  set_edit,
  set_country_id,
  handleChange_website_share,
  handleChange_tour_name,
  handleChange_transportation_id,
  handleChange_from_date,
  Get_tour_headers,
  handleChange_inc,
  handleChange_dec,
  handleChange_City,
  handleChange_tourTitle,
  handleChange_accommodation_type,
  handleChange_tourguide_checked,
  handleChange_accomodation,
  handleChange_number_of_rooms,
  handleChange_roomCategory,
  handleChange_extrabed_checkbox,
  handleChange_apartment,
  handleChange_profit_price,
  calculateTransportationPrice,
  calculateTourguidePrice,
  calculateAccommodationsPrice,
  calculateTotalPrice,
  calculateHotelPrice,
  resetState,
} = TourSlice.actions;
export default TourSlice.reducer;

// validation.js

// Validation function for checking if a value is required
const required = (value, fieldName) => {
  if (value === undefined || value === null || value === "") {
    throw new Error(`${fieldName} is required`);
  }
};

// Validation function for checking if a value is a non-empty string
const nonEmptyString = (value, fieldName) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
};

// Validation function for checking if a value is a number
const isNumber = (value, fieldName) => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error(`${fieldName} must be a number`);
  }
};

// Validation function for checking if a value is an array
const isArray = (value, fieldName) => {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
};

// Validation function for validating tourDetails
const validateTourDetails = (tourDetails) => {
  isArray(tourDetails, "tourDetails");
  if (!tourDetails.every(validateTourDetail)) {
    throw new Error("Invalid tour details");
  }
};

// Validation function for validating a single tour detail
const validateTourDetail = (tourDetail) => {
  const {
    date,
    tour_id,
    accommodation_type_id,
    number_of_rooms,
    roomsCategories,
  } = tourDetail;

  required(date, "date");
  isNumber(tour_id, "tour_id");
  if (
    accommodation_type_id !== 0 &&
    !isNumber(accommodation_type_id, "accommodation_type_id")
  ) {
    throw new Error("Invalid accommodation type id");
  }
  if (number_of_rooms !== undefined) {
    isNumber(number_of_rooms, "number_of_rooms");
  } else if (accommodation_type_id === 1) {
    throw new Error("Number of rooms is required");
  }
  if (roomsCategories !== undefined) {
    isArray(roomsCategories, "roomsCategories");
    if (!roomsCategories.every(validateRoomCategory)) {
      throw new Error("Invalid room categories");
    }
  } else if (accommodation_type_id === 1) {
    throw new Error("Rooms categories are required");
  }

  return true;
};

// Validation function for validating a single room category
const validateRoomCategory = (roomCategory) => {
  const { room_category_id, extrabed } = roomCategory;

  isNumber(room_category_id, "room_category_id");
  if (typeof extrabed !== "boolean") {
    throw new Error("Invalid extrabed value");
  }

  return true;
};

// Validation function for validating the top-level data object
const validateData = (data) => {
  const {
    user_id,
    country_id,
    website_share,
    tour_name,
    tour_title,
    transportation_id,
    from,
    till,
    number_of_days,
    tourDetails,
    tourguide_price,
    transportation_price,
    hotels_price,
    profit_price,
    total_price,
  } = data;

  try {
    required(user_id, "user_id");
    required(country_id, "country_id");
    required(website_share, "website_share");
    nonEmptyString(tour_name, "tour_name");
    isNumber(tour_title, "tour_title");
    required(transportation_id, "transportation_id");
    required(from, "from");
    required(till, "till");
    required(number_of_days, "number_of_days");
    validateTourDetails(tourDetails);
    isNumber(tourguide_price, "tourguide_price");
    isNumber(transportation_price, "transportation_price");
    isNumber(hotels_price, "hotels_price");
    isNumber(profit_price, "profit_price");
    isNumber(total_price, "total_price");

    return true;
  } catch (error) {
    showToast(error.message);
    return false;
  }
};

const showToast = (message) => {
  console.log(message);
};

export { validateData };

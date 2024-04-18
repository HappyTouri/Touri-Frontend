import { toast } from "react-toastify";

// Validation function for checking if a value is required
const required = (value, fieldName) => {
  if (value === undefined || value === null || value === "" || value === 0) {
    throw new Error(`${fieldName} is required`);
  }
};

// Validation function for checking if a value is a non-empty string
const nonEmptyString = (value, fieldName) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} must be a non-empty`);
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
    accommodation_id,
    number_of_rooms,
    roomsCategories,
  } = tourDetail;

  required(date, "date");
  required(tour_id, "Chouse The Tour");
  if (accommodation_type_id !== 0 && accommodation_type_id) {
    required(accommodation_id, "accommodation_id");

    if (accommodation_type_id === 1) {
      required(number_of_rooms, "number_of_rooms");
      if (!roomsCategories.every(validateRoomCategory)) {
        throw new Error("Invalid room categories");
      }
    }
  }

  return true;
};

// Validation function for validating a single room category
const validateRoomCategory = (roomCategory) => {
  const { room_category_id } = roomCategory;

  required(room_category_id, "room_category_id");

  return true;
};

// Validation function for validating the top-level data object
const validateData = (data) => {
  const {
    operator_id,
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
    required(operator_id, "operator_id");
    required(country_id, "country_id");
    // required(website_share, "website_share");
    nonEmptyString(tour_name, "Tour Name");
    // isNumber(tour_title, "tour_title");
    required(transportation_id, "Transportation Type");
    required(from, "from");
    required(till, "till");
    required(number_of_days, "Number Of Days");
    validateTourDetails(tourDetails);
    isNumber(tourguide_price, "tourguide_price");
    isNumber(transportation_price, "transportation_price");
    isNumber(hotels_price, "hotels_price");
    required(profit_price, "profit_price");
    isNumber(total_price, "total_price");

    return true;
  } catch (error) {
    showToast(error.message);
    return false;
  }
};

const showToast = (message) => {
  toast.error(message);
};

export { validateData };

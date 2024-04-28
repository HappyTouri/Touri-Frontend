import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async (country_id) => {
  const res = await axiosTouri.get(`accommodation-by-country/${country_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`accommodations`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
};

// share Item API
export const share = async (data) => {
  console.log(data.share);
  const res = await axiosTouri.post(`share-accommodations/${data.id}`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Accommodation Photos API
export const createAccommodationPhotos = async (data) => {
  const res = await axiosTouri.post(`accommodation_photos`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
};

// show single Accommodation
export const getSingleItem = async (tour_id) => {
  const res = await axiosTouri.get(`accommodations/${tour_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  const res = await axiosTouri.post(
    `edit-accommodations/${data.id}`,
    data.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`accommodations/${id}`);
  if (res.data.success) {
    console.log(res);
    return res.data.data;
  }
};

// Delete Accommodation Photo API
export const deleteAccommodationPhoto = async (id) => {
  const res = await axiosTouri.delete(`accommodation_photos/${id}`);
  if (res.data.success) {
    console.log(res);
    return res.data.data;
  }
};

// Create Hotel Room Categories
export const createHotelRoomCategories = async (data) => {
  const res = await axiosTouri.post(`hotel_room_categories`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Add hotel Prices (Add and delete and update)
export const addHotelPrices = async (data) => {
  const res = await axiosTouri.post(`hotel_prices`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Add Apartment Prices (Add and delete and update)
export const addApartmentPrices = async (data) => {
  const res = await axiosTouri.post(`apartment_season_prices`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

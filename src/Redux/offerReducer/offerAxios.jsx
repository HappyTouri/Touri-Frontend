import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async (country_id) => {
  const res = await axiosTouri.get(`all-offers/${country_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`offers`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// show single Offer
export const getSingleItem = async (offer_id) => {
  const res = await axiosTouri.get(`offers/${offer_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  const res = await axiosTouri.put(`offers/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const reserve = async (data) => {
  const res = await axiosTouri.put(`reserve/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`offers/${id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store passport Photos API
export const createPassportPhotos = async (data) => {
  const res = await axiosTouri.post(`passport_photos`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete passport Photo API
export const deletePassportPhoto = async (id) => {
  const res = await axiosTouri.delete(`passport_photos/${id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store airticket Photos API
export const createAirticketPhotos = async (data) => {
  const res = await axiosTouri.post(`air_ticket_photos`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete airticket Photo API
export const deleteAirticketPhoto = async (id) => {
  const res = await axiosTouri.delete(`air_ticket_photos/${id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

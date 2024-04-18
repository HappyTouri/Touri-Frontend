import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async (country_id) => {
  const res = await axiosTouri.get(`tours-by-country/${country_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`tours`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Photos API
export const createPhotos = async (data) => {
  const res = await axiosTouri.post(`tour_photos`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
};

export const getSingleItem = async (tour_id) => {
  const res = await axiosTouri.get(`tours/${tour_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  const res = await axiosTouri.put(`tours/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`tours/${id}`);
  if (res.data.success) {
    console.log(res);
    return res.data.data;
  }
};

// Delete Photo API
export const deletePhoto = async (id) => {
  const res = await axiosTouri.delete(`tour_photos/${id}`);
  if (res.data.success) {
    console.log(res);
    return res.data.data;
  }
};

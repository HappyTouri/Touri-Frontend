import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async (country_id) => {
  const res = await axiosTouri.get(`cities-by-country/${country_id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`cities`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  const res = await axiosTouri.put(`cities/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`cities/${id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async () => {
  const res = await axiosTouri.get(`accommodation_types`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`accommodation_types`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  const res = await axiosTouri.put(`accommodation_types/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`accommodation_types/${id}`);
  if (res.data.success) {
    return res.data.data;
  }
};

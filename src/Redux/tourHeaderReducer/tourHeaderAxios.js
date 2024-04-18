import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async () => {
  const res = await axiosTouri.get(`tour-headers`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`tour-headers`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  console.log(data);
  const res = await axiosTouri.put(`tour-headers/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`tour-headers/${id}`);
  if (res.data.success) {
    console.log(res);
    return res.data.data;
  }
};

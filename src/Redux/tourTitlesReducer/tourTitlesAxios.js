import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async () => {
  const res = await axiosTouri.get(`tour_titles`);
  if (res.data.success) {
    return res.data.data;
  }
};

// Store Item API
export const createItem = async (data) => {
  const res = await axiosTouri.post(`tour_titles`, data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Update Item API
export const updateItem = async (data) => {
  const res = await axiosTouri.put(`tour_titles/${data.id}`, data.data);
  if (res.data.success) {
    return res.data.data;
  }
};

// Delete Item API
export const deleteItem = async (id) => {
  const res = await axiosTouri.delete(`tour_titles/${id}`);
  if (res.data.success) {
    console.log(res);
    return res.data.data;
  }
};

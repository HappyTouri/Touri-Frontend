import axiosTouri from "../../axiosTouri";

// Get All Items
export const getAllItems = async () => {
  const res = await axiosTouri.get(`tour_statuses`);

  if (res.data.success) {
    return res.data.data;
  }
};

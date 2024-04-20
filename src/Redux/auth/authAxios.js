import axiosTouri from "../../axiosTouri";

// Get All Items

export const signIn = async (data) => {
    const res = await axiosTouri.post(`auth/login`, data);
    if (res.data) {
      return res.data;
    }
  };

  export const userLoaded = async (data) => {
    const res = await axiosTouri.get(`auth/user-loaded`);
    if (res.data) {
      return res.data;
    }
  };

  export const signOut = async () => {
    const res = await axiosTouri.post(`auth/logout`);
    if (res.data.success) {
      return res.data;
    }
  };


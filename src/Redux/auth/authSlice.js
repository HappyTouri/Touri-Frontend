import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import { signIn, signOut, userLoaded } from "./authAxios";

// Get All Items From AXIOS API
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return signIn(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//userloaded

export const userLoad = createAsyncThunk(
  "auth/user-loaded",
  async (thunkAPI) => {
    try {
      return userLoaded();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//logou
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return signOut();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Update Item from AXIOS API

const initialState = {
  isLoading: false,
  isAuth: false,
  isError: false,
  message: "",
  userLoaded: true,
  user: {},
  token: localStorage.getItem("token") || null,
  role: null,
};

// Country Slice .............
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload?.token);
        state.isLoading = false;
        state.isAuth = true;
        state.isError = false;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.error;
      })

      //   userloaded
      .addCase(userLoad.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLoad.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isError = false;
        state.userLoaded = true;
        state.user = action.payload?.user;
        state.role = action.payload?.role;
      })
      .addCase(userLoad.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.userLoaded = false;
        state.isError = true;
        state.message = action.error;
      })

      //logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.isLoading = false;
        state.isAuth = false;
        state.isError = false;
        state.token = null;
        state.userLoaded = false;
        state.user = {};
        state.role = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

// export const resetStateCity = createAction("auth/Reset_all");
export default authSlice.reducer;

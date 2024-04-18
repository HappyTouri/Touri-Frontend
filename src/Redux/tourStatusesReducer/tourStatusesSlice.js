import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllItems } from "./tourStatusesAxios";

// Get All Items From AXIOS API
export const GetALLTourStatuses = createAsyncThunk(
  "tourStatuses/get-all",
  async (thunkAPI) => {
    try {
      return getAllItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  item: "",
  show: false,
};

// Country Slice .............
export const tourStatusesSlice = createSlice({
  name: "tourStatus",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get all Status
      .addCase(GetALLTourStatuses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetALLTourStatuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(GetALLTourStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Loading Faild");
      })

      .addCase(resetStateTourStatuses, () => initialState);
  },
});

export const resetStateTourStatuses = createAction("Reset_all");
export default tourStatusesSlice.reducer;

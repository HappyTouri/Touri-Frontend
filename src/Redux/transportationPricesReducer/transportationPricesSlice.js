import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "./transportationPricesAxios";

// Get All Items From AXIOS API
export const GetALLItems = createAsyncThunk(
  "transportationPrices/get-all",
  async (country_id, thunkAPI) => {
    try {
      return getAllItems(country_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Item from AXIOS API
export const CreateItem = createAsyncThunk(
  "transportationPrices/create",
  async (data, thunkAPI) => {
    try {
      return createItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Item from AXIOS API
export const UpdateItem = createAsyncThunk(
  "transportationPrices/update",
  async (data, thunkAPI) => {
    try {
      return updateItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Item from AXIOS API
export const DeleteItem = createAsyncThunk(
  "transportationPrices/delete",
  async (id, thunkAPI) => {
    try {
      return deleteItem(id);
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
  item: {},
};

// Country Slice .............
export const TransportationPricesSlice = createSlice({
  name: "transportationPrice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get all Status
      .addCase(GetALLItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetALLItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(GetALLItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Loading Faild");
      })

      // Store Status
      .addCase(CreateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.created = !state.created;
        if (state.isSuccess) {
          toast.success("Added Successfully");
        }
      })
      .addCase(CreateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Created Failed");
        }
      })

      // Update Status
      .addCase(UpdateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updated = !state.updated;
        if (state.isSuccess) {
          toast.success("Updated Successfully");
        }
      })
      .addCase(UpdateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Updated Failed");
        }
      })

      // Deleted Item Status
      .addCase(DeleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleted = !state.deleted;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(DeleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })
      .addCase(resetStatetransportationPrice, () => initialState);
  },
});

export const resetStatetransportationPrice = createAction("Reset_all");
export default TransportationPricesSlice.reducer;

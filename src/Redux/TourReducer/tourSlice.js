import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllItems,
  createItem,
  createPhotos,
  updateItem,
  deleteItem,
  getSingleItem,
  deletePhoto,
} from "./tourAxios";

// Get All Items From AXIOS API
export const GetALLToursItems = createAsyncThunk(
  "tour/get-all",
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
  "tour/create",
  async (data, thunkAPI) => {
    try {
      return createItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Item Photos AXIOS API
export const CreatePhotos = createAsyncThunk(
  "tour/create-photo",
  async (data, thunkAPI) => {
    try {
      return createPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingle = createAsyncThunk(
  "tour/get-one",
  async (tour_id, thunkAPI) => {
    try {
      return getSingleItem(tour_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Update Item from AXIOS API
export const UpdateItem = createAsyncThunk(
  "tour/update",
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
  "tour/delete",
  async (id, thunkAPI) => {
    try {
      return deleteItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete photo  from AXIOS API
export const DeletePhoto = createAsyncThunk(
  "tour/deletephoto",
  async (id, thunkAPI) => {
    try {
      return deletePhoto(id);
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

// Tour Slice .............
export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get all Status
      .addCase(GetALLToursItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetALLToursItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(GetALLToursItems.rejected, (state, action) => {
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

      //single

      .addCase(getSingle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.item = action.payload;
      })
      .addCase(getSingle.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Loading Faild");
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

      // Add Photo Status
      .addCase(CreatePhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreatePhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPhoto = !state.createdPhoto;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(CreatePhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      // Deleted Photo Status
      .addCase(DeletePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeletePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPhoto = !state.deletedPhoto;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(DeletePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export const resetState = createAction("Reset_all");
export default tourSlice.reducer;

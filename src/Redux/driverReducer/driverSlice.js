import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  deleteCarPhoto,
  deletePhoto,
  createCarPhotos,
  createPhotos,
  getSingleItem,
} from "./driverAxios";

/// Get All Items From AXIOS API
export const GetALLItems = createAsyncThunk(
  "driver/get-all",
  async (driver_id, thunkAPI) => {
    try {
      return getAllItems(driver_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Item from AXIOS API
export const CreateItem = createAsyncThunk(
  "driver/create",
  async (data, thunkAPI) => {
    try {
      return createItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Item Photos AXIOS API
export const CreateDriverPhoto = createAsyncThunk(
  "driver/create-photo",
  async (data, thunkAPI) => {
    try {
      return createPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Create Item Photos AXIOS API
export const CreateCarPhotos = createAsyncThunk(
  "driver/create-car-photo",
  async (data, thunkAPI) => {
    try {
      return createCarPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingle = createAsyncThunk(
  "driver/get-one",
  async (driver_id, thunkAPI) => {
    try {
      return getSingleItem(driver_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Update Item from AXIOS API
export const UpdateItem = createAsyncThunk(
  "driver/update",
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
  "driver/delete",
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
  "driver/deletephoto",
  async (id, thunkAPI) => {
    try {
      return deletePhoto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const DeleteCarPhoto = createAsyncThunk(
  "driver/deletecarphoto",
  async (id, thunkAPI) => {
    try {
      return deleteCarPhoto(id);
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
  show: false,
};

// Country Slice .............
export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setItem: (state, { payload }) => {
      state.item = payload;
    },
  },

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
      .addCase(CreateDriverPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateDriverPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPhoto = !state.createdPhoto;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(CreateDriverPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      // Add Car Photo Status
      .addCase(CreateCarPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateCarPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPhoto = !state.createdPhoto;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(CreateCarPhotos.rejected, (state, action) => {
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

      //car photo

      .addCase(DeleteCarPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteCarPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPhoto = !state.deletedPhoto;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(DeleteCarPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })
      .addCase(resetStateDriver, () => initialState);
  },
});

export const resetStateDriver = createAction("Reset_all");
export default driverSlice.reducer;
export const { setItem } = driverSlice.actions;

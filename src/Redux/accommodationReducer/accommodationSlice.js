import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllItems,
  createItem,
  createAccommodationPhotos,
  getSingleItem,
  updateItem,
  deleteItem,
  share,
  deleteAccommodationPhoto,
  createHotelRoomCategories,
  addHotelPrices,
  addApartmentPrices,
} from "./accommodationAxios";

// Get All Items From AXIOS API
export const GetALLItems = createAsyncThunk(
  "accommodations/get-all",
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
  "accommodations/create",
  async (data, thunkAPI) => {
    try {
      return createItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Hotel Room Categories
export const CreateHotelRoomCategories = createAsyncThunk(
  "HotelRoomCategories/create",
  async (data, thunkAPI) => {
    try {
      return createHotelRoomCategories(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Hotel Room Categories
export const AddHotelPrices = createAsyncThunk(
  "Hotel_Prices/create",
  async (data, thunkAPI) => {
    try {
      return addHotelPrices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Create Hotel Room Categories
export const AddApartmentPrices = createAsyncThunk(
  "Apartment_Prices/create",
  async (data, thunkAPI) => {
    try {
      return addApartmentPrices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Item Photos AXIOS API
export const CreateAccommodationPhotos = createAsyncThunk(
  "accommodations/create-photo",
  async (data, thunkAPI) => {
    try {
      return createAccommodationPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// // Create Item Photos AXIOS API
// export const CreateCarPhotos = createAsyncThunk(
//   "accommodations/create-car-photo",
//   async (data, thunkAPI) => {
//     try {
//       return createCarPhotos(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// Get Single Accomodation
export const GetSingleAccommodation = createAsyncThunk(
  "accommodations/get-one",
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
  "accommodations/update",
  async (data, thunkAPI) => {
    try {
      return updateItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update share Item from AXIOS API
export const Share = createAsyncThunk(
  "share/update",
  async (data, thunkAPI) => {
    try {
      return share(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Item from AXIOS API
export const DeleteItem = createAsyncThunk(
  "accommodations/delete",
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
  "accommodations/deletephoto",
  async (id, thunkAPI) => {
    try {
      return deleteAccommodationPhoto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const DeleteCarPhoto = createAsyncThunk(
//   "accommodations/deletecarphoto",
//   async (id, thunkAPI) => {
//     try {
//       return deleteCarPhoto(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
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
export const accommodationSlice = createSlice({
  name: "accommodations",
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

      // Create Hotel Room Categories
      .addCase(CreateHotelRoomCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateHotelRoomCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.data = action.payload;
        toast.success("Added Successfully");
      })
      .addCase(CreateHotelRoomCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Loading Faild");
      })

      //Get single Accommodation
      .addCase(GetSingleAccommodation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSingleAccommodation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.item = action.payload;
      })
      .addCase(GetSingleAccommodation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Loading Faild");
      })

      // Add Hotel Prices
      .addCase(AddHotelPrices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddHotelPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.data = action.payload;
        toast.success("Added Successfully");
      })
      .addCase(AddHotelPrices.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Loading Faild");
      })

      // Add Apartment Prices
      .addCase(AddApartmentPrices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddApartmentPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.data = action.payload;
        toast.success("Added Successfully");
      })
      .addCase(AddApartmentPrices.rejected, (state, action) => {
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

      // share Status
      .addCase(Share.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(Share.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.updated = !state.updated;
        if (state.isSuccess) {
          toast.success("Updated Successfully");
        }
      })
      .addCase(Share.rejected, (state, action) => {
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
      .addCase(CreateAccommodationPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateAccommodationPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPhoto = !state.createdPhoto;
        if (state.isSuccess) {
          toast.success("Deleted Successfully");
        }
      })
      .addCase(CreateAccommodationPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      //   // Add Car Photo Status
      //   .addCase(CreateCarPhotos.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(CreateCarPhotos.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = true;
      //     state.isError = false;
      //     state.createdPhoto = !state.createdPhoto;
      //     if (state.isSuccess) {
      //       toast.success("Deleted Successfully");
      //     }
      //   })
      //   .addCase(CreateCarPhotos.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = false;
      //     state.isError = true;
      //     state.message = action.error;
      //     if (state.isError) {
      //       toast.error("Deleted Failed");
      //     }
      //   })

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

      //   //car photo

      //   .addCase(DeleteCarPhoto.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(DeleteCarPhoto.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = true;
      //     state.isError = false;
      //     state.deletedPhoto = !state.deletedPhoto;
      //     if (state.isSuccess) {
      //       toast.success("Deleted Successfully");
      //     }
      //   })
      //   .addCase(DeleteCarPhoto.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = false;
      //     state.isError = true;
      //     state.message = action.error;
      //     if (state.isError) {
      //       toast.error("Deleted Failed");
      //     }
      //   })
      .addCase(resetStateAccommodation, () => initialState);
  },
});

export const resetStateAccommodation = createAction("Reset_all");
export default accommodationSlice.reducer;
export const { setItem } = accommodationSlice.actions;

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllItems,
  createItem,
  updateItem,
  getSingleItem,
  deleteItem,
  reserve,
  createPassportPhotos,
  deletePassportPhoto,
  createAirticketPhotos,
  deleteAirticketPhoto,
  createConfirmationPhotos,
  deleteConfirmationPhoto,
  createInvoicePhotos,
  deleteInvoicePhoto,
  createPaymentPhotos,
  deletePaymentPhoto,
} from "./offerAxios";

// Get All Items From AXIOS API
export const GetALLOffers = createAsyncThunk(
  "offer/get-all",
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
  "offer/create",
  async (data, thunkAPI) => {
    try {
      return createItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Single Accomodation
export const GetSingleOffer = createAsyncThunk(
  "offer/get-one",
  async (offer_id, thunkAPI) => {
    try {
      return getSingleItem(offer_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Item from AXIOS API
export const UpdateItem = createAsyncThunk(
  "offer/update",
  async (data, thunkAPI) => {
    try {
      return updateItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// reserve Item from AXIOS API
export const Reserve = createAsyncThunk(
  "offer/reserve",
  async (data, thunkAPI) => {
    try {
      return reserve(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create passport Photos AXIOS API
export const CreatePassportPhotos = createAsyncThunk(
  "passport/create-photo",
  async (data, thunkAPI) => {
    try {
      return createPassportPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete passport from AXIOS API
export const DeletePassportPhoto = createAsyncThunk(
  "passport/delete",
  async (id, thunkAPI) => {
    try {
      return deletePassportPhoto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Airtickets Photos AXIOS API
export const CreateAirticketPhotos = createAsyncThunk(
  "airticket/create-photo",
  async (data, thunkAPI) => {
    try {
      return createAirticketPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete airticket from AXIOS API
export const DeleteAirticketPhoto = createAsyncThunk(
  "airticket/delete",
  async (id, thunkAPI) => {
    try {
      return deleteAirticketPhoto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete item photo from AXIOS API
export const DeleteItem = createAsyncThunk(
  "offer/delete",
  async (id, thunkAPI) => {
    try {
      return deleteItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Confirmation Photos AXIOS API
export const CreateConfirmationPhotos = createAsyncThunk(
  "confirmation/create-photo",
  async (data, thunkAPI) => {
    try {
      return createConfirmationPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Confirmation from AXIOS API
export const DeleteConfirmationPhoto = createAsyncThunk(
  "confirmation/delete",
  async (id, thunkAPI) => {
    try {
      return deleteConfirmationPhoto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Invoice Photos AXIOS API
export const CreateInvoicePhotos = createAsyncThunk(
  "invoice/create-photo",
  async (data, thunkAPI) => {
    try {
      return createInvoicePhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Invoice from AXIOS API
export const DeleteInvoicePhoto = createAsyncThunk(
  "invoice/delete",
  async (id, thunkAPI) => {
    try {
      return deleteInvoicePhoto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Payment Photos AXIOS API
export const CreatePaymentPhotos = createAsyncThunk(
  "payment/create-photo",
  async (data, thunkAPI) => {
    try {
      return createPaymentPhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Payment from AXIOS API
export const DeletePaymentPhoto = createAsyncThunk(
  "payment/delete",
  async (id, thunkAPI) => {
    try {
      return deletePaymentPhoto(id);
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
  item: false,
  show: false,
};

// Country Slice .............
export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setItem: (state, { payload }) => {
      state.item = payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // Get all Status
      .addCase(GetALLOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetALLOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(GetALLOffers.rejected, (state, action) => {
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

      // Store Passports photos Status
      .addCase(CreatePassportPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreatePassportPhotos.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.created = !state.created;
        if (state.isSuccess) {
          toast.success("Added Successfully");
        }
      })
      .addCase(CreatePassportPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Created Failed");
        }
      })

      // Store Airtickets Status
      .addCase(CreateAirticketPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateAirticketPhotos.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.created = !state.created;
        if (state.isSuccess) {
          toast.success("Added Successfully");
        }
      })
      .addCase(CreateAirticketPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Created Failed");
        }
      })

      //Get single offer
      .addCase(GetSingleOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSingleOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.item = action.payload;
      })
      .addCase(GetSingleOffer.rejected, (state, action) => {
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

      // reserve Status
      .addCase(Reserve.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Reserve.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updated = !state.updated;
        if (state.isSuccess) {
          toast.success("Reserved Successfully");
        }
      })
      .addCase(Reserve.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Reserved Failed");
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
          toast.success("Deleted 1 Successfully");
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

      // Deleted passport Status
      .addCase(DeletePassportPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeletePassportPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleted = !state.deleted;
        if (state.isSuccess) {
          toast.success("Deleted 1 Successfully");
        }
      })
      .addCase(DeletePassportPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      // Deleted airticket Status
      .addCase(DeleteAirticketPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteAirticketPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleted = !state.deleted;
        if (state.isSuccess) {
          toast.success("Deleted 1 Successfully");
        }
      })
      .addCase(DeleteAirticketPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      // Store Confirmation Status
      .addCase(CreateConfirmationPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateConfirmationPhotos.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.created = !state.created;
        if (state.isSuccess) {
          toast.success("Added Successfully");
        }
      })
      .addCase(CreateConfirmationPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Created Failed");
        }
      })

      // Deleted Confirmation Status
      .addCase(DeleteConfirmationPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteConfirmationPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleted = !state.deleted;
        if (state.isSuccess) {
          toast.success("Deleted 1 Successfully");
        }
      })
      .addCase(DeleteConfirmationPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      // Store invoice Status
      .addCase(CreateInvoicePhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateInvoicePhotos.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.created = !state.created;
        if (state.isSuccess) {
          toast.success("Added Successfully");
        }
      })
      .addCase(CreateInvoicePhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Created Failed");
        }
      })

      // Deleted invoice Status
      .addCase(DeleteInvoicePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteInvoicePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleted = !state.deleted;
        if (state.isSuccess) {
          toast.success("Deleted 1 Successfully");
        }
      })
      .addCase(DeleteInvoicePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      // Store Payment Status
      .addCase(CreatePaymentPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreatePaymentPhotos.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.created = !state.created;
        if (state.isSuccess) {
          toast.success("Added Successfully");
        }
      })
      .addCase(CreatePaymentPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Created Failed");
        }
      })

      // Deleted Payment Status
      .addCase(DeletePaymentPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeletePaymentPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleted = !state.deleted;
        if (state.isSuccess) {
          toast.success("Deleted 1 Successfully");
        }
      })
      .addCase(DeletePaymentPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error("Deleted Failed");
        }
      })

      .addCase(resetStateOffer, () => initialState);
  },
});

export const resetStateOffer = createAction("Reset_all");
export default offerSlice.reducer;
export const { setItem } = offerSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";

const initialState = {
  all_hotels: [],
  all_available_hotels: [],
  booking_history: [],
  errors: [],
  loading: false,
};

// View all hotels
export const view_all_hotels = createAsyncThunk(
  "hotel/view_all_hotels",
  async (_, thunkAPI) => {
    try {
      return await hotelService.view_all_hotels();
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// View available hotels on particular date
export const view_available_hotels = createAsyncThunk(
  "hotel/view_available_hotels",
  async (searchDate, thunkAPI) => {
    try {
      return await hotelService.view_available_hotels(searchDate);
    } catch (error) {
      console.error("Error occured-----------------------------", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// View booking history
export const view_booking_history = createAsyncThunk(
  "hotel/view_booking_history",
  async (_, thunkAPI) => {
    try {
      return await hotelService.view_booking_history();
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Book hotel
export const book_hotel = createAsyncThunk(
  "hotel/book_hotel",
  async ({ hotelId, bookingDate }, thunkAPI) => {
    try {
      return await hotelService.book_hotel({ hotelId, bookingDate });
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Cancel booking
export const cancel_booking = createAsyncThunk(
  "hotel/cancel_booking",
  async (bookingId, thunkAPI) => {
    try {
      return await hotelService.cancel_booking(bookingId);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(view_all_hotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(view_all_hotels.fulfilled, (state, action) => {
        state.loading = false;
        state.all_hotels = action.payload;
        state.errors = [];
      })
      .addCase(view_all_hotels.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(view_available_hotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(view_available_hotels.fulfilled, (state, action) => {
        state.loading = false;
        state.all_available_hotels = action.payload;
        state.errors = [];
      })
      .addCase(view_available_hotels.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(view_booking_history.pending, (state) => {
        state.loading = true;
      })
      .addCase(view_booking_history.fulfilled, (state, action) => {
        state.loading = false;
        state.booking_history = action.payload;
        state.errors = [];
      })
      .addCase(view_booking_history.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(book_hotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(book_hotel.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = [];
      })
      .addCase(book_hotel.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(cancel_booking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancel_booking.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = [];
      })
      .addCase(cancel_booking.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

const { reducer } = hotelSlice;

export default reducer;

import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countryReducer/countrySlice";
import cityReducer from "./cityReducer/citySlice";
import transportationReducer from "./transportationTypesReducer/transportationTypesSlice";
import tourTitlesReduser from "./tourTitlesReducer/tourTitlesSlice";
import roomCategoriesReducer from "./roomCategoryReducer/roomCategorySlice";
import transportationPricesReducer from "./transportationPricesReducer/transportationPricesSlice";
import tourReducer from "./TourReducer/tourSlice";
import driverReducer from "./driverReducer/driverSlice";
import accommodationTypesReduser from "./accommodationTypesReducer/accommodationTypesSlice";
import accommodationReducer from "./accommodationReducer/accommodationSlice";
import tourStatusesReducer from "./tourStatusesReducer/tourStatusesSlice";
import tourguidePricesReducer from "./tourguidePricesReducer/tourguidePricesSlice";
import tourHeaderReducer from "./tourHeaderReducer/tourHeaderSlice";
import offerReducer from "./offerReducer/offerSlice";
import TourReducer from "../components/Offers&Reservations/TourSlice";
import UsersReducer from "./UsersReducer/UsersSlice";

const store = configureStore({
  reducer: {
    country: countryReducer,
    city: cityReducer,
    transportationTypes: transportationReducer,
    tourTitles: tourTitlesReduser,
    roomCategory: roomCategoriesReducer,
    transportationPrice: transportationPricesReducer,
    tour: tourReducer,
    driver: driverReducer,
    accommodationTypes: accommodationTypesReduser,
    accommodations: accommodationReducer,
    tourStatus: tourStatusesReducer,
    tourguidePrices: tourguidePricesReducer,
    tourHeader: tourHeaderReducer,
    offer: offerReducer,
    c_tour: TourReducer,
    user: UsersReducer,
  },
});
export default store;

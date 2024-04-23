import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import Loader from "./layouts/Loader/Loader";
import Auth from "./Authentication/auth";
import { Provider } from "react-redux";
import store from "./Redux/store";
// import ErrorBoundary from "./components/ErrorBoundary";
// import HotelPriceList from "./components/Accommodations/HotelPriceList";

// Dashboard
// const Landingpageapp = React.lazy(() => import("./components/Landingpageapp"));
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const App = React.lazy(() => import("./components/app"));

// Error Page
const Error404 = React.lazy(() =>
  import("./components/Custompages/Error1-404/Error-404")
);
// Tour Details

//Offers & Reservations
const CreateTour = React.lazy(() =>
  import("./components/Offers&Reservations/CreateTour")
);
const WebsiteOffers = React.lazy(() =>
  import("./components/Offers&Reservations/WebsiteOfers/WebsiteOffers")
);
const HotelReservation = React.lazy(() =>
  import("./components/Offers&Reservations/HotelReservation")
);
const CreateReservation = React.lazy(() =>
  import("./components/Offers&Reservations/Reservation/CreateReservation")
);
const AllPackages = React.lazy(() =>
  import("./components/Offers&Reservations/TourPackages/AllPackages")
);
const AllReservedTours = React.lazy(() =>
  import("./components/Offers&Reservations/ReservedTours/AllReservedTours")
);
const TourDetails = React.lazy(() =>
  import("./components/TourDetails/TourDetails")
);
//Tours
const AllTours = React.lazy(() => import("./components/Tours/AllTours"));
const AddTour = React.lazy(() => import("./components/Tours/AddTour"));
const SingleTour = React.lazy(() => import("./components/Tours/SingleTour"));
const EditTour = React.lazy(() => import("./components/Tours/EditTour"));

//Drivers
const AllDrivers = React.lazy(() => import("./components/Drivers/AllDrivers"));
const AddDriver = React.lazy(() => import("./components/Drivers/AddDriver"));
const SingleDriver = React.lazy(() =>
  import("./components/Drivers/SingleDriver")
);
const EditDriver = React.lazy(() => import("./components/Drivers/EditDriver"));

//Tourguides
const AllTourguides = React.lazy(() =>
  import("./components/Tourguides/AllTourguides")
);
const AddTourguide = React.lazy(() =>
  import("./components/Tourguides/AddTourguide")
);
//Accommodations
const AllAccommodations = React.lazy(() =>
  import("./components/Accommodations/AllAccommodations")
);
const AddAccommodation = React.lazy(() =>
  import("./components/Accommodations/AddAccommodation")
);
const SingleAccommodation = React.lazy(() =>
  import("./components/Accommodations/SingleAccommodation")
);
const EditAccommodation = React.lazy(() =>
  import("./components/Accommodations/EditAccommodation")
);

const HotelPriceList = React.lazy(() =>
  import("./components/Accommodations/HotelPriceList")
);

const ApartmentPriceList = React.lazy(() =>
  import("./components/Accommodations/ApartmentPriceList")
);
// Website
const Website = React.lazy(() => import("./components/Website/Website"));
//Users
const Users = React.lazy(() => import("./components/Users/Users"));
//Admin -------------------------------
const Countries = React.lazy(() =>
  import("./components/Admin/countries/Countries")
);
const Cities = React.lazy(() => import("./components/Admin/cities/Cities"));
const TransportationTypes = React.lazy(() =>
  import("./components/Admin/transportationTypes/TransportationTypes")
);

const TransportationPrices = React.lazy(() =>
  import("./components/Admin/transportationPrices/TransportationPrices")
);
const TourguidePricrs = React.lazy(() =>
  import("./components/Admin/TourguidePrices/TourguidePrices")
);
const RoomCategories = React.lazy(() =>
  import("./components/Admin/roomsCategories/RoomCategories")
);

const AccommodationTypes = React.lazy(() =>
  import("./components/Admin/accommodationTypes/AccommodationTypes")
);
const TourHeader = React.lazy(() =>
  import("./components/Admin/tourHeaders/TourHeader")
);
const TourTitles = React.lazy(() =>
  import("./components/Admin/tourTitels/TourTitles")
);

const AuthLogin = React.lazy(() => import("./Authentication/Login"));
const AuthPass = React.lazy(() =>
  import("./components/Custompages/Forgotpassword/Forgotpassword")
);
const AuthResetPass = React.lazy(() =>
  import("./components/Custompages/Resetpassword/Resetpassword")
);

// const AuthSignup = React.lazy(() => import("./Authentication/Signup"));

const Root = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            {/* Website */}
            <Route path="/" element={<AuthLogin />} />
            <Route path={`/`} element={<Auth />}>
              <Route path={`login`} element={<AuthLogin />} />
              <Route path={`forgot-password`} element={<AuthPass />} />
              <Route path={`reset-password`} element={<AuthResetPass />} />

              {/* <Route path={`signup`} element={<AuthSignup />} /> */}
            </Route>
            <Route path={``} element={<App />}>
              <Route>
                <Route path={`dashboard`} element={<Dashboard />} />
              </Route>
              {/* Offers & Reservations */}
              <Route>
                <Route path={`create-tour`} element={<CreateTour />} />
                <Route path={`edit-tour/:id`} element={<CreateTour />} />
                <Route path={`website-offers`} element={<WebsiteOffers />} />
                <Route path={`all-packages`} element={<AllPackages />} />
                <Route
                  path={`all-reserved-packages`}
                  element={<AllReservedTours />}
                />
                <Route
                  path={`create-reservation/:id`}
                  element={<CreateReservation />}
                />
                <Route
                  path={`hotel-reservation/:id`}
                  element={<HotelReservation />}
                />
              </Route>

              {/* Tours */}
              <Route>
                <Route path={`all-tours`} element={<AllTours />} />
                <Route path={`add-tour`} element={<AddTour />} />
                <Route path={`tour/:id`} element={<SingleTour />} />
                <Route path={`tour-edit/:id`} element={<EditTour />} />
              </Route>

              {/* Drivers */}
              <Route>
                <Route path={`driver/all`} element={<AllDrivers />} />
                <Route path={`driver/add`} element={<AddDriver />} />
                <Route path={`driver/:id`} element={<SingleDriver />} />
                <Route path={`driver-edit/:id`} element={<EditDriver />} />
              </Route>

              {/* Tourguides */}
              <Route>
                <Route path={`tourguide/all`} element={<AllTourguides />} />
                <Route path={`tourguide/add`} element={<AddTourguide />} />
              </Route>

              {/* Accommodations */}
              <Route>
                <Route
                  path={`accommodation/all`}
                  element={<AllAccommodations />}
                />
                <Route
                  path={`accommodation/add`}
                  element={<AddAccommodation />}
                />
                <Route
                  path={`hotel-price-list/:id`}
                  element={<HotelPriceList />}
                />
                <Route
                  path={`accommodation/:id`}
                  element={<SingleAccommodation />}
                />
                <Route
                  path={`edit-accommodation/:id`}
                  element={<EditAccommodation />}
                />
                <Route
                  path={`apartment-price-list/:id`}
                  element={<ApartmentPriceList />}
                />
              </Route>

              {/* Users */}
              <Route>
                <Route path={`users`} element={<Users />} />
              </Route>

              {/* Admin */}
              <Route>
                <Route path={`admin/country`} element={<Countries />} />
                <Route path={`admin/cities`} element={<Cities />} />
                <Route
                  path={`admin/transportation-types`}
                  element={<TransportationTypes />}
                />
                <Route
                  path={`admin/transportation-Prices`}
                  element={<TransportationPrices />}
                />
                <Route
                  path={`admin/rooms-Categories`}
                  element={<RoomCategories />}
                />
                <Route
                  path={`admin/accommodation-types`}
                  element={<AccommodationTypes />}
                />
                <Route path={`admin/tour-header`} element={<TourHeader />} />
                <Route path={`admin/tour-titles`} element={<TourTitles />} />
                <Route
                  path={`admin/tourguide-prices`}
                  element={<TourguidePricrs />}
                />
              </Route>
            </Route>

            {/* ........................................Errorpage............................................... */}
            <Route path="*" element={<Error404 />} />
            <Route path={`tour-details/:id`} element={<TourDetails />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </Fragment>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <ErrorBoundary> */}
    <Root />
    {/* </ErrorBoundary> */}
  </Provider>
);

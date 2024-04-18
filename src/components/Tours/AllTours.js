import React, { Fragment, useEffect, useState } from "react";
import PagiTableTour from "./PagiTableTour";
import Select from "react-select";
import {
  GetALLToursItems,
  DeleteItem,
} from "../../Redux/TourReducer/tourSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import {
  GetALLCoutries,
  setItem,
} from "../../Redux/countryReducer/countrySlice";
import { resetStateCity } from "../../Redux/cityReducer/citySlice";
import { ToastContainer } from "react-toastify";

//===========(AllTours Page)
const AllTours = () => {
  const dispatch = useDispatch();

  // Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const allTours = useSelector((state) => state.tour?.data);

  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.tour
  );

  const [countryID, setCountryId] = useState("");

  //Feach all Tours
  useEffect(() => {
    if (selectedItem.id) {
      dispatch(GetALLToursItems(selectedItem.id || 100));
    }
  }, [dispatch, updated, deleted, created, countryID, selectedItem.id]);

  // handel delete item
  const removeCountry = (id) => {
    dispatch(DeleteItem(id));
  };

  return (
    <Fragment>
      <ToastContainer />
      {/* <!-- Page Header --> */}
      <Header
        title={"All Tour"}
        subTitle1={"All"}
        subTitle2={selectedItem.country}
      ></Header>
      {/* <!-- End Page Header --> */}

      {/* <!--Row--> */}
      <PagiTableTour
        data={allTours}
        remove={removeCountry}
        isLoading={isLoading}
      />
      {/* <!-- row closed  --> */}
    </Fragment>
  );
};

AllTours.propTypes = {};

AllTours.defaultProps = {};

export default AllTours;

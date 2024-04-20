import React, { Fragment, useEffect, useState } from "react";
import Paginate from "./PagiTabelAllReservedTours";
import Header from "../../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  GetALLOffers,
  DeleteItem,
} from "../../../Redux/offerReducer/offerSlice";

const AllReservedTours = () => {
  const dispatch = useDispatch();

  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { data, isLoading, updated, created, deleted } = useSelector(
    (state) => state.offer
  );
  // console.log(data);

  useEffect(() => {
    if (selectedItem.id) {
      dispatch(GetALLOffers(selectedItem.id));
    }
  }, [dispatch, selectedItem, updated, created, deleted]);

  // handel delete item
  const removeDriver = (id) => {
    dispatch(DeleteItem(id));
  };

  return (
    <Fragment>
      <ToastContainer />
      {/* <!-- Page Header --> */}
      <Header
        title={"Reservations"}
        subTitle1={"Packages"}
        subTitle2={selectedItem?.country || "loading..."}
      ></Header>
      {/* <!-- End Page Header --> */}

      {/* <!--Row Paginate Table--> */}
      <Paginate data={data} remove={removeDriver} isLoading={isLoading} />
      {/* <!- End Row Paginate Table--> */}
    </Fragment>
  );
};

AllReservedTours.propTypes = {};

AllReservedTours.defaultProps = {};

export default AllReservedTours;

import React, { Fragment, useEffect, useMemo } from "react";
import Paginate from "./PagiTableDriver";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetALLItems, DeleteItem } from "../../Redux/driverReducer/driverSlice";

const AllDrivers = () => {
  const dispatch = useDispatch();

  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { data, isLoading, updated, created, deleted } = useSelector(
    (state) => state.driver
  );
  // console.log(data);

  useEffect(() => {
    if (selectedItem.id) {
      dispatch(GetALLItems(selectedItem.id));
    }
  }, [dispatch, selectedItem.id, updated, created, deleted]);

  // handel delete item
  const removeDriver = (id) => {
    dispatch(DeleteItem(id));
  };

  return (
    <Fragment>
      <ToastContainer />
      {/* <!-- Page Header --> */}
      <Header
        title={"All Drivers"}
        subTitle1={"All"}
        subTitle2={selectedItem?.country || "loading..."}
      ></Header>
      {/* <!-- End Page Header --> */}

      {/* <!--Row Paginate Table--> */}

      <Paginate data={data} remove={removeDriver} isLoading={isLoading} />

      {/* <!- End Row Paginate Table--> */}
    </Fragment>
  );
};

AllDrivers.propTypes = {};

AllDrivers.defaultProps = {};

export default AllDrivers;

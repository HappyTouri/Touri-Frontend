import React, { Fragment, useEffect, useState } from "react";
import Paginate from "./PagiTableAllPackages";
import Header from "../../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  GetALLOffers,
  DeleteItem,
} from "../../../Redux/offerReducer/offerSlice";

const AllPackages = () => {
  const dispatch = useDispatch();

  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { data, isLoading, updated, created, deleted } = useSelector(
    (state) => state.offer
  );
  // console.log(data);

  //States
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (selectedItem.id) {
      dispatch(GetALLOffers(selectedItem.id));
    }
  }, [dispatch, selectedItem, updated, created, deleted]);

  // handel delete item
  const removeDriver = (id) => {
    dispatch(DeleteItem(id));
  };

  // filtel data by shared website
  useEffect(() => {
    const filtered = data.filter((item) => {
      return item.website_share == false && item.reserved == false;
    });

    setFilterData(filtered);
  }, [data]);

  return (
    <Fragment>
      <ToastContainer />
      {/* <!-- Page Header --> */}
      <Header
        title={"All Offers"}
        subTitle1={"On Going"}
        subTitle2={selectedItem?.country || "loading..."}
      ></Header>
      {/* <!-- End Page Header --> */}

      {/* <!--Row Paginate Table--> */}
      <Paginate data={filterData} remove={removeDriver} isLoading={false} />
      {/* <!- End Row Paginate Table--> */}
    </Fragment>
  );
};

AllPackages.propTypes = {};

AllPackages.defaultProps = {};

export default AllPackages;

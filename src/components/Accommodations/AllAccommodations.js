import React, { Fragment, useEffect, useState } from "react";
import Paginate from "./PagiTableAccommodation";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  GetALLItems,
  DeleteItem,
} from "../../Redux/accommodationReducer/accommodationSlice";

const AllAccommodations = () => {
  const dispatch = useDispatch();

  //Selectors
  const selectedItem = useSelector((state) => state.country.item || "");
  const { data, isLoading, updated, created, deleted } = useSelector(
    (state) => state.accommodations
  );
  // console.log(selectedItem);
  useEffect(() => {
    if (selectedItem.id) {
      dispatch(GetALLItems(selectedItem.id));
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
        title={"All Accommodations"}
        subTitle1={"All"}
        subTitle2={selectedItem?.country || "loading..."}
      >
        {
          <ButtonGroup aria-label="Basic example" role="group">
            <Button variant="primary" className=" pd-x-25" type="button">
              <Link
                to={`/all-accommodation/${selectedItem.id}`}
                className="btn btn-sm  "
              >
                Show All Hotels
              </Link>
            </Button>
          </ButtonGroup>
        }
      </Header>
      {/* <!-- End Page Header --> */}

      {/* <!--Row Paginate Table--> */}
      <Paginate data={data} remove={removeDriver} isLoading={false} />
      {/* <!- End Row Paginate Table--> */}
    </Fragment>
  );
};

AllAccommodations.propTypes = {};

AllAccommodations.defaultProps = {};

export default AllAccommodations;

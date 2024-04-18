import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import FormAccommodatioTypes from "./FormAccommodationTypes";
import PaginateTable from "../PaginateTable";
import EditAccommodationTypes from "./EditAccommodationTypes";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  GetALLItems,
  DeleteItem,
} from "../../../Redux/accommodationTypesReducer/accommodationTypesSlice";

const columns = [
  {
    title: "Type",
    key: "accommodation_type",
  },
];

// ============== (Accommodation Types)=======
const AccommodationTypes = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state.accommodationTypes?.data);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.accommodationTypes
  );

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Feach all Accommodation Types
  useEffect(() => {
    if (updated || created || deleted) {
      dispatch(GetALLItems());
    }
    dispatch(GetALLItems());
  }, [dispatch, updated, deleted, created]);

  const editCountry = (data) => {
    setShowEdit(true);
    setItemData(data);
  };

  const handelClose = () => {
    setShowEdit(false);
  };

  const removeCountry = (id) => {
    dispatch(DeleteItem(id));
  };

  //=========(return)
  return (
    <Fragment>
      <ToastContainer />
      <Header
        title={"Accommodation Types"}
        subTitle1={"All Types"}
        subTitle2={"Add Type"}
      />

      <FormAccommodatioTypes />
      <PaginateTable
        data={Data}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"All Accommodation Types"}
      />
      {itemData !== null && (
        <EditAccommodationTypes
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

AccommodationTypes.propTypes = {};

AccommodationTypes.defaultProps = {};

export default AccommodationTypes;

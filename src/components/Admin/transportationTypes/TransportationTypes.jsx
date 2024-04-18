import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import FormTransportationType from "./FormTransportationType";
import PaginateTable from "../PaginateTable";
import EditTransportationTypes from "./EditTransportationTypes";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  GetALLTransportationTyps,
  DeleteItem,
} from "../../../Redux/transportationTypesReducer/transportationTypesSlice";

const columns = [
  {
    title: "Transportation",
    key: "type",
  },
];

// ============
const TransportationTypes = () => {
  const dispatch = useDispatch();

  const allItems = useSelector((state) => state.transportationTypes?.data);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.transportationTypes
  );

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // FeTransportationTypes
  useEffect(() => {
    if (updated || created || deleted) {
      dispatch(GetALLTransportationTyps());
    }
    dispatch(GetALLTransportationTyps());
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
        title={"Transportation Types"}
        subTitle1={"All Types"}
        subTitle2={"Add Type"}
        dropdown={false}
      />

      <FormTransportationType />
      <PaginateTable
        data={allItems}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"Transportation Types"}
      />
      {itemData !== null && (
        <EditTransportationTypes
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

TransportationTypes.propTypes = {};

TransportationTypes.defaultProps = {};

export default TransportationTypes;

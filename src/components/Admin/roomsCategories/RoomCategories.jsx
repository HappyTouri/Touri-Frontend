import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import FormRoomCategory from "./FormRoomCategory";
import PaginateTable from "../PaginateTable";
import EditRoomCategory from "./EditRoomCategory";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  GetALLItems,
  DeleteItem,
} from "../../../Redux/roomCategoryReducer/roomCategorySlice";

const columns = [
  {
    title: "Room Category",
    key: "room_category",
  },
];

// ============== (Countries)=======
const Countries = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state.roomCategory?.data);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.roomCategory
  );

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Feach all Countries
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
        title={"Room Categories"}
        subTitle1={"All Categories"}
        subTitle2={"Add Category"}
        dropdown={false}
      />

      <FormRoomCategory />
      <PaginateTable
        data={Data}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"All Countries"}
      />
      {itemData !== null && (
        <EditRoomCategory
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

Countries.propTypes = {};

Countries.defaultProps = {};

export default Countries;

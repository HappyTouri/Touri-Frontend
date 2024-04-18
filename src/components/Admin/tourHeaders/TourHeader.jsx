import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import { ToastContainer } from "react-toastify";
import PaginateTable from "../PaginateTable";
import { useDispatch, useSelector } from "react-redux";
import FormTourHeader from "./FormTourHeader";
import EditTourHeader from "./EditTourHeader";
import {
  GetALLTourHeader,
  DeleteItem,
} from "../../../Redux/tourHeaderReducer/tourHeaderSlice";

const columns = [
  {
    title: "English",
    key: "title_EN",
  },
  {
    title: "Arabic",
    key: "title_AR",
  },
  {
    title: "Russian",
    key: "title_RU",
  },
  {
    title: "Days",
    key: "day",
  },
];
const TourHeader = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state.tourHeader?.data);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.tourHeader
  );

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Feach all Countries
  useEffect(() => {
    dispatch(GetALLTourHeader());
  }, [dispatch, updated, deleted, created]);

  const editTourHeader = (data) => {
    setShowEdit(true);
    setItemData(data);
  };

  const handelClose = () => {
    setShowEdit(false);
  };

  const removeTourHeader = (id) => {
    dispatch(DeleteItem(id));
  };
  return (
    <Fragment>
      <ToastContainer />
      <Header
        title={"Tour Headers"}
        subTitle1={"All"}
        subTitle2={"Add"}
        dropdown={false}
      />
      <FormTourHeader />
      <PaginateTable
        data={Data}
        column={columns}
        edit={editTourHeader}
        remove={removeTourHeader}
        isLoading={isLoading}
        tableTitle={"Tour Headers"}
      />
      {itemData !== null && (
        <EditTourHeader
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

TourHeader.propTypes = {};

TourHeader.defaultProps = {};

export default TourHeader;

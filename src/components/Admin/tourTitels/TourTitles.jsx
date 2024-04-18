import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import { ToastContainer } from "react-toastify";
import FormTourTitles from "./FormTourTitles";
import PaginateTable from "../PaginateTable";
import { useDispatch, useSelector } from "react-redux";
import EditTourTitles from "./EditTourTitles";
import {
  GetALLTourtitles,
  DeleteItem,
} from "../../../Redux/tourTitlesReducer/tourTitlesSlice";

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
];
const TourTitles = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state.tourTitles?.data);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.tourTitles
  );

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Feach all Countries
  useEffect(() => {
    if (updated || created || deleted) {
      dispatch(GetALLTourtitles());
    }
    dispatch(GetALLTourtitles());
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
  return (
    <Fragment>
      <ToastContainer />
      <Header
        title={"Tour Titles"}
        subTitle1={"All Titles"}
        subTitle2={"Add Title"}
        dropdown={false}
      />
      <FormTourTitles />
      <PaginateTable
        data={Data}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"All Countries"}
      />
      {itemData !== null && (
        <EditTourTitles
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

TourTitles.propTypes = {};

TourTitles.defaultProps = {};

export default TourTitles;

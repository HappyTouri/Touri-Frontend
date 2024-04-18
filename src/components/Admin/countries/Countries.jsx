import React, { Fragment, useState, useEffect, useCallback } from "react";
import Header from "../../Header";
import CountryForm from "./FormCountry";
import PaginateTable from "../PaginateTable";
import EditCountry from "./EditCountry";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  GetALLCoutries,
  DeleteItem,
} from "../../../Redux/countryReducer/countrySlice";

const columns = [
  {
    title: "country",
    key: "country",
  },
  {
    title: "country icon",
    key: "country_icon",
  },
];

// ============== (Countries)=======
const Countries = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.country?.data);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.country
  );

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Feach all Countries
  useEffect(() => {
    if (updated || created || deleted) {
      dispatch(GetALLCoutries());
    }
    dispatch(GetALLCoutries());
  }, [dispatch, updated, deleted, created]);

  const editCountry = useCallback((data) => {
    setShowEdit(true);
    setItemData(data);
  }, []);

  const handelClose = useCallback(() => {
    setShowEdit(false);
  }, []);

  const removeCountry = useCallback(
    (id) => {
      dispatch(DeleteItem(id));
    },
    [dispatch]
  );

  //=========(return)
  return (
    <Fragment>
      <ToastContainer />
      <Header
        title={"Countries"}
        subTitle1={"All Countries"}
        subTitle2={"Add Country"}
        dropdown={false}
      />

      <CountryForm />
      {allCountries && (
        <>
          <PaginateTable
            data={allCountries}
            column={columns}
            edit={editCountry}
            remove={removeCountry}
            isLoading={isLoading}
            tableTitle={"All Countries"}
          />
        </>
      )}

      {itemData !== null && (
        <EditCountry
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

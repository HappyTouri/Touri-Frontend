import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Header from "../../Header";
import FormCity from "./FormCity";
import PaginateTable from "../PaginateTable";
import EditCity from "./EditCity";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "react-select";

import { GetALLCities, DeleteItem } from "../../../Redux/cityReducer/citySlice";

const columns = [
  {
    title: "City",
    key: "city",
  },
];

// ============== (Countries)=======
const Cities = () => {
  const dispatch = useDispatch();

  // Selectors
  const allCountries = useSelector((state) => state.country?.data);
  const selectedItem = useSelector((state) => state.country.item || "");
  const AllCities = useSelector((state) => state.city?.data || []);
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.city
  );

  const [countryID, setCountryId] = useState(false);
  console.log(countryID);
  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // dropdown options Countries
  const dropdownOptions = useMemo(
    () =>
      allCountries.map((item) => ({
        value: item.id,
        label: item.country,
      })),
    [allCountries]
  );

  const handleChange = (selectedOption) => {
    setCountryId(selectedOption.value);
  };

  useEffect(() => {
    if (selectedItem.id) {
      setCountryId(selectedItem.id);
    }
  }, [selectedItem.id]);

  //Feach all Cityes
  useEffect(() => {
    if (countryID) {
      dispatch(GetALLCities(countryID));
    }
  }, [dispatch, updated, deleted, created, countryID]);

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
        title={"All Cities"}
        subTitle1={"Add"}
        subTitle2={selectedItem.country}
        dropdown={false}
      >
        {
          <div className="">
            <Multiselect
              classNamePrefix="Select2"
              options={dropdownOptions}
              singleSelect
              displayValue="key"
              placeholder={selectedItem.country}
              onChange={handleChange}
            />
          </div>
        }
      </Header>

      <FormCity countryID={countryID} />
      <PaginateTable
        data={AllCities}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"All Countries"}
      />

      {itemData !== null && (
        <EditCity
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

Cities.propTypes = {};

Cities.defaultProps = {};

export default Cities;

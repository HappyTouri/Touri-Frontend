import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Header from "../../Header";
import FormTransportationPrices from "./FormTransportationPrices";
import PaginateTable from "../PaginateTable";
import EditTransportationPrice from "./EditTransportationPrices";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "react-select";

import {
  GetALLItems,
  DeleteItem,
} from "../../../Redux/transportationPricesReducer/transportationPricesSlice";
import { GetALLTransportationTyps } from "../../../Redux/transportationTypesReducer/transportationTypesSlice";
const columns = [
  {
    title: "Transportation Type",
    key: "transportation_id",
  },
  {
    title: "Price",
    key: "price",
  },
];

// ============== (Countries)=======
const TransportationPrices = () => {
  const dispatch = useDispatch();
  //Selectors
  const allCountries = useSelector((state) => state.country?.data);
  const AllPrices = useSelector((state) => state.transportationPrice?.data);
  const selectedItem = useSelector((state) => state.country.item || "");
  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.transportationPrice
  );

  const [countryID, setCountryId] = useState("");
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

  // Get all data in array
  const PricesData = useMemo(
    () =>
      AllPrices.map((item) => ({
        id: item.id,
        price: item.price,
        transportation_id: item.transportation.type,
      })),
    [AllPrices]
  );

  //handelChange dropdown Country
  const handleChange = (selectedOption) => {
    setCountryId(selectedOption.value);
  };

  //Feach all transportation types
  useEffect(() => {
    dispatch(GetALLTransportationTyps());
    setCountryId(selectedItem.id);
  }, [dispatch, selectedItem.id]);

  //Feach all data
  useEffect(() => {
    if (updated || created || deleted) {
      dispatch(GetALLItems(countryID || 100));
    }
    dispatch(GetALLItems(countryID || 100));
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
        title={"Transportation Prices"}
        subTitle1={"Prices"}
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
              onChange={handleChange}
              placeholder={selectedItem.country}
            />
          </div>
        }
      </Header>
      <FormTransportationPrices countryID={countryID} />
      <PaginateTable
        data={PricesData}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"All Countries"}
      />

      {itemData !== null && (
        <EditTransportationPrice
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

TransportationPrices.propTypes = {};

TransportationPrices.defaultProps = {};

export default TransportationPrices;

import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Header from "../../Header";
import FormTourguidePrices from "./FormTourguidePrices";
import PaginateTable from "../PaginateTable";
import EditTourguidePrices from "./EditTourguidePrices";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  GetALLItems,
  DeleteItem,
} from "../../../Redux/tourguidePricesReducer/tourguidePricesSlice";
import { GetALLCoutries } from "../../../Redux/countryReducer/countrySlice";
import { GetALLTransportationTyps } from "../../../Redux/transportationTypesReducer/transportationTypesSlice";
const columns = [
  {
    title: "Country",
    key: "country_id",
  },
  {
    title: "Tourguide Price",
    key: "price",
  },
];

// ============== (Tourguide Prices)=======
const TourguidePrices = () => {
  const dispatch = useDispatch();

  const AllPrices = useSelector((state) => state.tourguidePrices?.data);
  console.log(AllPrices);

  const PricesData = AllPrices.map((item) => ({
    id: item.id,
    price: item.price,
    country_id: item.country.country,
  }));

  const { isLoading, updated, created, deleted } = useSelector(
    (state) => state.tourguidePrices
  );

  const [countryID, setCountryId] = useState("");
  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  //Feach all Tourguide Prices
  useEffect(() => {
    if (updated || created || deleted) {
      dispatch(GetALLItems());
    }
    dispatch(GetALLItems());
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
        title={"Tourguide Prices"}
        subTitle1={"Prices"}
        subTitle2={"Add Price"}
        dropdown={false}
      ></Header>
      <FormTourguidePrices countryID={countryID} />
      <PaginateTable
        data={PricesData}
        column={columns}
        edit={editCountry}
        remove={removeCountry}
        isLoading={isLoading}
        tableTitle={"All Countries"}
      />

      {itemData !== null && (
        <EditTourguidePrices
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

TourguidePrices.propTypes = {};

TourguidePrices.defaultProps = {};

export default TourguidePrices;

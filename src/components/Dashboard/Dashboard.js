import React, { Fragment, useState } from "react";

import {
  Nav,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  ProgressBar,
  Row,
  Col,
  Table,
  Card,
  Container,
  Button,
} from "react-bootstrap";

import Asset from "../../assets/img/Asset.png";
import projectlogo from "../../assets/img/media/project-logo.png";
// chartjs plugin
import { Bar, Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
// ReactApexChart
import ReactApexChart from "react-apexcharts";
import * as dashboardmain from "../../data/maindashboard";
// material ui
import CircularProgress from "@mui/material/CircularProgress";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../Redux/countryReducer/countrySlice";

function Dashboard() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.country?.data);
  const [activeKey, setActiveKey] = useState(allCountries?.[0]?.id);

  // handel Nav Bar Click
  const handleClick = (eventKey) => {
    const SelectedCountry = allCountries.filter((item) => {
      return item.id == eventKey;
    });

    dispatch(setItem(SelectedCountry[0]));

    setActiveKey(eventKey); // Update the active key when a Nav.Link is clicked
  };
  return (
    <Fragment>
      <div className="d-flex justify-content-center ht-100v align-items-center">
        <img className="pic-1 ht-200" alt="product1" src={Asset} />
      </div>
    </Fragment>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;

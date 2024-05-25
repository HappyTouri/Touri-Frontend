import React, { Fragment, useState } from "react";
import {
  Dropdown,
  Container,
  Form,
  Nav,
  Navbar,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Searchable from "react-searchable-dropdown";

// FuScreen-start
function Fullscreen() {
  if (
    (document.fullScreenElement && document.fullScreenElement === null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
// FullScreen-end
function Header({ handelSelectedLanguage }) {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `${process.env.PUBLIC_URL}/`;
    navigate(path);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    handelSelectedLanguage(language);
  };
  const getFlagIcon = (language) => {
    switch (language) {
      case "arabic":
        return <i className="flag flag-sa rounded"></i>;
      case "russian":
        return <i className="flag flag-ru rounded"></i>;
      default:
        return <i className="flag flag-gb rounded"></i>;
    }
  };

  const openCloseSidebar1 = () => {
    document.querySelector(".header-settings").classList.toggle("show");
    document.querySelector(".sidebar-right").classList.toggle("sidebar-open");
  };
  //  headerToggleButton
  const headerToggleButton = () => {
    let body = document.querySelector("body");
    let innerWidth = window.innerWidth;
    if (body !== !body) {
      if (innerWidth >= 992) {
        document.querySelector("body")?.classList.toggle("main-sidebar-hide");
        document.querySelector("body")?.classList.remove("main-sidebar-show");
      } else if (document.body.classList.contains("horizontalmenu")) {
        document.querySelector("body")?.classList.toggle("main-navbar-show");
        document.querySelector("body")?.classList.remove("main-sidebar-show");
        document.querySelector("body")?.classList.remove("main-sidebar-hide");
      } else {
        document.querySelector("body")?.classList.toggle("main-sidebar-show");
        document.querySelector("body")?.classList.remove("main-sidebar-hide");
      }
    }
  };

  function Swicherbutton() {
    document.querySelector(".demo_changer").classList.toggle("active");
    document.querySelector(".demo_changer").style.right = "0px";
  }
  const Darkmode = () => {
    document.querySelector("body").classList.toggle("dark-theme");
  };
  return (
    <Fragment>
      <Navbar
        expand="lg"
        className="main-header side-header sticky"
        // style={{ marginBottom: "-64px" }}
      >
        <Container fluid className="main-container container-fluid">
          <div className="main-header-center">
            <div className="responsive-logo">
              <img
                src={require("../../assets/img/brand/logo.png")}
                className="mobile-logo"
                alt="logo"
              />
              <img
                src={require("../../assets/img/brand/logo-light.png")}
                className="mobile-logo-dark"
                alt="logo"
              />
            </div>
          </div>
          <div className="main-header-right">
            <Navbar.Toggle
              aria-controls="navbarSupportedContent-4"
              className="navresponsive-toggler"
            >
              <i className="fe fe-more-vertical header-icons navbar-toggler-icon"></i>
            </Navbar.Toggle>
            <div className="navbar navbar-expand-lg nav nav-item navbar-nav-right responsive-navbar navbar-dark">
              <Navbar.Collapse
                className="collapse navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <div className="d-flex order-lg-2 align-items-center ms-auto">
                  <Dropdown className="dropdown d-flex main-header-theme">
                    <Nav.Link
                      className="nav-link icon layout-setting"
                      onClick={() => Darkmode()}
                    >
                      <span className="dark-layout">
                        <i className="fe fe-sun header-icons"></i>
                      </span>
                      <span className="light-layout">
                        <i className="fe fe-moon header-icons"></i>
                      </span>
                    </Nav.Link>
                  </Dropdown>
                  <Dropdown className=" main-header-notification flag-dropdown">
                    <Dropdown.Toggle
                      className="nav-link icon country-Flag "
                      variant="default"
                    >
                      {getFlagIcon(selectedLanguage)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu"
                      style={{ margin: "0px" }}
                    >
                      <Dropdown.Item
                        className="d-flex"
                        onClick={() => handleLanguageChange("english")}
                      >
                        <span className="avatar  me-3 align-self-center bg-transparent">
                          <i className="flag flag-gb rounded"></i>
                        </span>
                        <div className="d-flex">
                          <span className="mt-2">English</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex"
                        onClick={() => handleLanguageChange("arabic")}
                      >
                        <span className="avatar  me-3 align-self-center bg-transparent">
                          <i className="flag flag-sa rounded"></i>
                        </span>
                        <div className="d-flex">
                          <span className="mt-2">Arabic</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex"
                        onClick={() => handleLanguageChange("russian")}
                      >
                        <span className="avatar  me-3 align-self-center bg-transparent">
                          <i className="flag flag-ru rounded"></i>
                        </span>
                        <div className="d-flex">
                          <span className="mt-2">Russian</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="d-md-flex">
                    <div
                      className="nav-link icon full-screen-link"
                      onClick={Fullscreen}
                    >
                      <i className="fe fe-maximize fullscreen-button fullscreen header-icons"></i>
                      <i className="fe fe-minimize fullscreen-button exit-fullscreen header-icons"></i>
                    </div>
                  </div>
                </div>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </Fragment>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;

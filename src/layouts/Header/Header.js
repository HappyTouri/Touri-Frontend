import React, { Fragment, useMemo } from "react";
import {
  Dropdown,
  Container,
  Form,
  Nav,
  Navbar,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Searchable from "react-searchable-dropdown";
import { AllInbox } from "@material-ui/icons";
import { setItem } from "../../Redux/countryReducer/countrySlice";
import { logout } from "../../Redux/auth/authSlice";

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
function Header() {
  const dispatch = useDispatch();
  const AllCountries = useSelector((state) => state.country.data);
  const selectedItem = useSelector((state) => state.country.item || "");
  // const [selectedCountryId, setSelectedCountryId] = useState(null);

  // get the selected Country
  const selectedCountry = useMemo(() => {
    if (!selectedItem.country) {
      return " ";
    }
    return selectedItem.country;
  }, [selectedItem.country]);

  // Gell dropdown options for country
  const dropdownAllCountries = useMemo(() => {
    if (!AllCountries) {
      return [];
    }
    return AllCountries.map((item) => ({
      value: item.id,
      label: item.country,
    }));
  }, [AllCountries]);

  // handel Change for country dropDown
  const handleCountrySelect = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption) {
      const selectedCountry = AllCountries.find(
        (item) => item.id === selectedOption
      );
      if (selectedOption) {
        dispatch(setItem(selectedCountry));
      }
    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
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
        className="main-header side-header sticky "
        // style={{ marginBottom: "-64px" }}
      >
        <Container
          fluid
          className="main-container container-fluid pos-relative z-index-200 "
        >
          <div className="main-header-left ">
            <Link
              to="#"
              className="main-header-menu-icon"
              id="mainSidebarToggle"
              onClick={() => headerToggleButton()}
            >
              <span></span>
            </Link>
            <div className="hor-logo">
              <Link
                to={`${process.env.PUBLIC_URL}/dashboard/`}
                className="main-logo"
              >
                <img
                  src={require("../../assets/img/brand/logo.png")}
                  className="header-brand-img desktop-logo"
                  alt="logo"
                />
                <img
                  src={require("../../assets/img/brand/logo-light.png")}
                  className="header-brand-img desktop-logo-dark"
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="main-header-center ">
            <div className="responsive-logo">
              <Link to={`${process.env.PUBLIC_URL}/dashboard/`}>
                <img
                  src={require("../../assets/img/brand/logo.png")}
                  className="mobile-logo"
                  alt="logo"
                />
              </Link>
              <Link to={`${process.env.PUBLIC_URL}/dashboard/`}>
                <img
                  src={require("../../assets/img/brand/logo-light.png")}
                  className="mobile-logo-dark"
                  alt="logo"
                />
              </Link>
            </div>
            <InputGroup>
              {/* <Selectoptions /> */}
              <Searchable
                className="form-control select2"
                value="test"
                placeholder={selectedCountry} // by default "Search"
                notFoundText="No result found" // by default "No result found"
                noInput
                options={dropdownAllCountries}
                onSelect={handleCountrySelect} // Handle selection
                listMaxHeight={140} //by default 140
              />
              <Form.Control
                type="search"
                className="rounded-0"
                placeholder="Search for anything..."
              />
              <InputGroup.Text className="btn search-btn">
                <i className="fe fe-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="main-header-right ">
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
                  <Dropdown className="header-search">
                    <Dropdown.Toggle variant="default" className="px-0">
                      <i className="fe fe-search header-icons fs-18 px-2 lh-5"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-2">
                      <InputGroup>
                        <Searchable
                          className="form-control select2"
                          value="test"
                          placeholder="Choose one" // by default "Search"
                          notFoundText="No result found" // by default "No result found"
                          noInput
                          options={[
                            {
                              value: "",
                              label: "All categories",
                            },
                            {
                              value: "it projects",
                              label: "IT Projects",
                            },
                            {
                              value: "business case",
                              label: "Business Case",
                            },
                            {
                              value: "microsoft project",
                              label: "Microsoft Project",
                            },
                            {
                              value: "risk ]management",
                              label: "Risk Management",
                            },
                            {
                              value: "popular",
                              label: "Popular",
                            },
                            {
                              value: "team building",
                              label: "Team Building",
                            },
                          ]}
                          onSelect={(value) => {
                            console.log(value);
                          }}
                          listMaxHeight={140} //by default 140
                        />
                        <Form.Control
                          type="search"
                          className="rounded-0"
                          placeholder="Search for anything..."
                        />
                        <InputGroup.Text className="btn search-btn">
                          <i className="fe fe-search"></i>
                        </InputGroup.Text>
                      </InputGroup>
                    </Dropdown.Menu>
                  </Dropdown>
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

                  <div className="d-md-flex">
                    <div
                      className="nav-link icon full-screen-link"
                      onClick={Fullscreen}
                    >
                      <i className="fe fe-maximize fullscreen-button fullscreen header-icons"></i>
                      <i className="fe fe-minimize fullscreen-button exit-fullscreen header-icons"></i>
                    </div>
                  </div>
                  <Dropdown className=" main-header-notification">
                    <Dropdown.Toggle
                      className="nav-link icon"
                      href="#"
                      variant="default"
                    >
                      <i className="fe fe-bell header-icons"></i>
                      <span className="badge bg-danger nav-link-badge">4</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ margin: "0px" }}>
                      <div className="header-navheading">
                        <p className="main-notification-text">
                          You have 1 unread notification
                          <span className="badge bg-pill bg-primary ms-3">
                            View all
                          </span>
                        </p>
                      </div>
                      <div className="main-notification-list">
                        <div className="media new">
                          <div className="main-img-user online">
                            <img
                              alt="avatar"
                              src={require("../../assets/img/users/5.jpg")}
                            />
                          </div>
                          <div className="media-body">
                            <p>
                              Congratulate <strong>Olivia James</strong> for New
                              template start
                            </p>
                            <span>Oct 15 12:32pm</span>
                          </div>
                        </div>
                        <div className="media">
                          <div className="main-img-user">
                            <img
                              alt="avatar"
                              src={require("../../assets/img/users/2.jpg")}
                            />
                          </div>
                          <div className="media-body">
                            <p>
                              <strong>Joshua Gray</strong> New Message Received
                            </p>
                            <span>Oct 13 02:56am</span>
                          </div>
                        </div>
                        <div className="media">
                          <div className="main-img-user online">
                            <img
                              alt="avatar"
                              src={require("../../assets/img/users/3.jpg")}
                            />
                          </div>
                          <div className="media-body">
                            <p>
                              <strong>Elizabeth Lewis</strong> added new
                              schedule realease
                            </p>
                            <span>Oct 12 10:40pm</span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-footer">
                        <Link to="#">View All Notifications</Link>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown className="main-profile-menu">
                    <Dropdown.Toggle className="d-flex p-0" variant="default">
                      <span className="main-img-user mx-1">
                        <img
                          alt="avatar"
                          src={require("../../assets/img/users/1.jpg")}
                        />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ margin: "0px" }}>
                      <div className="header-navheading">
                        <h6 className="main-notification-title">
                          Sonia Taylor
                        </h6>
                        <p className="main-notification-text">Web Designer</p>
                      </div>
                      <Dropdown.Item
                        className="border-top"
                        href={`${process.env.PUBLIC_URL}/pages/profile`}
                      >
                        <i className="fe fe-user"></i> My Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/profile`}
                      >
                        <i className="fe fe-edit"></i> Edit Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/profile`}
                      >
                        <i className="fe fe-settings"></i> Account Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/profile`}
                      >
                        <i className="fe fe-settings"></i> Support
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/profile`}
                      >
                        <i className="fe fe-compass"></i> Activity
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          dispatch(logout());
                          navigate('/');
                        }}
                      >
                        <i className="fe fe-power"></i> Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <div className="d-md-flex header-settings">
                    <Nav.Link
                      href="#"
                      className="nav-link icon"
                      onClick={() => openCloseSidebar1()}
                    >
                      <i className="fe fe-align-right header-icons"></i>
                    </Nav.Link>
                  </div> */}
                </div>
              </Navbar.Collapse>
              <div className="d-flex header-setting-icon demo-icon fa-spin">
                <Nav.Link className="nav-link icon" onClick={Swicherbutton}>
                  <i className="fe fe-settings settings-icon "></i>
                </Nav.Link>
              </div>
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

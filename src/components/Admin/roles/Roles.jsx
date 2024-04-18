import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";

const Roles = () => {
  return (
    <Fragment>
      <Header
        title={"Roles"}
        subTitle1={"All Roles"}
        subTitle2={"Add Role"}
        dropdown={false}
      />
    </Fragment>
  );
};

Roles.propTypes = {};

Roles.defaultProps = {};

export default Roles;

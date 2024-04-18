import React from "react";
import { Link } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
const Footer = () => (
  <div className="main-footer text-center">
    <Container>
      <Row className="row-sm">
        <Col md={12} className="col-md-12">
          <span>
            Copyright © 2024 <Link href="#">Happy Touri</Link>.
          </span>
        </Col>
      </Row>
    </Container>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;

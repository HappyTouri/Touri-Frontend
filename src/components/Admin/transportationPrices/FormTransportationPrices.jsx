import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CreateItem } from "../../../Redux/transportationPricesReducer/transportationPricesSlice";
import Multiselect from "react-select";

//Form Validations
const schema = Yup.object().shape({
  price: Yup.string().required("Type is Required"),
});

const FormTransportationPrices = ({ countryID }) => {
  const dispatch = useDispatch();
  const [ddselected, setDdselected] = useState("");

  const allTypes = useSelector((state) => state.transportationTypes?.data);
  const dropdownOptions = allTypes.map((item) => ({
    value: item.id,
    label: item.type,
  }));

  const formik = useFormik({
    initialValues: {
      price: "",
      country_id: "",
      transportation_id: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // dispatch(createCity(values));
      values.country_id = countryID;
      values.transportation_id = ddselected;
      console.log(values);
      dispatch(CreateItem(values));
      formik.resetForm();
    },
  });

  const handleChange = (selectedOption) => {
    setDdselected(selectedOption.value);
  };

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        {/* <!-- Row Add Counry --> */}
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className=" custom-card">
              <Card.Body>
                <Row className="row-sm">
                  <Col md={3} lg={3} xl={3}>
                    <label className="">Transportation Type :</label>
                    <Multiselect
                      classNamePrefix="Select2"
                      options={dropdownOptions}
                      singleSelect
                      displayValue="key"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3} lg={3} xl={3}>
                    <label className="">Add Price :</label>
                    <Form.Group className=" mb-3">
                      <Form.Control
                        type="text"
                        name="price"
                        placeholder=""
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={6} xl={6}>
                    <div className="text-center  wd-100">
                      <label className="">&nbsp;</label>
                      <Button
                        className="btn ripple btn-main-primary btn-block"
                        type="submit"
                      >
                        ADD
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- End Row add country --> */}
      </Form>
    </Fragment>
  );
};

FormTransportationPrices.propTypes = {};

FormTransportationPrices.defaultProps = {};

export default FormTransportationPrices;

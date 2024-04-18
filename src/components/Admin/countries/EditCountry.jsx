import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateItem } from "../../../Redux/countryReducer/countrySlice";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
  country: Yup.string().required("Country is Required"),
  country_icon: Yup.string().required("Icon is Required"),
});

function EditCountry({ itemData, show, handelClose }) {
  const dispatch = useDispatch();

  const close = () => {
    handelClose();
  };

  const formik = useFormik({
    initialValues: {
      country: itemData?.country,
      country_icon: itemData?.country_icon,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: itemData.id, data: values };
      dispatch(UpdateItem(data));
      handelClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      country: itemData?.country,
      country_icon: itemData?.country_icon,
    });
  }, [itemData]);

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT COUNTRY</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange("country")}
                placeholder="country"
                autoFocus
              />
              <div>{formik.touched.country && formik.errors.country}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="country_icon"
                value={formik.values.country_icon}
                onChange={formik.handleChange("country_icon")}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handelClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditCountry;

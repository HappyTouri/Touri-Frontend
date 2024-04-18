import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateItem } from "../../../Redux/accommodationTypesReducer/accommodationTypesSlice";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
  accommodation_type: Yup.string().required("Type is Required"),
});

function EditAccommodationTypes({ itemData, show, handelClose }) {
  const dispatch = useDispatch();

  const close = () => {
    handelClose();
  };

  const formik = useFormik({
    initialValues: {
      accommodation_type: itemData?.accommodation_type,
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
      accommodation_type: itemData?.accommodation_type,
    });
  }, [itemData]);

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Room Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Accommodation Type</Form.Label>
              <Form.Control
                type="text"
                name="accommodation_type"
                value={formik.values.accommodation_type}
                onChange={formik.handleChange}
                placeholder=""
                autoFocus
              />
              {/* <div>{formik.touched.country && formik.errors.country}</div> */}
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

export default EditAccommodationTypes;

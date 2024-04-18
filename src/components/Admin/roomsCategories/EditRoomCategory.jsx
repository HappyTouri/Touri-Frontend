import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateItem } from "../../../Redux/roomCategoryReducer/roomCategorySlice";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
  room_category: Yup.string().required("Type is Required"),
});

function EditRoomCategory({ itemData, show, handelClose }) {
  const dispatch = useDispatch();

  const close = () => {
    handelClose();
  };

  const formik = useFormik({
    initialValues: {
      room_category: itemData?.room_category,
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
      type: itemData?.room_category,
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
              <Form.Label>Room Category</Form.Label>
              <Form.Control
                type="text"
                name="room_category"
                value={formik.values.room_category}
                onChange={formik.handleChange("room_category")}
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

export default EditRoomCategory;

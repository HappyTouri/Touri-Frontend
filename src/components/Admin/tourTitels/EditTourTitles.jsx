import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateItem } from "../../../Redux/tourTitlesReducer/tourTitlesSlice";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
  title_EN: Yup.string().required("Title is Required"),
  title_AR: Yup.string().required("Title is Required"),
  title_RU: Yup.string().required("Title is Required"),
});

function EditTourTitles({ itemData, show, handelClose }) {
  const dispatch = useDispatch();

  const close = () => {
    handelClose();
  };

  const formik = useFormik({
    initialValues: {
      title_EN: itemData?.title_EN,
      title_AR: itemData?.title_AR,
      title_RU: itemData?.title_RU,
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
      title_EN: itemData?.title_EN,
      title_AR: itemData?.title_AR,
      title_RU: itemData?.title_RU,
    });
  }, [itemData]);

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Titles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title_EN</Form.Label>
              <Form.Control
                type="text"
                name="title_EN"
                value={formik.values.title_EN}
                onChange={formik.handleChange("title_EN")}
                placeholder=""
                autoFocus
              />
              {/* <div>{formik.touched.country && formik.errors.country}</div> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title_AR</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="title_AR"
                value={formik.values.title_AR}
                onChange={formik.handleChange("title_AR")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title_RU</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="title_RU"
                value={formik.values.title_RU}
                onChange={formik.handleChange("title_RU")}
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

export default EditTourTitles;

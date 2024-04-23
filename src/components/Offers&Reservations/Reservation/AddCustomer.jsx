import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateItem } from "../../../Redux/UsersReducer/UsersSlice";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
  name: Yup.string().required("name is Required"),
  mobile: Yup.string().required("Mobile is Required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
});

function AddCustomer({ countryID, show, handelClose }) {
  const dispatch = useDispatch();
  console.log(countryID);
  const close = () => {
    handelClose();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      country_id: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(CreateItem(values));
      handelClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      country_id: countryID,
    });
  }, [countryID]);
  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                placeholder=""
                autoFocus
              />
              {/* <div>{formik.touched.country && formik.errors.country}</div> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile :</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                autoFocus
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handelClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddCustomer;

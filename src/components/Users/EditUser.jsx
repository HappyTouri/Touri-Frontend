import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateItem } from "../../Redux/UsersReducer/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "react-select";

const roles = [
  {
    value: "admin",
    label: "admin",
  },
  {
    value: "customer",
    label: "customer",
  },
  {
    value: "hotel",
    label: "hotel",
  },
  {
    value: "driver",
    label: "driver",
  },
  {
    value: "tourguide",
    label: "tourguide",
  },
  {
    value: "tour operator",
    label: "tour operator",
  },
  {
    value: "customer service",
    label: "customer service",
  },
  {
    value: "travel agency",
    label: "travel agency",
  },
  ,
];

//Form Validations
const schema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email Address") // This line validates the email format
    .required("Email is Required"),
  mobile: Yup.string().required("Mobile is Required"),
  country_id: Yup.number().required("Country is Required"),
  role: Yup.string().required("Role is Required"),
});

function EditUser({ itemData, show, handelClose }) {
  const dispatch = useDispatch();
  // console.log(itemData);

  //Selector
  const allCountries = useSelector((state) => state.country?.data);

  // dropdown Countries
  const dropdownOptions = allCountries.map((item) => ({
    value: item.id,
    label: item.country,
  }));

  //handel change Country
  const handleChangeCountry = (selectedOption) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      country_id: selectedOption.value,
    }));
  };

  //handel change role
  const handleChangeRole = (selectedOption) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      role: selectedOption.value,
    }));
  };

  const close = () => {
    handelClose();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      country_id: "",
      role: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      const userData = { id: itemData.id, data: values };
      dispatch(UpdateItem(userData));
      formik.resetForm();
      handelClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      name: itemData?.name,
      email: itemData?.email,
      mobile: itemData?.mobile,
      country_id: itemData?.country?.id,
      role: itemData?.role,
    });
  }, [itemData]);

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                placeholder={formik.values.name}
                autoFocus
              />
              <div>{formik.touched.country && formik.errors.country}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                placeholder={formik.values.email}
                autoFocus
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile :</Form.Label>
              <Form.Control
                type="text"
                placeholder={formik.values.mobile}
                autoFocus
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
              />
            </Form.Group>
            <label className="">Country :</label>
            <Multiselect
              classNamePrefix="Select2 "
              options={dropdownOptions}
              singleSelect
              placeholder={itemData?.country?.country || "Loading..."}
              displayValue="key"
              onChange={handleChangeCountry}
            />
            <label className="mt-3">Role :</label>
            <Multiselect
              classNamePrefix="Select2 "
              options={roles}
              singleSelect
              placeholder={formik.values.role}
              displayValue="key"
              onChange={handleChangeRole}
            />
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

export default EditUser;

import React, { Fragment, useState, useEffect, useCallback } from "react";
import Header from "../Header";
import UserForm from "./FormUser";
import PaginateTable from "../Admin/PaginateTable";
import EditUser from "./EditUser";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { GetALLUsers, DeleteItem } from "../../Redux/UsersReducer/UsersSlice";

const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Mobile",
    key: "mobile",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Role",
    key: "role",
  },
];

// ============== (Users)=======
const Users = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.country?.data);
  const { data, isLoading, updated, createdUser, deleted } = useSelector(
    (state) => state.user
  );
  console.log(data);

  const [itemData, setItemData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Feach all Countries
  useEffect(() => {
    dispatch(GetALLUsers());
  }, [dispatch, updated, deleted, createdUser]);

  const editUser = useCallback((data) => {
    setShowEdit(true);
    setItemData(data);
  }, []);

  const handelClose = useCallback(() => {
    setShowEdit(false);
  }, []);

  const removeCountry = useCallback(
    (id) => {
      dispatch(DeleteItem(id));
    },
    [dispatch]
  );

  //=========(return)
  return (
    <Fragment>
      <ToastContainer />
      <Header
        title={"Users"}
        subTitle1={"All"}
        subTitle2={"Users"}
        dropdown={false}
      />

      <UserForm />
      {data && (
        <>
          <PaginateTable
            data={data}
            column={columns}
            edit={editUser}
            remove={removeCountry}
            isLoading={isLoading}
            tableTitle={"All Users"}
          />
        </>
      )}

      {itemData !== null && (
        <EditUser
          itemData={itemData}
          show={showEdit}
          handelClose={handelClose}
        />
      )}
    </Fragment>
  );
};

Users.propTypes = {};

Users.defaultProps = {};

export default Users;

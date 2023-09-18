import React, { useState, Fragment } from "react";
import Form from "./form";

//import UserProfileTable from "../tables/userProfileTable";

function Profile() {
  const [tableData, setTableData] = useState([]);
  const [formObject, setFormObject] = useState({
    carModel: "",
    maintenanceType: "",
    autoShop: "",
    lastAptDate: "",
    nextAptDate: ""
  });
  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    setFormObject(value);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === "");
    if (checkVal) {
      const dataObj = (data) => [...data, formObject];
      setTableData(dataObj);
      const isEmpty = { carModel: "", maintenanceType: "", autoShop: "",
      lastAptDate: "", nextAptDate: "" };
      setFormObject(isEmpty);
    }
  };
  return (
        <Fragment>
            <h2 className="text-center">Add new maintenance appointment</h2>
        <Form
            onValChange={onValChange}
            formObject={formObject}
            onFormSubmit={onFormSubmit}
        />

        </Fragment>
  );
}
export default Profile;
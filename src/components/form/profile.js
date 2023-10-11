import React, { useState, Fragment } from "react";
import Form from "./form";

function Profile() {

  const [formObject, setFormObject] = useState({
    carModel: "",
    maintenanceType: "",
    autoShop: "",
    lastAptDate: "",
    nextAptDate: ""
  });

  // on change of input field 
  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    setFormObject(value);
  };

  // on submit of form, store user input fields in correct order in the formObject state variable
  const onFormSubmit = (event) => {
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === "");
    if (checkVal) {
      //const dataObj = (data) => [...data, formObject];
      //setTableData(dataObj);
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
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";

//function Form({ onValChange, formObject, onFormSubmit }) {
  function Form() {

  const [carModel, setCarModel] = useState();
  const [maintenanceType, setMaintenanceType] = useState();
  const [autoShop, setAutoShop] = useState();
  const [lastAptDate, setLastAptDate] = useState();
  const [nextAptDate, setNextAptDate] = useState();

  // We are consuming our user-management context to
  // get & set the user details here
  //const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  //const fetchedUser = userContext.fetchedUser;
  //const usersCollection = context.services.get("mongodb-atlas").db("color-set-editor").collection("Users");
  

  const { userID } = useContext(UserContext);
  const Submit = () => {
    axios.post('http://localhost:3002/createAppointment', {carModel, maintenanceType, autoShop, lastAptDate, nextAptDate, userID})
    .then((appointments) => {
      console.log(appointments)
    }).catch(err => console.log(err))
}

    return (
      <div className="row mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Car Model"
            onChange={(e) => setCarModel(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Maintenance Type"
            onChange={(e) => setMaintenanceType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Auto Shop"
            onChange={(e) => setAutoShop(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Last Appointment Date"
            onChange={(e) => setLastAptDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Next Appointment Date"
            onChange={(e) => setNextAptDate(e.target.value)}
          />
        </div>
      
        <div className="d-grid">
          <input
            type="submit"
            onClick={Submit}
            className="btn btn-success"
          />
        </div>
      </div>
    );
  }
  export default Form;
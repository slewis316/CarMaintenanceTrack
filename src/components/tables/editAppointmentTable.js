import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import { Button } from "@mui/material";



function EditAppointmentTable() {

    const [appointments, setAppointments] = useState([]);
    const { userID } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:3002/getAppointments')
        .then((appointments) => {
            setAppointments(appointments.data);       
        }).catch(err => console.log(err))
    }, [])
    
    /*const [form, setForm] = useState({
        carModel: appointments.data.carModel,
        maintenanceType: appointments.data.maintenanceType,
        autoShop: appointments.data.autoShop,
        lastAptDate: appointments.data.lastAptDate,
        nextAptDate: appointments.data.nextAptDate
    });*/
    


    
/*
    const updateButton = async (event) => {
        try {
          // Here we are passing user details to our emailPasswordLogin
          // function that we imported from our realm/authentication.js
          // to validate the user credentials and log in the user into our App.
          const user = await emailPasswordLogin(form.email, form.password);
          if (user) {
            redirectNow();
          }
        } catch (error) {
            if (error.statusCode === 401) {
               alert("Invalid username/password. Try again!");
           } else {
               alert(error);
           }
      
        }
      }; */
    
    return (
        <div className="mx auto">
        {appointments.map(appointment => {
            if (appointment.userID ===  userID) {
            return (
            <div>
                <div>
                    <strong>
                        <h2>Appointment Date:   {appointment.nextAptDate}</h2>  
                    </strong>
                </div>
                <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={appointment.carModel}
                    //onChange={onChange}
                    //value={form.carModel}
                    //value={appointment.carModel}
                    name="carModel"
                />
                </div>
                <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={appointment.maintenanceType}
                    //onChange={onChange}
                    //value={form.maintenanceType}
                    name="maintenanceType"
                />
                </div>
                <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={appointment.autoShop}
                    //onChange={onChange}
                    //value={form.autoShop}
                    name="autoShop"
                />
                </div>
                <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={appointment.lastAptDate}
                    //onChange={onChange}
                    //value={form.lastAptDate}
                    name="lastAptDate"
                />
                </div>
                <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={appointment.nextAptDate}
                    //onChange={onChange}
                    //value={form.nextAptDate}
                    name="nextAptDate"
                />
                </div>
            </div>
            )}}
      )}
      </div>);
}

export default EditAppointmentTable;
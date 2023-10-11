import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditAppointmentTable() {

    const [appointments, setAppointments] = useState({});
    const [formData, setFormData] = useState({});
    // stored appointment ID from my Appointments page in the context
    const { updateAppointmentID } = useContext(UserContext);
    // needed to return back to my Appointments page
    const navigate = useNavigate();

    // get correct appointment document by ID in the collection
    useEffect(() => {
        axios.get(`http://localhost:3002/getAppointmentByID/${updateAppointmentID}`)
        .then((appointments) => {
            setAppointments(appointments.data); 
            console.log(appointments.data);     
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // Populate formData with existingData when it's available
        if (Object.keys(appointments).length > 0) {
          setFormData(appointments);
        }
      }, [appointments]);         

    // replace formObject data onchange of inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    // on submit update the document in the collection
    const onSubmit = (e) => {
        e.preventDefault();
        // object to send to backend
        const updatedAppointment = { id: updateAppointmentID, ...formData};

        axios.post('http://localhost:3002/updateAppointment/', updatedAppointment)
        .then((response) => {
            console.log('Update Successful', response.data);
            setFormData({});
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        })

        // For demonstration purposes, log the updated data
        console.log('Updated Data:', { id: appointments._id, ...formData });
        // return to myAppointments page when updated
        navigate("/userAppointments");
    } 
    
    return (
        <div className="row mb-4">
          <h2>Update Appointment</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <strong>
                <label for="carModel">Car Model: </label>
              </strong>
              <input
                type="text"
                className="form-control"
                id="carModel"
                name="carModel"
                value={formData.carModel}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <strong>
                <label for="maintenanceType">Maintenance Type: </label>
              </strong>
              <input
                type="text"
                className="form-control"
                id="maintenanceType"
                name="maintenanceType"
                value={formData.maintenanceType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <strong>
                <label for="autoShop">Auto Shop: </label>
              </strong>
              <input
                type="text"
                className="form-control"
                id="autoShop"
                name="autoShop"
                value={formData.autoShop}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <strong>
                <label for="lastAptDate">Last Appointment Date: </label>
              </strong>
              <input
                type="text"
                className="form-control"
                id="lastAptDate"
                name="lastAptDate"
                value={formData.lastAptDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <strong>
                <label for="nextAptDate">Next Appointment Date: </label>
              </strong>
              <input
                type="text"
                className="form-control"
                id="nextAptDate"
                name="nextAptDate"
                value={formData.nextAptDate}
                onChange={handleInputChange}
              />
            </div>
              <button type="submit">Update</button>
          </form>
        </div>
      )}
      
      


export default EditAppointmentTable;
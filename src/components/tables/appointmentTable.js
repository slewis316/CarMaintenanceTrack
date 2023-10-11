import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import { Link } from 'react-router-dom';



function AppointmentTable() {

    // state variable to hold appointments array once fetched
    const [appointments, setAppointments] = useState([]);

    // state var from context to parse through appointment docs to find logged in user's appointments
    const { userID } = useContext(UserContext);
    // context state var to pass correct appointment _id to edit page
    const { updateAppointmentID, setUpdateAppointmentID } = useContext(UserContext);

    // axios.get to fetch collection data from mongodb
    useEffect(() => {
        axios.get('http://localhost:3002/getAppointments')
        .then((appointments) => {
        setAppointments(appointments.data)
        }).catch(err => console.log(err))
    }, [])    

    // delete function using findByIdAndDelete (async)
    const handleDelete = async (id) => {
        // confirmation before delete
        const shouldDelete = window.confirm('Are you sure you want to delete this item?');
        if (shouldDelete) {
            try {
                const res = await axios.delete(`http://localhost:3002/deleteAppointment/${id}`);
                if (res.data.success) {
                    window.location.reload();
                }
            }
            catch(err) {
                console.error(err);
            }
        }
    }

    return (
        <div className="mx-auto">
          {appointments.map(appointment => {
            if (appointment.userID ===  userID) {
              return (
                <div key={appointment._id}>
                    <strong>
                            <h2>Appointment Date:   {appointment.nextAptDate}</h2>  
                    </strong>
                    <Link to="/editAppointment"> <button onClick={e => setUpdateAppointmentID(appointment._id)}>Update</button></Link>
                    <button onClick={e => handleDelete(appointment._id)}>Delete</button>
                    <table className="table table-bordered table-hover table-sm">
                        <tbody className="table-sm">
                        <tr>
                            <th>Car Model:</th>
                            <td>{appointment.carModel}</td>
                        </tr>
                        <tr>
                            <th>Maintenance Type:</th>
                            <td>{appointment.maintenanceType}</td>
                        </tr>
                        <tr>
                            <th>Auto Shop:</th>
                            <td>{appointment.autoShop}</td>
                        </tr>
                        <tr>
                            <th>Last appointment:</th>
                            <td>{appointment.lastAptDate}</td>
                        </tr>
                        <tr>
                            <th>Upcoming appointment:</th>
                            <td>{appointment.nextAptDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                );
            }
            })}
        
        </div>
      );
}

export default AppointmentTable;
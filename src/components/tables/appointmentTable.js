import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';



function AppointmentTable() {

    const [appointments, setAppointments] = useState([]);
    const { userID } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:3002/getAppointments')
        .then((appointments) => {
        setAppointments(appointments.data)
        }).catch(err => console.log(err))
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete('http://localhost:3002/deleteAppointment' +id);
            if (res.data.success) {
                alert(res.data.msg);
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="mx-auto">
        <table className="table table-bordered table-hover table-sm">
          {appointments.map(appointment => {
            if (appointment.userID ===  userID) {
              return (
                <>
                <div>
                    <strong>
                        <h2>Appointment Date:   {appointment.nextAptDate}</h2>  
                    </strong>
                    <button onClick={e => handleDelete(appointment.id)}>Delete</button>
                </div>
                <tbody className="table-sm">
                <tr>
                    <td><th>Car Model:</th></td>
                    <td>{appointment.carModel}</td>
                </tr>
                <tr>
                    <td><th>Maintenance Type:</th></td>
                    <td>{appointment.maintenanceType}</td>
                </tr>
                <tr>
                    <td><th>Auto Shop:</th></td>
                    <td>{appointment.autoShop}</td>
                </tr>
                <tr>
                    <td><th>Last appointment:</th></td>
                    <td>{appointment.lastAptDate}</td>
                </tr>
                <tr>
                    <td><th>Upcoming appointment:</th></td>
                    <td>{appointment.nextAptDate}</td>
                </tr>
                </tbody>
                </>
                );
            }
            })}
        </table>
        </div>
      );
}

export default AppointmentTable;
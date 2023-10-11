const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AppointmentModel = require('./models/appointments');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://seanlewis0316:stj3jPFFDrjVTiZ@slewis0316.zwe7mxs.mongodb.net/carMaintenanceApp?retryWrites=true&w=majority");

// fetch appointments
app.get("/getAppointments", (req, res) => {
    AppointmentModel.find({}).then(function(appointments) {
        res.json(appointments);
    }).catch(function(err) {
        res.json(err);
    })
})

// fetch appointment by id
app.get("/getAppointmentByID/:id", async (req,res) => {
    AppointmentModel.findById(req.params.id).then(function(appointments) {
        res.json(appointments);     
    }).catch(function(err) {
        res.json(err);
    })
})

// add new appointment
app.post("/createAppointment", async (req, res) => {
    const appointment = req.body;
    const newAppointment = new AppointmentModel(appointment);
    await newAppointment.save();
    res.json(appointment);
})

// delete given an id 
app.delete("/deleteAppointment/:id", async (req, res) => {
    try {
        //let id = req.params.id;
        //await AppointmentModel.findByIdAndDelete(req.body.id);
        console.log(req.params);
        await AppointmentModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, msg: 'Appointment deleted'});
    }
    catch(err) {
        console.error(err);
    }
})

// update given and id
app.post("/updateAppointment/", async (req, res) => {
    try {
        const {id, carModel, maintenanceType, autoShop, lastAptDate, nextAptDate, userID} = req.body;

        const updatedDocument = await AppointmentModel.findByIdAndUpdate(id, {carModel, maintenanceType, autoShop, lastAptDate, nextAptDate, userID},
            {new: true}); 
             
        return res.json(updatedDocument);       
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Error updating document' });
    }
})

app.listen(3002, () => {
    console.log("Server is running")
})

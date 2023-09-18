const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AppointmentModel = require('./models/appointments');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://seanlewis0316:stj3jPFFDrjVTiZ@slewis0316.zwe7mxs.mongodb.net/carMaintenanceApp?retryWrites=true&w=majority");

app.get("/getAppointments", (req, res) => {
    AppointmentModel.find({}).then(function(appointments) {
        res.json(appointments);
    }).catch(function(err) {
        res.json(err);
    })
})

app.post("/createAppointment", async (req, res) => {
    const appointment = req.body;
    const newAppointment = new AppointmentModel(appointment);
    await newAppointment.save();
    res.json(appointment);
})

app.delete("/deleteAppointment/", async (req, res) => {
    try {
        //let id = req.params.id;
        await AppointmentModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({ success: true, msg: 'Appointment deleted'});
    }
    catch(err) {
        console.error(err);
    }
})

/*app.patch("/updateAppointment", (req, res) => {
    App
}) */

app.listen(3002, () => {
    console.log("Server is running")
})

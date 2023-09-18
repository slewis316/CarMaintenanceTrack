const mongoose = require('mongoose');

// schema for appointments
const AppointmentSchema = new mongoose.Schema({
    carModel: {
        type: String,
        required: true,
    },
    maintenanceType: {
        type: String,
        required: true
    },
    autoShop: {
        type: String,
        required: true
    },
    lastAptDate: {
        type: String,
        required: true
    },
    nextAptDate: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    }
});

const AppointmentModel = mongoose.model("appointments", AppointmentSchema);
module.exports = AppointmentModel;
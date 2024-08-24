import { updateData } from "../database/mongoConnection.js";

async function healthController(req, res) {
    const { heartRate, oxygenSaturation } = req.body;
    const email = req.session.email;

    if (!email) {
        req.session.error = 'Unauthorized access. Please register first.';
        return res.redirect('/register');
    }

    const updateFields = {};
    if (heartRate) {
        updateFields['healthData.heartRate'] = parseFloat(heartRate);
    }
    if (oxygenSaturation) {
        updateFields['healthData.oxygenSaturation'] = parseFloat(oxygenSaturation);
    }

    if (Object.keys(updateFields).length > 0) {
        await updateData('users', { email }, updateFields);
        req.session.success = 'Health data saved successfully!';
        req.session.destroy();
        return res.redirect('/checkinghealth');
    } else {
        req.session.error = 'No valid health data provided!';
    }
}

export default healthController;
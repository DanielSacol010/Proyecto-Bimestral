import User from "./user.model.js"
import { hash } from "argon2"

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
        
        
    } catch (err) {
        return res.status(500).json({
            message: "User creation failed",
            error: err.message
        });
    }
}

export const modifyRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;

        const user = await User.findByIdAndUpdate(uid, { role }, { new: true });

        return res.status(200).json({
            message: "User role has been modified",
            user
        });
        
    } catch (err) {
        return res.status(500).json({
            message: "User role modification failed",
            error: err.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            message: "User has been updated",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "User update failed",
            error: err.message
        });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            message: "User has been deleted",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "User deletion failed",
            error: err.message
        });
    }
}

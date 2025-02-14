import User from "./user.model.js"
import { hash, verify } from "argon2"

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

export const updateUserAdmin = async (req, res) => {
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

export const updateUserClient = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        const user = await User.findByIdAndUpdate(usuario._id,  data, { new: true });

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

export const updatePassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword } = req.body;

        const user = await User.findById(usuario._id);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password updated",
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            
            success: false,
            message: "Error updating password",
            error: err.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { usuario } = req;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const user = await User.findById(usuario._id);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Profile picture updated',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};

export const deleteUserClient = async (req, resk) => {
    try{
        const { usuario } = req;
        const user = await User.findByIdAndUpdate(usuario._id, { status: false }, { new: true });

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

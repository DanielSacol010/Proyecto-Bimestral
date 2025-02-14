import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("User not found")
    }
}

export const isClientRole = async (uid = " ") => {
    const user = await User.findById(uid)
    if(!user){
        throw new Error("User not found")
    }
    if(user.role !== "CLIENT"){
        throw new Error("Can only modify users with CLIENT role")
    }
}
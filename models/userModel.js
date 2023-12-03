import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    },
    privilegios: [{
        type: String,
        required: true,
        default: "Cliente",
        enum: ["Cliente", "Acompanhante", "Anunciante", "Administrador"]
    }]
});

const User = mongoose.model("Users", userSchema);

export default User;
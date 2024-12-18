import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    orgId: { type: String, required: true },
    accessToken: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
    scope: { type: String, required: true },
}, {
    timestamps: true // createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;
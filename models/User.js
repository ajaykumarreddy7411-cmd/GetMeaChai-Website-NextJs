import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true},
    username: { type: String, required: true},
    profilepic: { type: String },
    coverpic: { type: String},
    razorpayid:{ type: String },
    razorpaysecret:{ type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
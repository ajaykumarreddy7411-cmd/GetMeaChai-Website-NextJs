"use server"

import Razorpay from "razorpay"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import Payment from "@/models/Payment"

// initiate payment and return order object basically creating the order id
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    let user = await User.findOne({ username: to_username })
    let secret = user?.razorpaysecret

    let instance = new Razorpay({
        key_id: user?.razorpayid,
        key_secret: secret,
    })

    var options = {
        amount: Number.parseInt(amount) * 100,  // amount in the smallest currency unit
        currency: "INR",
    }
    let order = await instance.orders.create(options)

    if (!order) return null

    const payment = new Payment({
        name: paymentform.name,
        to_username: to_username,
        oid: order.id,
        message: paymentform.description,
        amount: Number.parseInt(amount),
    })

    await payment.save()

    return order
}

export const fetchUser = async (username) => {

    await connectDb()
    let u = await User.findOne({ username: username }).lean()
    if (!u) return null
    u._id = u._id.toString();
    return u
}

export const fetchPayments = async (username) => {
    await connectDb()
    let payments = await Payment.find({ to_username: username, status: true }).sort({ amount: -1 }).lean()
    payments = payments.map(p => ({ ...p, _id: p._id.toString() }));
    if (!payments) return []
    return payments
}

//this is for the dashboard page with action handler 

// export const updateProfile = async (profiledata, oldusername) => {
//     await connectDb()
//     //to convert into a iterable format
//     // const formData = new FormData(profiledata)

//     let ndata = Object.fromEntries(profiledata)


//     if (oldusername !== ndata.username) {

//         let user = await User.findOne({ username: ndata.username })
//         if (user) return { success: false, message: "User already exist" }
//         //updating username in payments collection also
//         await User.updateOne({ email: ndata.email }, ndata,)

//         await Payment.updateMany({ to_username: oldusername }, { to_username: ndata.username })

//     }
//     await User.updateOne({ email: ndata.email }, ndata)
//     return { success: true, message: "Profile updated successfully" }

// }

//this is for the dashboard page with onSubmit handler 
export const updateProfile = async (profiledata, oldusername) => {
    await connectDb();

    const ndata = profiledata; // <-- just use the object directly

    if (oldusername !== ndata.username) {
        // Check if the new username already exists
        let user = await User.findOne({ username: ndata.username });
        if (user) return { success: false, message: "User already exists" };

        // Update username in payments collection as well
        await Payment.updateMany({ to_username: oldusername }, { to_username: ndata.username });
    }

    // Update user profile
    await User.updateOne({ email: ndata.email }, ndata);

    return { success: true, message: "Profile updated successfully" };
}

// fetch all users from the database
export const fetchAllUser = async () => {
    await connectDb()
    let users = await User.find().lean()
    if (!users) return null

    // Convert ObjectId to string for each user
    users = users.map(user => ({
        ...user,
        _id: user._id.toString()
    }))

    return users
}

import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function POST(request) {
    await connectDb()
    
    try {
        const formData = await request.formData();
        const res = Object.fromEntries(formData); // convert to JS object
       

        let p = await Payment.findOne({ oid: res.razorpay_order_id })
        if (!p) {
            return NextResponse.json({ success: false, message: "Order id not found" }, { status: 404 });
        }
         let user=await User.findOne({username:p.to_username})
        let secret=user?.razorpaysecret
        const isAuthentic = validatePaymentVerification({
            order_id: res.razorpay_order_id,
            payment_id: res.razorpay_payment_id,
        }, res.razorpay_signature, secret)


        if (isAuthentic) {
            // database comes here
            //we are updating payment status to true once the payment is successfully done
            let updatePayment = await Payment.findOneAndUpdate({ oid: res.razorpay_order_id }, { status: true }, { new: true })
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_username}?paymentSuccess=true`)



            // let user = await User.findOne({ name: payment.to_username })
            // user.income += payment.amount
            // await user.save()

        }
        else {
            return NextResponse.json({ success: false, message: "Payment not authentic" })
        }
    } catch (err) {

        console.log(err)
        return NextResponse.json({ success: false, message: "Internal Server Error" })
    }
}
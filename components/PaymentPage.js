"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Script from "next/script"
import { useRouter, useSearchParams } from "next/navigation"
import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { initiate, fetchUser, fetchPayments } from "@/actions/useractions"

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: "", description: "", amount: "" })
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getData()
    if (searchParams.get("paymentSuccess") === "true") {
      toast.success("✅ Payment done successfully!!", { theme: "light", transition: Bounce })
      router.replace(`/${username}`) // remove query params
    }
  }, [])

  const getData = async () => {
    const u = await fetchUser(username)
    setcurrentUser(u)
    const dbpayments = await fetchPayments(username)
    setPayments(dbpayments)
  }

  function handleChange(e) {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const pay = async (amount) => {
    if (amount <= 0) {
      toast.error("❌ Amount should be greater than zero", { theme: "light", transition: Bounce })
      return
    }
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    const options = {
      key: currentUser.razorpayid,
      amount: amount * 100,
      currency: "INR",
      name: "Get Me a Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@gmail.com",
        contact: "9999999999",
      },
      notes: { address: "Razorpay Corporate Office" },
      theme: { color: "#3399cc" },
    }
    const rzp1 = new Razorpay(options)
    rzp1.open()
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {/* Cover + Profile Section */}
      <div className="relative w-full h-60 md:h-72">
        <Image src={currentUser?.coverpic || "/avatar.jpg"} alt="Cover img" fill className="object-cover" />
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 relative">
            <Image
              src={currentUser?.profilepic || "/avatar.gif"}
              alt="User profile"
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="text-center mt-16 space-y-3">
        <h1 className="font-bold text-2xl md:text-3xl">@{username}</h1>
        <p className="text-gray-500">Let’s help each other grow by sharing a chai ☕</p>
        <div className="text-gray-600 text-sm md:text-base">
          <p>{currentUser?.razorpayid ? "✅ Ready to receive payments" : "⚠️ User not ready to receive payments"}</p>
          <p>
            {payments.length} Payments • ₹
            {payments.reduce((total, payment) => total + Number(payment.amount), 0)} Raised
          </p>
        </div>
      </div>

      {/* Payment + Supporters */}
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
        {/* Supporters Card */}
        <div className="bg-gray-300 rounded-2xl shadow-md p-6 overflow-y-auto max-h-[28rem]">
          <h2 className="text-xl font-semibold mb-4 text-black">Supporters</h2>
          <ul className="space-y-3">
            {payments.length === 0 ? (
              <p className="text-gray-500 text-sm">No supporters yet. Be the first one!</p>
            ) : (
              payments.map((p) => (
                <li key={p._id} className="flex items-start gap-3">
                  <img src="/avatar.gif" alt="Supporter" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">{p.name}</span> donated <span className="font-semibold">₹{p.amount}</span>{" "}
                    <br />
                    <span className="text-gray-500 italic">“{p.message}”</span>
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Payment Card */}
        <div className="bg-gray-300 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Make a Payment</h2>
          <div className="space-y-4 text-black">
            <input
              onChange={handleChange}
              name="name"
              value={paymentform.name}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              onChange={handleChange}
              name="description"
              value={paymentform.description}
              type="text"
              placeholder="Message"
              className="w-full px-4 py-2 rounded-lg border border-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              onChange={handleChange}
              name="amount"
              value={paymentform.amount}
              type="number"
              placeholder="Custom Amount (₹)"
              className="w-full px-4 py-2 rounded-lg border border-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              onClick={() => pay(paymentform.amount)}
              disabled={
                paymentform.name.length < 3 ||
                paymentform.description.length < 4 ||
                paymentform.amount.length < 1 ||
                !currentUser.razorpayid
              }
              className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay
            </button>
            <div className="flex gap-3 flex-wrap mt-2">
              {[5, 10, 20, 50].map((amt) => (
                <button
                  key={amt}
                  onClick={() => pay(amt)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-indigo-100 transition"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage

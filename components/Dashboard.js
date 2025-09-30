"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { updateProfile, fetchUser } from "@/actions/useractions"
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else {
      getData()
    }
  }, [session, router])

  const getData = async () => {
    if (session?.user?.name) {
      const u = await fetchUser(session.user.name)
      setForm(u)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await updateProfile(form, session?.user?.name)
      if (!res.success) {
        toast.error(res.message, { theme: "light", transition: Bounce })
        return
      }
      await update({ name: form.username })
      toast.success("Profile updated successfully!", { theme: "light", transition: Bounce })
    } catch {
      toast.error("An unexpected error occurred.", { theme: "light", transition: Bounce })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/40 to-cyan-900/40 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Dashboard</h1>
            <p className="text-gray-300 mt-2">Update your profile and account settings</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Profile Details */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-300 mb-6">Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200">Name</label>
                  <input
                    value={form.name || ""}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-900/40 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200">Username</label>
                  <input
                    value={form.username || ""}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-900/40 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200">Email</label>
                  <input
                    value={form.email || ""}
                    type="email"
                    name="email"
                    disabled
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-800/40 text-gray-400 border border-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-300 mb-6">Branding</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200">Profile Picture URL</label>
                  <input
                    value={form.profilepic || ""}
                    onChange={handleChange}
                    type="text"
                    name="profilepic"
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-900/40 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                  <div className="mt-4 flex justify-center">
                    <img
                      src={form.profilepic || "https://dummyimage.com/100x100/e2e8f0/64748b&text=Profile"}
                      alt="Profile Preview"
                      className="h-24 w-24 rounded-full object-cover border-2 border-gray-700"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200">Cover Picture URL</label>
                  <input
                    value={form.coverpic || ""}
                    onChange={handleChange}
                    type="text"
                    name="coverpic"
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-900/40 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                  <div className="mt-4">
                    <img
                      src={form.coverpic || "https://dummyimage.com/800x200/e2e8f0/64748b&text=Cover+Image"}
                      alt="Cover Preview"
                      className="w-full h-32 rounded-lg object-cover border-2 border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Gateway */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-300 mb-6">Payment Gateway</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200">Razorpay ID</label>
                  <input
                    value={form.razorpayid || ""}
                    onChange={handleChange}
                    type="text"
                    name="razorpayid"
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-900/40 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200">Razorpay Secret</label>
                  <input
                    value={form.razorpaysecret || ""}
                    onChange={handleChange}
                    type="text"
                    name="razorpaysecret"
                    className="mt-2 block w-full rounded-lg px-4 py-2.5 bg-gray-900/40 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard

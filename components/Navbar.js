"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react"
import { useState, useRef } from 'react'

const Navbar = () => {
    const { data: session } = useSession()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    return (
        <nav className='bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
            <Link href={"/"} className='font-bold flex items-center gap-2'>
                <Image src={"/tea.gif"} className='invert' alt='Tea logo' width={40} height={40} />
                <span className='text-2xl'>GetMeAChai!</span>
            </Link>

            <div className='flex flex-col md:flex-row items-center gap-3 w-full md:w-auto'>
                {session ? (
                    <>
                        {/* Dropdown Trigger */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg text-white font-medium text-sm transition"
                            >
                                Welcome, {session.user.name || session.user.email}
                                <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-20 ${dropdownOpen ? 'block' : 'hidden'}`}
                            >
                                <ul className="py-1">
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${session?.user?.name}`}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false)
                                                signOut({ callbackUrl: "/login" })
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Logout Button (kept as per your original) */}
                        <button
                            onClick={() => signOut()}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition transform hover:scale-105">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
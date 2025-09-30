"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fetchAllUser } from "@/actions/useractions";

const Home = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            setLoading(true);
            try {
                const res = await fetchAllUser();
                const filtered = res.filter((user) =>
                    user.username.toLowerCase().includes(value.toLowerCase()) ||
                    (user.name && user.name.toLowerCase().includes(value.toLowerCase()))
                );
                setResults(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-cyan-900/10 flex flex-col justify-center items-center px-4 py-12">
            {/* Main Content */}
            <div className="max-w-4xl w-full text-center space-y-10">
                {/* Logo + Title */}
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Buy Me a Chai
                        </h1>
                        <div className="relative">
                            <Image
                                src="/tea.gif"
                                alt="Chai"
                                width={60}
                                height={60}
                                className="invert drop-shadow-lg"
                            />
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        A <span className="text-cyan-400 font-medium">crowdfunding platform</span> for creators.  
                        Get funded by your <span className="text-blue-400 font-medium">fans and followers</span>.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search for creators..."
                            className="w-full px-5 py-4 pl-12 text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 text-lg"
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="mt-3 flex items-center gap-2 text-cyan-300 text-sm">
                            <div className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
                            <span>Searching...</span>
                        </div>
                    )}

                    {/* Search Results */}
                    {results.length > 0 && (
                        <div className="absolute z-10 mt-2 w-full bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
                            {results.map((user) => (
                                <Link
                                    key={user._id}
                                    href={`/${user.username}`}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100/80 transition-colors"
                                    onClick={() => setQuery("")}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                                        {(user.name || user.username).charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">
                                            {user.name || user.username}
                                        </div>
                                        {user.name && user.username && (
                                            <div className="text-sm text-gray-500">@{user.username}</div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                            <div className="px-4 py-2 text-center text-sm text-gray-500 border-t border-gray-200">
                                {results.length} creator{results.length !== 1 ? 's' : ''} found
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/login">
                        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/about">
                        <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                            Learn More
                        </button>
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Trusted by Creators</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Simple & Fast</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
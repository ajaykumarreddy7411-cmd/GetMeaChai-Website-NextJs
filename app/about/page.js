import React from "react"

// Simple SVG Icon components for clarity and reusability
const CreatorIcon = () => (
    <svg className="w-12 h-12 mx-auto text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
);

const SupporterIcon = () => (
    <svg className="w-12 h-12 mx-auto text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);

const MissionIcon = () => (
    <svg className="w-12 h-12 mx-auto text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.721 19h8.558a2 2 0 001.99-1.839l-1.3-6.355a2 2 0 00-1.991-1.638H8.01a2 2 0 00-1.99 1.638l-1.3 6.355A2 2 0 007.721 19z" /></svg>
);


const About = () => {
    return (
        <div className=" min-h-screen px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center">
                    About Get me a Chai
                </h1>

                {/* Introduction Section */}
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                    <p className="text-lg text-white leading-relaxed">
                        <span className="text-cyan-400 font-medium">Get me a</span>  is a crowdfunding platform crafted for
                        creators, innovators, and dreamers. Whether you’re an artist, developer, writer, or
                        content creator — this is where your fans can fuel your passion directly.
                    </p>
                    <p className="text-lg text-white leading-relaxed">
                        Inspired by the warmth of platforms like <span className="italic">Buy Me a Coffee</span>,
                        we created a space where support feels as cozy as sharing a chai ☕.
                        Every small contribution pours big energy into creators’ journeys.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {/* Card 1: For Creators */}
                    <div className="bg-gray-200 rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                        <CreatorIcon />
                        <h2 className="text-2xl font-bold text-amber-900 mt-6 mb-3">For Creators</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Showcase your work, connect with your audience, and receive support effortlessly.
                            No complex setups — just your profile and your passion.
                        </p>
                    </div>

                    {/* Card 2: For Supporters */}
                    <div className="bg-gray-200 rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                        <SupporterIcon />
                        <h2 className="text-2xl font-bold text-amber-900 mt-6 mb-3">For Supporters</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Love someone’s work? Show it by buying them a chai! It’s a simple, joyful way to
                            cheer on your favorite creators and keep their creativity flowing.
                        </p>
                    </div>

                    {/* Card 3: Our Mission */}
                    <div className="bg-gray-200 rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                        <MissionIcon />
                        <h2 className="text-2xl font-bold text-amber-900 mt-6 mb-3">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To empower creators globally with a simple, transparent,
                            and delightful way to get funded by their community.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About

export const metadata = {
    title: "About - Get Me a Chai",
    description:
        "Get Me a Chai is a crowdfunding platform for creators. A simple way to get funded by your fans and followers. Start your journey today!",
}
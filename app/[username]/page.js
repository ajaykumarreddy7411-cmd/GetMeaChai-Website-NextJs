
import React from 'react'
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {
    const checkUser=async()=>{

        await connectDB()
        let user=await User.findOne({username: params.username})
        if(!user){
            return notFound()
        }
    }
    await checkUser()

    return (
        <>
            <PaymentPage username={params.username} />
            
        </>
    )
}

export default Username

export const dynamic = 'force-dynamic' // this is for ssr, to make sure that the page is not cached and is rendered on each request
// export const revalidate = 0; // this is for isr, to make sure that the page is not cached and is rendered on each request

export async function generateMetadata({ params }) {
    return {
        title: `Support ${params.username} - Fund their projects`,
        description: `Support ${params.username} by funding their projects. A crowdfunding platform for creaters. Get funded by your fans and followers. Start now!`,
    }
}

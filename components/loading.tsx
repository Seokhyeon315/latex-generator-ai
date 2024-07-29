'use client';

import React from "react"
import loadingAnimation from '@/loading.json'
import LottieLoader from 'react-lottie-loader';



export const Loading = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div className="flex flex-col gap-2">
            <div
                className={`items-center ${isLoading ? 'opacity-100' : 'opacity-0'}`}
            >
                <LottieLoader animationData={loadingAnimation} />
            </div>
        </div>
    )
}
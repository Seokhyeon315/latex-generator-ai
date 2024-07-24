'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */


import { useActions, useUIState } from 'ai/rsc'
import React from 'react'


interface ListFeildsProps {

}
// When user needs to narrow down 
export const ListFields = () => {
    return (
        <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
            <div>Math</div>
            <div>Science</div>
            <div>Engineering</div>
        </div>
    )

}
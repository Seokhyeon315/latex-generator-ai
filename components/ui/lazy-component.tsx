'use client';

import React, { Suspense } from 'react';
import { Loading } from '../loading';

interface LazyComponentProps {
    children: React.ReactNode;
}

export function LazyComponent({ children }: LazyComponentProps) {
    return (
        <Suspense fallback={<Loading isLoading={true} />}>
            {children}
        </Suspense>
    );
} 
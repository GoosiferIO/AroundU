/* Navigation */
import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex flex-row justify-center">
        <div className="flex w-full max-w-6xl items-center">
            <div>
                <Link href="/" className="text-black-500 font-bold">
                    AroundU
                </Link>
            </div>
            <div className="flex flex-row ml-auto">
                <Link href="/login" className="bg-blue-500 text-white rounded px-4">
                    Login
                </Link>
                <Link href="/register" className="px-4">
                    Register
                </Link>
            </div>
        </div>
    </div>
  );
}
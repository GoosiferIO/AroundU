'use client';

import Link from 'next/link';

type Category = 'All' | 'Concert' | 'Happy Hour' | 'Karaoke' | 'Yard Sale' | 'Other';

export default function Filter() {
    const categories: Category[] = ['All', 'Concert', 'Happy Hour', 'Karaoke', 'Yard Sale', 'Other'];

    const generateLink = (category: string) => {
        return `<Link href="/concert" className="ml-4 text-black-500 hover:text-blue-700 hover:border-blue-700 hover:border-b-2">/${category}</Link>`;
    }

    return (
        <div className="flex w-full max-w-6xl items-center h-16 px-4">
            {categories.map((category) => (
                <Link href={`/${category}`} className="ml-4 text-black-500 border-transparent border-b-2 hover:text-blue-700 hover:border-blue-700 hover:border-b-2">{category}</Link>
            ))}
        </div>
    );
}


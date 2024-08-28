'use client';

import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className='flex justify-center flex-col items-center bg-gray-600 text-white p-5'>
            <p style={{ fontSize: '14px' }}>&copy; 2024 Wearther. Made with
                <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 1.1,
                    }}
                    className="inline-block ml-1"
                >
                     ❤️
                </motion.span>
            </p>
            <p>Let&apos;s connect 🔗</p>
            <div className='flex gap-2'>
                <a href="https://www.linkedin.com/in/jamilurrahman96/">
                    <Image src="/linkedin.png" alt="LinkedIn Logo" width={20} height={20} />
                </a>
                <a href="https://github.com/jamil-rahman">
                    <Image src="/github.png" alt="GitHub Logo" width={20} height={20} />
                </a>
            </div>
        </footer>
    )
}

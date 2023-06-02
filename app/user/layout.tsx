'use client'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {data: session, status} = useSession();

  
  return (
    status === "loading" ? <></> :

    <div className='flex flex-col items-center h-auto min-h-full'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center h-auto min-h-full'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}
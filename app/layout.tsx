import type { Metadata } from 'next';
import './globals.css';
import './dashboard-preview.css';
export const metadata: Metadata = {title:'Nearfield — The missing relationship layer for your Mac.', description:'Connect the people, conversations, and commitments already on your Mac. Local relationship intelligence. No Nearfield cloud needed.',icons:{icon:'/nearfield.png'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}

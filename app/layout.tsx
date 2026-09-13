import type { Metadata } from 'next';
import './globals.css';
import './dashboard-preview.css';
import './product-features.css';
export const metadata: Metadata = {title:'Nearfield — All of your Mac data, in context.', description:'The missing relationship layer for your local data. No cloud required. Offline-ready.',icons:{icon:`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/nearfield.png`}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}

import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"Momentum_OS", description:"Build a life you can measure.", applicationName:"Momentum_OS", manifest:"/manifest.webmanifest", themeColor:"#050505", appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"Momentum_OS"} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }

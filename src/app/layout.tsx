import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Inter, Merriweather } from "next/font/google";
import './globals.css'

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});



export const metadata: Metadata = {
  title: 'SaaSKit — SaaS Starter Kit',
  description:
    'Multi-tenant SaaS starter kit built with Next.js, Clerk, Prisma, and Neon.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
          <ClerkProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
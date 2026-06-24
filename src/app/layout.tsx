import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClerkProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
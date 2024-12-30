import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Earthquake and Tsunami Prediction',
  description: 'Predictive analysis for seismic activity and tsunami risks',
  keywords: 'earthquake, tsunami, prediction, seismic activity, risk assessment',
  openGraph: {
    title: 'Earthquake and Tsunami Prediction',
    description: 'Predictive analysis for seismic activity and tsunami risks',
    url: 'https://earthquake-tsunami-prediction.vercel.app',
    siteName: 'Earthquake and Tsunami Prediction',
    images: [
      {
        url: 'https://earthquake-tsunami-prediction.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="bg-gradient-to-b from-[#3A9B9B] to-[#99D19C] text-dark-charcoal min-h-screen flex flex-col">
        <ErrorBoundary>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}


import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center mb-8 text-deep-ocean">
        Welcome to Earthquake and Tsunami Prediction
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl">
        <div className="space-y-6 text-center">
          <p className="text-xl text-dark-charcoal leading-relaxed">
            Our website provides cutting-edge predictive models for seismic activity and tsunami risks. 
            We use advanced algorithms and real-time data to offer insights that can help in disaster preparedness and risk assessment.
          </p>
          <p className="text-xl text-dark-charcoal leading-relaxed">
            Explore our prediction pages, interactive dashboard, and geospatial maps to gain a comprehensive understanding of potential seismic events and tsunami risks in various regions.
          </p>
        </div>
        <div className="relative h-96 md:h-full">
          <Image 
            src="/placeholder.svg"
            alt="Earthquake illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg object-cover shadow-xl border-4 border-dark-teal-blue hover:shadow-2xl transition-shadow duration-300"
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-8 justify-center">
        <Link 
          href="/predictions1" 
          className="bg-dark-teal-blue text-black hover:bg-soft-green transition-colors duration-200 font-semibold py-2 px-4 rounded-lg">
          Explore Predictions
        </Link>
        <Link 
          href="/dashboard" 
          className="bg-dark-teal-blue text-black hover:bg-soft-green transition-colors duration-200 font-semibold py-2 px-4 rounded-lg">
          View Dashboard
        </Link>
      </div>
    </div>
  )
}


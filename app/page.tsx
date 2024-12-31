import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center mb-8 text-deep-ocean">
        Welcome to Earthquake and Tsunami Information Center
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl">
        <div className="space-y-6 text-center">
          <p className="text-xl text-dark-charcoal leading-relaxed">
            Our website provides comprehensive information about seismic activity and tsunami risks. 
            We use advanced data visualization to offer insights that can help in disaster preparedness and risk assessment.
          </p>
          <p className="text-xl text-dark-charcoal leading-relaxed">
            Explore our interactive dashboard and geospatial maps to gain a comprehensive understanding of seismic events and tsunami risks in various regions.
          </p>
        </div>
      </div>
      <div className="flex space-x-4 mt-8 justify-center">
        <Link 
          href="/dashboard" 
          className="bg-dark-teal-blue text-black hover:bg-soft-green transition-colors duration-200 font-semibold py-2 px-4 rounded-lg">
          View Dashboard
        </Link>
        <Link 
          href="/maps" 
          className="bg-dark-teal-blue text-black hover:bg-soft-green transition-colors duration-200 font-semibold py-2 px-4 rounded-lg">
          Explore Maps
        </Link>
      </div>
    </div>
  )
}


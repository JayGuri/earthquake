'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicIframe = dynamic(() => import('../components/DynamicIframe'), {
  loading: () => <p>Loading map...</p>,
  ssr: false
})

export default function Maps() {
  const [seismicMapUrl] = useState('https://app.powerbi.com/view?r=eyJrIjoiYjZmNGFjMzUtNTBhNy00MGQ0LTljZjItY2ZhNmM1M2E3OWEwIiwidCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsImMiOjEwfQ%3D%3D')
  const [tsunamiMapUrl] = useState('https://app.powerbi.com/view?r=eyJrIjoiNjcxYThkZjEtY2NkZC00MmFhLTlmYzMtMDNiZDJlYmM0ZDE5IiwidCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsImMiOjEwfQ%3D%3D')

  return (
    <div className="space-y-12 bg-[#99D19C] p-8 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-deep-ocean text-center">Geospatial Maps</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-xl border-4 border-dark-teal-blue transition-all duration-300 hover:shadow-2xl hover:border-soft-green mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-deep-ocean">Seismic Activity Map</h2>
        <DynamicIframe src={seismicMapUrl} title="Seismic Activity Map" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl border-4 border-dark-teal-blue transition-all duration-300 hover:shadow-2xl hover:border-soft-green">
        <h2 className="text-2xl font-semibold mb-6 text-deep-ocean">Tsunami Risk Map</h2>
        <DynamicIframe src={tsunamiMapUrl} title="Tsunami Risk Map" />
      </div>
    </div>
  )
}


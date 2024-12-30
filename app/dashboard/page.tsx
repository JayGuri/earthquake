'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicIframe = dynamic(() => import('../components/DynamicIframe'), {
  loading: () => <p>Loading dashboard...</p>,
  ssr: false
})

export default function Dashboard() {
  const [powerBiUrl] = useState('https://app.powerbi.com/view?r=eyJrIjoiNmUwZmE5MTgtNTliNC00MjAwLWE3MTItZGNiNmU3YzgzZTZhIiwidCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsImMiOjEwfQ%3D%3D')

  return (
    <div className="space-y-8 bg-[#99D19C] p-8 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-deep-ocean text-center">Analysis Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-xl border-4 border-dark-teal-blue transition-all duration-300 hover:shadow-2xl hover:border-soft-green">
        <h2 className="text-2xl font-semibold mb-6 text-deep-ocean">Power BI Dashboard</h2>
        <DynamicIframe src={powerBiUrl} title="Power BI Dashboard" />
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'

export default function AlertPrediction() {
  const [prediction, setPrediction] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const features = [
      parseFloat(formData.get('magnitude') as string),
      parseFloat(formData.get('depth') as string),
      parseFloat(formData.get('latitude') as string),
      parseFloat(formData.get('longitude') as string),
    ]

    try {
      const response = await fetch('/api/predict-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const data = await response.json()
      setPrediction(data.prediction)
    } catch (error) {
      console.error('Error:', error)
      setPrediction('Error occurred during prediction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Earthquake Alert Prediction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="magnitude" className="block mb-1">Magnitude:</label>
          <input type="number" id="magnitude" name="magnitude" required step="0.1" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="depth" className="block mb-1">Depth (km):</label>
          <input type="number" id="depth" name="depth" required step="0.1" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="latitude" className="block mb-1">Latitude:</label>
          <input type="number" id="latitude" name="latitude" required step="0.000001" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="longitude" className="block mb-1">Longitude:</label>
          <input type="number" id="longitude" name="longitude" required step="0.000001" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
          {loading ? 'Predicting...' : 'Predict Alert'}
        </button>
      </form>
      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  )
}


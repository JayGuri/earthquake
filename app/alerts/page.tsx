'use client'

import { useState } from 'react'

export default function AlertPrediction() {
  const [prediction, setPrediction] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)
    setLogs(null)

    const formData = new FormData(event.currentTarget)
    const features = [
      parseFloat(formData.get('magnitude') as string),
      parseFloat(formData.get('depth') as string),
      parseFloat(formData.get('latitude') as string),
      parseFloat(formData.get('longitude') as string),
    ]

    try {
      console.log('Sending request with features:', features)
      const response = await fetch('/api/predict-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      setPrediction(data.prediction)
      setLogs(data.logs)
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getAlertLevel = (prediction: string) => {
    switch (prediction) {
      case '0':
        return 'Low'
      case '1':
        return 'Medium'
      case '2':
        return 'High'
      default:
        return 'Unknown'
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
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-xl font-semibold mb-2">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
          <p>Alert Level: {getAlertLevel(prediction)}</p>
        </div>
      )}
      {logs && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Prediction Logs:</h2>
          <pre className="whitespace-pre-wrap">{logs}</pre>
        </div>
      )}
    </div>
  )
}


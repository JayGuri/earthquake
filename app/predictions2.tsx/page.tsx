import PredictiveModel from '../components/PredictiveModel'

export default function Predictions2() {
  return (
    <div className="space-y-8 bg-[#99D19C] p-8 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-deep-ocean text-center">Tsunami Predictions</h1>
      <PredictiveModel 
        title="Tsunami Generation Probability" 
        description="This model estimates the likelihood of tsunami generation based on earthquake characteristics and oceanic conditions."
      />
      <PredictiveModel 
        title="Coastal Impact Assessment" 
        description="This model predicts potential coastal impacts of tsunamis, including wave heights and inundation areas."
      />
    </div>
  )
}


import PredictiveModel from '../components/PredictiveModel'

export default function Predictions1() {
  return (
    <div className="space-y-8 bg-[#99D19C] p-8 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-deep-ocean text-center">Earthquake Predictions</h1>
      <PredictiveModel 
        title="Short-term Earthquake Probability" 
        description="This model predicts the probability of an earthquake occurring in the next 7 days based on recent seismic activity and historical data."
      />
      <PredictiveModel 
        title="Long-term Seismic Risk Assessment" 
        description="This model evaluates the long-term seismic risk for different regions based on geological factors and historical earthquake data."
      />
    </div>
  )
}


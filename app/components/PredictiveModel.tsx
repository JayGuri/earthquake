import React from 'react';

interface PredictiveModelProps {
  title: string;
  description: string;
}

const PredictiveModel: React.FC<PredictiveModelProps> = React.memo(({ title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-dark-teal-blue transition-all duration-300 hover:shadow-xl hover:border-soft-green">
      <h2 className="text-3xl font-bold mb-4 text-deep-ocean">{title}</h2>
      <p className="mb-6 text-dark-charcoal text-lg leading-relaxed">{description}</p>
      <div className="bg-light-gray p-6 rounded-md border-2 border-soft-green">
        <p className="text-center text-teal-blue font-semibold text-lg">Predictive model visualization will be displayed here.</p>
      </div>
    </div>
  )
});

PredictiveModel.displayName = 'PredictiveModel';

export default PredictiveModel;


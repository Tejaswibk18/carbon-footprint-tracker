import React from 'react';

const references = [
  {
    title: 'Travel Emissions',
    formula:
      'Emissions = Distance (km) × Emission Factor (kg CO₂/km), varies by mode and fuel type',
    description:
      'Emission factors depend on travel mode and fuel type, e.g., car (petrol: 0.24, diesel: 0.27, EV: 0.05), bike (petrol: 0.1, diesel: 0.12, EV: 0), bus (diesel: 0.15, CNG: 0.12), train (0.05).',
    source: 'IPCC Report 2021, GHG Protocol',
  },
  {
    title: 'Food Emissions',
    formula: 'Emissions = (Veg Meals × 0.5) + (Non-Veg Meals × 2.0)',
    description:
      'Each veg meal emits ~0.5 kg CO₂, non-veg meal ~2.0 kg CO₂ on average.',
    source: 'Our World in Data - Food Emissions',
  },
  {
    title: 'Electricity Usage',
    formula: 'Emissions = Units Consumed (kWh) × 0.9 kg CO₂/kWh (only on 3rd day)',
    description:
      '0.9 kg CO₂/kWh is the average grid emission factor used; electricity input allowed only on the 3rd day of each month.',
    source: 'International Energy Agency (IEA)',
  },
  {
    title: 'Shopping Emissions',
    formula: 'Emissions = Shopping Amount (₹) × 0.03 kg CO₂ per 1 ₹ spent',
    description:
      'Emission factor reduced to reflect average carbon footprint per ₹ spent on consumer goods.',
    source: 'WWF Living Planet Report',
  },
  {
    title: 'Waste Emissions',
    formula: 'Emissions = Waste (kg) × 1.2 kg CO₂/kg',
    description:
      'Emission factor adjusted to 1.2 kg CO₂ per kg of waste, a common average emission factor.',
    source: 'EPA Greenhouse Gas Emissions Data',
  },
];

const Reference = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-700 text-center mb-10 tracking-wide">
          📘 Reference Information
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {references.map((ref, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-200"
            >
              <h2 className="text-2xl font-semibold mb-3 text-emerald-600">{ref.title}</h2>
              <p className="text-sm text-amber-500 font-mono mb-2">
                <strong>Formula:</strong>{" "}
                <code className="bg-emerald-50 px-2 py-1 rounded">{ref.formula}</code>
              </p>
              <p className="text-sm text-gray-700 mb-2">{ref.description}</p>
              <p className="text-xs text-gray-500 italic">Source: {ref.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reference;

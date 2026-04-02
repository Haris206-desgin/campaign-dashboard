import React, { useState } from 'react';

const Step2CampaignObjective = ({ data, updateData, onNext, onPrev, onValidationChange }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!data.objective) {
      newErrors.objective = 'Please select a campaign goal';
    }
    
    if (!data.targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required';
    }
    
    if (!data.budget || data.budget <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    } else if (data.budget < 100) {
      newErrors.budget = 'Budget must be at least $100';
    }
    
    setErrors(newErrors);
    
    if (onValidationChange) {
      onValidationChange(Object.keys(newErrors).length === 0);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleFieldChange = (field, value) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const objectives = [
    { value: 'awareness', label: 'Awareness', description: 'Increase brand visibility and reach' },
    { value: 'consideration', label: 'Consideration', description: 'Drive engagement and consideration' },
    { value: 'conversion', label: 'Conversion', description: 'Generate leads and sales' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Campaign Objective</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Campaign Goal <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {objectives.map((obj) => (
              <button
                key={obj.value}
                onClick={() => handleFieldChange('objective', obj.value)}
                className={`p-4 text-left rounded-lg border transition-all ${
                  data.objective === obj.value
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-600'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{obj.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{obj.description}</p>
              </button>
            ))}
          </div>
          {errors.objective && (
            <p className="mt-2 text-sm text-red-500">{errors.objective}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Audience <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.targetAudience}
            onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.targetAudience ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="Describe your target audience (demographics, interests, behaviors)"
          />
          {errors.targetAudience && (
            <p className="mt-1 text-sm text-red-500">{errors.targetAudience}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget (USD) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={data.budget}
            onChange={(e) => handleFieldChange('budget', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.budget ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="Enter campaign budget"
            min="100"
            step="100"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Minimum budget: $100</p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2CampaignObjective;
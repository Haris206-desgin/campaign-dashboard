import React, { useState } from 'react';

const Step1ClientDetails = ({ data, updateData, onNext, onValidationChange }) => {
  const [competitorInput, setCompetitorInput] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = 'Client name is required';
    }
    
    if (!data.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }
    
    setErrors(newErrors);
    
    // Notify parent component about validation status
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
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addCompetitor = () => {
    if (competitorInput.trim()) {
      updateData({ competitors: [...data.competitors, competitorInput.trim()] });
      setCompetitorInput('');
    }
  };

  const removeCompetitor = (index) => {
    updateData({ competitors: data.competitors.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Client Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="Enter client name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.industry}
            onChange={(e) => handleFieldChange('industry', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.industry ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="e.g., Technology, Healthcare, Retail"
          />
          {errors.industry && (
            <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Competitors
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={competitorInput}
              onChange={(e) => setCompetitorInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter competitor name"
              onKeyPress={(e) => e.key === 'Enter' && addCompetitor()}
            />
            <button
              onClick={addCompetitor}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.competitors.map((competitor, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm"
              >
                {competitor}
                <button
                  onClick={() => removeCompetitor(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1ClientDetails;
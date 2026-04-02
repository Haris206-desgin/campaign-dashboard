import React, { useEffect, useState, useCallback } from 'react';

const Step4ReviewSubmit = ({ formData, onSubmit, loading, onPrev, onValidationChange }) => {
  const [isValid, setIsValid] = useState(false);

  // 1. Memoized validation function to satisfy ESLint dependency rules
  const validateForm = useCallback(() => {
    // Check if all required fields are filled
    const isClientValid = formData.clientDetails.name.trim() !== '' && 
                          formData.clientDetails.industry.trim() !== '';
    
    const isCampaignValid = formData.campaignObjective.objective !== '' && 
                            formData.campaignObjective.targetAudience.trim() !== '' &&
                            formData.campaignObjective.budget > 0;
    
    const isCreativeValid = formData.creativePreferences.tone !== '' &&
                            formData.creativePreferences.imageryStyle.trim() !== '' &&
                            formData.creativePreferences.colorDirection.trim() !== '';
    
    const valid = isClientValid && isCampaignValid && isCreativeValid;
    setIsValid(valid);
    
    if (onValidationChange) {
      onValidationChange(valid);
    }
    
    return valid;
  }, [formData, onValidationChange]);

  // 2. Trigger validation when the component mounts or formData changes
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const MissingFieldsWarning = () => {
    const missingFields = [];
    
    if (!formData.clientDetails.name.trim()) missingFields.push('Client Name');
    if (!formData.clientDetails.industry.trim()) missingFields.push('Industry');
    if (!formData.campaignObjective.objective) missingFields.push('Campaign Goal');
    if (!formData.campaignObjective.targetAudience.trim()) missingFields.push('Target Audience');
    if (!formData.campaignObjective.budget) missingFields.push('Budget');
    if (!formData.creativePreferences.tone) missingFields.push('Tone of Voice');
    if (!formData.creativePreferences.imageryStyle.trim()) missingFields.push('Imagery Style');
    if (!formData.creativePreferences.colorDirection.trim()) missingFields.push('Color Direction');
    
    if (missingFields.length === 0) return null;
    
    return (
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
          ⚠️ Missing Required Fields
        </h4>
        <p className="text-sm text-yellow-700 dark:text-yellow-500 mb-2">
          Please complete the following fields before submitting:
        </p>
        <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-500">
          {missingFields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Review & Submit</h2>
      
      <MissingFieldsWarning />
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Client Details</h3>
          <p><strong>Name:</strong> {formData.clientDetails.name || 'Not provided'}</p>
          <p><strong>Industry:</strong> {formData.clientDetails.industry || 'Not provided'}</p>
          <p><strong>Website:</strong> {formData.clientDetails.website || 'Not provided'}</p>
          <p><strong>Competitors:</strong> {formData.clientDetails.competitors.join(', ') || 'None'}</p>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Campaign Objective</h3>
          <p><strong>Goal:</strong> {formData.campaignObjective.objective || 'Not provided'}</p>
          <p><strong>Target Audience:</strong> {formData.campaignObjective.targetAudience || 'Not provided'}</p>
          <p><strong>Budget:</strong> {formData.campaignObjective.budget ? `$${parseInt(formData.campaignObjective.budget).toLocaleString()}` : 'Not provided'}</p>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Creative Preferences</h3>
          <p><strong>Tone:</strong> {formData.creativePreferences.tone || 'Not provided'}</p>
          <p><strong>Imagery Style:</strong> {formData.creativePreferences.imageryStyle || 'Not provided'}</p>
          <p><strong>Color Direction:</strong> {formData.creativePreferences.colorDirection || 'Not provided'}</p>
          <p><strong>Do's:</strong> {formData.creativePreferences.dos.join(', ') || 'None'}</p>
          <p><strong>Don'ts:</strong> {formData.creativePreferences.donts.join(', ') || 'None'}</p>
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={onPrev} className="btn-secondary">
            Previous
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !isValid}
            className="btn-primary py-3 px-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating AI Brief...
              </div>
            ) : (
              'Generate AI Creative Brief'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4ReviewSubmit;

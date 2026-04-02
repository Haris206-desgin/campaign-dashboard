import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Step1ClientDetails from '../components/brief-builder/Step1ClientDetails';
import Step2CampaignObjective from '../components/brief-builder/Step2CampaignObjective';
import Step3CreativePreferences from '../components/brief-builder/Step3CreativePreferences';
import Step4ReviewSubmit from '../components/brief-builder/Step4ReviewSubmit';
import AIOutputDisplay from '../components/brief-builder/AIOutputDisplay';

const BriefBuilder = () => {
  const [step, setStep] = useState(1);
  const [stepValid, setStepValid] = useState(false);
  const [formData, setFormData] = useState({
    clientDetails: {
      name: '',
      industry: '',
      website: '',
      competitors: []
    },
    campaignObjective: {
      objective: '',
      targetAudience: '',
      budget: ''
    },
    creativePreferences: {
      tone: '',
      imageryStyle: '',
      colorDirection: '',
      dos: [],
      donts: []
    }
  });
  const [aiOutput, setAiOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleNextStep = () => {
    if (stepValid) {
      setStep(step + 1);
      setStepValid(false); // Reset validation for next step
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setStepValid(false);
  };

  const handleSubmitToAI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate all fields before submitting
      const isClientValid = formData.clientDetails.name.trim() !== '' && 
                            formData.clientDetails.industry.trim() !== '';
      
      const isCampaignValid = formData.campaignObjective.objective !== '' && 
                              formData.campaignObjective.targetAudience.trim() !== '' &&
                              formData.campaignObjective.budget > 0;
      
      const isCreativeValid = formData.creativePreferences.tone !== '' &&
                              formData.creativePreferences.imageryStyle.trim() !== '' &&
                              formData.creativePreferences.colorDirection.trim() !== '';
      
      if (!isClientValid || !isCampaignValid || !isCreativeValid) {
        throw new Error('Please fill in all required fields before generating the brief');
      }
      
      // Simulate AI API call (replace with actual API call)
      setTimeout(() => {
        const mockAIResponse = {
          campaignTitle: `${formData.clientDetails.name} ${formData.campaignObjective.objective} Campaign`,
          headlines: [
            `Transform Your ${formData.clientDetails.industry} Experience`,
            `Discover the Future of ${formData.clientDetails.industry}`,
            `Elevate Your ${formData.clientDetails.industry} Journey`
          ],
          toneOfVoice: formData.creativePreferences.tone || 'Professional and engaging',
          channels: [
            { name: 'Social Media', allocation: 40 },
            { name: 'Search Ads', allocation: 30 },
            { name: 'Display Ads', allocation: 20 },
            { name: 'Email Marketing', allocation: 10 }
          ],
          visualDirection: `A hero image featuring ${formData.creativePreferences.imageryStyle} style with ${formData.creativePreferences.colorDirection} color palette, emphasizing ${formData.clientDetails.name}'s core values.`
        };
        setAiOutput(mockAIResponse);
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const getStepValidation = (isValid) => {
    setStepValid(isValid);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Step1ClientDetails 
            data={formData.clientDetails} 
            updateData={(data) => updateFormData('clientDetails', data)}
            onNext={handleNextStep}
            onValidationChange={getStepValidation}
          />
        );
      case 2:
        return (
          <Step2CampaignObjective 
            data={formData.campaignObjective} 
            updateData={(data) => updateFormData('campaignObjective', data)}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onValidationChange={getStepValidation}
          />
        );
      case 3:
        return (
          <Step3CreativePreferences 
            data={formData.creativePreferences} 
            updateData={(data) => updateFormData('creativePreferences', data)}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onValidationChange={getStepValidation}
          />
        );
      case 4:
        return (
          <Step4ReviewSubmit 
            formData={formData}
            onSubmit={handleSubmitToAI}
            onPrev={handlePrevStep}
            loading={loading}
            onValidationChange={getStepValidation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Assisted Creative Brief Builder</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Fill in the details below and let AI generate a comprehensive creative brief</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {!aiOutput ? (
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex-1 text-center">
                    <div className={`relative ${stepNumber > 1 ? 'ml-4' : ''}`}>
                      <div className={`h-2 ${step >= stepNumber ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'} rounded-full`} />
                      <div className={`w-8 h-8 mx-auto mt-2 rounded-full flex items-center justify-center text-sm font-semibold
                        ${step > stepNumber ? 'bg-primary-600 text-white' : 
                          step === stepNumber ? 'bg-primary-600 text-white ring-4 ring-primary-200 dark:ring-primary-900' : 
                          'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {stepNumber}
                      </div>
                      <p className={`text-xs mt-2 ${step >= stepNumber ? 'text-primary-600' : 'text-gray-500'}`}>
                        {stepNumber === 1 && 'Client Details'}
                        {stepNumber === 2 && 'Objective'}
                        {stepNumber === 3 && 'Creative'}
                        {stepNumber === 4 && 'Review'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderStep()}
          </div>
        ) : (
          <AIOutputDisplay output={aiOutput} />
        )}
      </div>
    </Layout>
  );
};

export default BriefBuilder;
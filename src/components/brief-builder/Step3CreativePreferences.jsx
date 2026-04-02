import React, { useState } from 'react';

const Step3CreativePreferences = ({ data, updateData, onNext, onPrev, onValidationChange }) => {
  const [doInput, setDoInput] = useState('');
  const [dontInput, setDontInput] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!data.tone) {
      newErrors.tone = 'Please select a tone of voice';
    }
    
    if (!data.imageryStyle.trim()) {
      newErrors.imageryStyle = 'Imagery style is required';
    }
    
    if (!data.colorDirection.trim()) {
      newErrors.colorDirection = 'Color direction is required';
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

  const addItem = (type, value) => {
    if (value.trim()) {
      updateData({ [type]: [...data[type], value.trim()] });
      if (type === 'dos') setDoInput('');
      else setDontInput('');
    }
  };

  const removeItem = (type, index) => {
    updateData({ [type]: data[type].filter((_, i) => i !== index) });
  };

  const tones = ['Professional', 'Playful', 'Emotional', 'Inspirational', 'Humorous', 'Authoritative'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Creative Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tone of Voice <span className="text-red-500">*</span>
          </label>
          <select
            value={data.tone}
            onChange={(e) => handleFieldChange('tone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.tone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <option value="">Select tone</option>
            {tones.map(tone => (
              <option key={tone} value={tone.toLowerCase()}>{tone}</option>
            ))}
          </select>
          {errors.tone && (
            <p className="mt-1 text-sm text-red-500">{errors.tone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Imagery Style <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.imageryStyle}
            onChange={(e) => handleFieldChange('imageryStyle', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.imageryStyle ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="e.g., Minimalist, Vibrant, Corporate, Lifestyle"
          />
          {errors.imageryStyle && (
            <p className="mt-1 text-sm text-red-500">{errors.imageryStyle}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color Direction <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.colorDirection}
            onChange={(e) => handleFieldChange('colorDirection', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${errors.colorDirection ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="e.g., Blue tones with accent of gold, Earthy colors"
          />
          {errors.colorDirection && (
            <p className="mt-1 text-sm text-red-500">{errors.colorDirection}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Do's
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={doInput}
              onChange={(e) => setDoInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="What should we include?"
              onKeyPress={(e) => e.key === 'Enter' && addItem('dos', doInput)}
            />
            <button
              onClick={() => addItem('dos', doInput)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.dos.map((item, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm">
                ✓ {item}
                <button onClick={() => removeItem('dos', index)} className="ml-2 text-green-600 hover:text-green-800">×</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Don'ts
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={dontInput}
              onChange={(e) => setDontInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="What should we avoid?"
              onKeyPress={(e) => e.key === 'Enter' && addItem('donts', dontInput)}
            />
            <button
              onClick={() => addItem('donts', dontInput)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.donts.map((item, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm">
                ✗ {item}
                <button onClick={() => removeItem('donts', index)} className="ml-2 text-red-600 hover:text-red-800">×</button>
              </span>
            ))}
          </div>
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

export default Step3CreativePreferences;
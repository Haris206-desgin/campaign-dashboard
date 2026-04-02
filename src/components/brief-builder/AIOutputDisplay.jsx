import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AIOutputDisplay = ({ output }) => {
  const exportToPDF = async () => {
    const element = document.getElementById('ai-output-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save('creative-brief.pdf');
  };

  return (
    <div className="space-y-6">
      <div id="ai-output-content" className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Creative Brief</h1>
          <p className="text-gray-600 mt-2">AI-Generated Campaign Direction</p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{output.campaignTitle}</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Headline Options:</h3>
              <ul className="list-disc list-inside space-y-1">
                {output.headlines.map((headline, index) => (
                  <li key={index} className="text-gray-700">{headline}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tone of Voice Guide</h3>
            <p className="text-gray-700">{output.toneOfVoice}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Recommended Channels & Budget Allocation</h3>
            <div className="space-y-3">
              {output.channels.map((channel, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-32 text-gray-700">{channel.name}</span>
                  <div className="flex-1 ml-4">
                    <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-primary-600 h-full rounded-full"
                        style={{ width: `${channel.allocation}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-gray-700 font-semibold">{channel.allocation}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Key Visual Direction</h3>
            <p className="text-gray-700">{output.visualDirection}</p>
          </div>
        </div>
      </div>

      <button
        onClick={exportToPDF}
        className="btn-primary w-full py-3 text-lg"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default AIOutputDisplay;
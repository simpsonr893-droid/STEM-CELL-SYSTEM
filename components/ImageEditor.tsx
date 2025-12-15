import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }
    if (!prompt.trim()) {
      setError("Please describe how you want to edit the image.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await editImageWithGemini(selectedFile, prompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("Failed to generate image. Please try a different prompt.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrompt('');
    setGeneratedImage(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          AI Image Lab
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Powered by Gemini 2.5 Flash Image ("Nano Banana"). Upload a medical scan or facility photo and use simple text commands to visualize changes, enhance clarity, or simulate different conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 mr-3 text-sm font-bold">1</span>
              Upload Source Image
            </h3>
          </div>

          <div 
            className={`flex-grow border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-colors ${
              previewUrl ? 'border-teal-200 bg-teal-50/30' : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-[400px] w-auto max-w-full rounded-lg shadow-sm object-contain" 
                />
                <button 
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md text-slate-600 hover:text-red-500 hover:bg-white transition-colors"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 text-slate-400 mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline"
                  >
                    Upload a file
                  </button>
                  {' '}or drag and drop
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 mr-3 text-sm font-bold">2</span>
              Enter Edit Command
            </h3>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='e.g., "Highlight the fracture in red", "Add a futuristic lab background", "Make it look like a sketch"'
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 min-h-[100px] p-3 text-slate-700"
              />
              <div className="absolute bottom-3 right-3">
                <Sparkles size={16} className="text-teal-500 opacity-50" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading || !selectedFile || !prompt.trim()}
              className={`w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white shadow-md transition-all duration-200 ${
                loading || !selectedFile || !prompt.trim()
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Processing with Gemini 2.5...
                </>
              ) : (
                <>
                  Generate Edit
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </>
              )}
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-600 text-center bg-red-50 p-2 rounded-lg">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-3 text-sm font-bold">
                <Sparkles size={14} />
              </span>
              AI Result
            </h3>
          </div>

          <div className="flex-grow bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600 mb-4"></div>
                <p className="text-slate-500 font-medium">Analyzing pixels...</p>
                <p className="text-slate-400 text-sm mt-1">This usually takes 5-10 seconds</p>
              </div>
            ) : generatedImage ? (
              <div className="relative w-full h-full flex items-center justify-center group">
                 <img 
                  src={generatedImage} 
                  alt="AI Generated Result" 
                  className="max-h-[600px] w-auto max-w-full rounded-lg shadow-lg" 
                />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href={generatedImage} 
                    download="gemini-edit.png"
                    className="inline-flex items-center px-4 py-2 bg-white text-slate-800 rounded-lg shadow-lg font-medium text-sm hover:bg-slate-50"
                  >
                    Download Image
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center max-w-sm px-6">
                <div className="mx-auto h-20 w-20 text-slate-200 mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <ImageIcon size={40} />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-2">Ready to Create</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Upload an image on the left and describe your changes. The AI will generate a modified version here while preserving the essence of your original photo.
                </p>
              </div>
            )}
          </div>
          
          {generatedImage && (
             <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
               <p className="text-indigo-800 text-sm flex items-start">
                 <Sparkles size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                 Generated using Gemini 2.5 Flash Image. The results are creative interpretations and should be verified by professionals for medical accuracy.
               </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
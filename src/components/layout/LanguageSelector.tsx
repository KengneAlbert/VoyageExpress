import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { LANGUAGES } from '../../utils/constants';

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white bg-white/10 px-3 py-2 rounded-md hover:bg-white/20 transition-colors duration-200"
      >
        <Globe className="w-4 h-4" />
        <span>{selectedLang.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                selectedLang.code === lang.code ? 'bg-gray-50 text-orange-500' : 'text-gray-700'
              }`}
            >
              <span>{lang.name}</span>
              {selectedLang.code === lang.code && (
                <span className="text-orange-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
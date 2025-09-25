import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Globe } from "lucide-react";
import { LANGUAGES } from "../../utils/constants";

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (!isOpen) return;
    const updatePos = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        top: rect.bottom + 8,
        left: Math.min(rect.left, window.innerWidth - 240),
        width: rect.width,
      });
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inButton = !!buttonRef.current?.contains(target);
      const inPopup = !!popupRef.current?.contains(target);
      if (!inButton && !inPopup) setIsOpen(false);
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white bg-white/10 px-3 py-2 rounded-md hover:bg-white/20 transition-colors duration-200"
      >
        <Globe className="w-4 h-4" />
        <span>{selectedLang.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              minWidth: Math.max(192, pos.width),
            }}
            className="w-48 bg-white rounded-md shadow-lg py-1 z-[1100]"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                  selectedLang.code === lang.code
                    ? "bg-gray-50 text-orange-500"
                    : "text-gray-700"
                }`}
              >
                <span>{lang.name}</span>
                {selectedLang.code === lang.code && (
                  <span className="text-orange-500">✓</span>
                )}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default LanguageSelector;

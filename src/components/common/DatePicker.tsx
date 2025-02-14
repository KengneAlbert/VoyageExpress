import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { fr } from "date-fns/locale";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
  error?: string; // Ajout de la prop error
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      setPosition({
        top:
          spaceBelow > 400
            ? rect.bottom + window.scrollY + 8
            : rect.top + window.scrollY - 400 - 8,
        left: Math.min(rect.left + window.scrollX, window.innerWidth - 320),
      });
    }
  }, [isOpen]);

  return (
    <div className="space-y-1">
      <div className={`relative ${className}`}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Calendar className="h-5 w-5 text-orange-400" />
        </div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 bg-gray-800/50 border rounded-lg
                     text-white focus:outline-none focus:ring-2 
                     ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-orange-500'}`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 pl-1">
          {error}
        </p>
      )}
    </div>
  );
};

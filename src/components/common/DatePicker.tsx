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
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className,
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
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-2 bg-gray-800/50
                   border border-gray-700 rounded-lg text-gray-300
                   hover:border-orange-500/50 transition-all ${className}`}
      >
        <Calendar className="h-5 w-5 text-orange-400" />
        <span>
          {value
            ? format(new Date(value), "dd MMMM yyyy", { locale: fr })
            : "Sélectionner une date"}
        </span>
      </button>

      {isOpen &&
        createPortal(
          <AnimatePresence>
            <div className="fixed inset-0 z-50">
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                ref={calendarRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: "absolute",
                  top: position.top,
                  left: position.left,
                  width: 320,
                }}
                className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-[60]"
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <button
                    type="button"
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-2 hover:bg-gray-800 rounded-lg"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-400" />
                  </button>
                  <span className="text-white font-medium">
                    {format(currentDate, "MMMM yyyy", { locale: fr })}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-2 hover:bg-gray-800 rounded-lg"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-7 mb-2">
                    {["L", "M", "M", "J", "V", "S", "D"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm text-gray-500"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => {
                          onChange(
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              i + 1
                            ).toISOString()
                          );
                          setIsOpen(false);
                        }}
                        className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg"
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

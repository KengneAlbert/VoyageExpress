import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = "",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [openAbove, setOpenAbove] = useState(false);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // Get today's date for min validation
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Close calendar when clicking outside and update placement
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inTrigger = containerRef.current?.contains(target);
      const inPopup = popupRef.current?.contains(target);
      if (!inTrigger && !inPopup) setIsOpen(false);
    };

    const updatePlacement = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const estimatedHeight = popupRef.current?.offsetHeight ?? 360;
      const estimatedWidth = popupRef.current?.offsetWidth ?? 360;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenAbove(spaceBelow < estimatedHeight && spaceAbove > spaceBelow);
      const top =
        spaceBelow < estimatedHeight && spaceAbove > spaceBelow
          ? Math.max(8, rect.top - estimatedHeight - 8)
          : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 8);
      const left = Math.min(
        Math.max(8, rect.left),
        window.innerWidth - estimatedWidth - 8
      );
      setPopupPos({ top, left });
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      updatePlacement();
      window.addEventListener("resize", updatePlacement);
      window.addEventListener("scroll", updatePlacement, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [isOpen]);

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div ref={containerRef} className="relative space-y-1">
      <div className={`relative ${className}`}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <Calendar className="h-5 w-5 text-orange-400" />
        </div>
        <input
          type="text"
          value={formatDate(value)}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder="Sélectionner une date"
          className={`w-full h-[42px] pl-10 pr-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base cursor-pointer
                     ${
                       error
                         ? "border-red-500 focus:ring-red-500"
                         : "border-white/20 focus:ring-orange-400"
                     }
                     text-white hover:border-orange-400 transition-colors 
                     focus:outline-none focus:ring-2`}
        />
      </div>
      {error && <p className="text-sm text-red-500 pl-1">{error}</p>}

      {isOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={{
                position: "fixed",
                top: popupPos.top,
                left: popupPos.left,
              }}
              className={`z-[1000] bg-gray-900 rounded-xl shadow-2xl border border-gray-800/50 p-4 
                         w-[280px] sm:w-[340px] md:w-[360px]`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-400 hover:text-orange-400" />
                </button>
                <h3 className="text-white font-medium">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h3>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-400 hover:text-orange-400" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-400 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="h-8"></div>;
                  }

                  const isToday = day.toDateString() === today.toDateString();
                  const isSelected =
                    value && day.toISOString().split("T")[0] === value;
                  const isPast = day < today;
                  const isDisabled = isPast;

                  return (
                    <button
                      key={day.getDate()}
                      type="button"
                      onClick={() => !isDisabled && handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`h-8 w-8 text-sm rounded-lg flex items-center justify-center transition-colors
                      ${
                        isSelected
                          ? "bg-orange-500 text-white"
                          : isToday
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                          : isDisabled
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

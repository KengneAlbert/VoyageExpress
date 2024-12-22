import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, generateCalendarDays } from '../../../utils/formatDate';
import { CalendarGrid, CalendarHeader, DateButton } from './styles';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const days = generateCalendarDays(currentMonth);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 p-3 ${className}`}
      >
        <Calendar className="h-5 w-5 text-orange-400" />
        <span>{value ? formatDate(value) : 'Sélectionner une date'}</span>
      </button>

      {isOpen && createPortal(
        <AnimatePresence>
          <CalendarHeader>
            <ChevronLeft onClick={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() - 1)))} />
            <h3>{formatDate(currentMonth, 'MMMM yyyy')}</h3>
            <ChevronRight onClick={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() + 1)))} />
          </CalendarHeader>

          <CalendarGrid>
            {days.map((day, index) => (
              <DateButton
                key={index}
                onClick={() => {
                  onChange(day.toISOString().split('T')[0]);
                  setIsOpen(false);
                }}
                isSelected={value === day.toISOString().split('T')[0]}
                isToday={day.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]}
              >
                {day.getDate()}
              </DateButton>
            ))}
          </CalendarGrid>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
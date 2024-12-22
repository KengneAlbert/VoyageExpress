import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgb(31 41 55);
  
  button {
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    
    &:hover {
      background-color: rgb(31 41 55);
    }
  }
  
  h3 {
    font-weight: 500;
    color: white;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  padding: 1rem;
`;

export const DateButton = styled(motion.button)<{ isSelected?: boolean; isToday?: boolean }>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-size: 0.875rem;
  
  ${({ isSelected }: { isSelected?: boolean }) => isSelected && `
    background: linear-gradient(to right, rgb(249 115 22), rgb(234 88 12));
    color: white;
  `}
  
  ${({ isToday }: { isToday?: boolean }) => isToday && `
    border: 2px solid rgb(249 115 22);
  `}
  
  &:hover {
    background-color: rgb(31 41 55);
    transform: scale(1.1);
  }
`;
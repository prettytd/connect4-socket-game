import { width } from '../constants/connectFour';

export const getElementIdFromRowCol = ({ row, col }: { row: number; col: number }) =>
  `element-${row * width + col}`;

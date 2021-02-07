export enum Color {
  Blue = 'Blue',
  Red = 'Red',
}

// we can use toLowerCase(), but in case when the class name is somewhat special
export const ColorClass = {
  [Color.Blue]: 'blue',
  [Color.Red]: 'red',
};

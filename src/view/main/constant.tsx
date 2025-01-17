export const DUMMY_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  url: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg`,
}));

export const DUMMY_DATA_ERROR = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  url: undefined,
}));

export const breakpoints = {
  default: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

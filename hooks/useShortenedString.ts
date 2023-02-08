export const useShortenedString = (element: string, length: number): string => {
  if (element.length > length) {
    return element.substring(0, length - 3) + '...';
  } else {
    return element;
  }
};

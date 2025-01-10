export const capitalizeWords = (words) =>
  words
    ? words
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

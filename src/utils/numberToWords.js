export const numberToWords = (num) => {
  if (num === 0) return "Zero Only";

  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

  const convertToWords = (n) =>
    n === 0
      ? ""
      : n < 20
      ? belowTwenty[n] + " "
      : n < 100
      ? tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "")
      : belowTwenty[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " " + convertToWords(n % 100) : "");

  let result = "",
    i = 0;

  while (num > 0) {
    if (num % 1000 !== 0)
      result =
        convertToWords(num % 1000) +
        thousands[i] +
        (result ? " " + result : "");
    num = Math.floor(num / 1000);
    i++;
  }

  return result.trim() + " Only";
};

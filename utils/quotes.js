const quotes = [
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  "The only way to do great work is to love what you do.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Opportunities don't happen. You create them.",
  "Work hard in silence, let success make the noise.",
  "Dream big. Start small. Act now.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Perseverance is not a long race; it is many short races one after the other.",
  "Believe you can and you're halfway there.",
  "Do what you can, with what you have, where you are.",
  "Quality means doing it right when no one is looking.",
  "The future depends on what you do today.",
  "Don’t limit your challenges. Challenge your limits.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things are done by a series of small things brought together.",
  "Start where you are. Use what you have. Do what you can.",
  "The expert in anything was once a beginner.",
  "The secret of getting ahead is getting started.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Your limitation—it’s only your imagination.",
  "Sometimes later becomes never. Do it now.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Work while they sleep. Learn while they party. Save while they spend. Live like they dream.",
];

export const getUniqueQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

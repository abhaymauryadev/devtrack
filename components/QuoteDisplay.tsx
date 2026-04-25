"use client";

import { useState, useEffect } from "react";

const QUOTES = [
  { text: "Believe you can and you're halfway there.", category: "motivational" },
  { text: "Push yourself, because no one else is going to do it for you.", category: "motivational" },
  { text: "Great things never come from comfort zones.", category: "motivational" },
  { text: "Dream it. Wish it. Do it.", category: "motivational" },
  { text: "The secret of getting ahead is getting started.", category: "motivational" },
  { text: "It always seems impossible until it's done.", category: "inspirational" },
  { text: "In the middle of every difficulty lies opportunity.", category: "inspirational" },
  { text: "Your only limit is your mind.", category: "inspirational" },
  { text: "Act as if what you do makes a difference. It does.", category: "inspirational" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "inspirational" },
  { text: "Rest when you're weary. Refresh and renew yourself.", category: "self-care" },
  { text: "You can't pour from an empty cup. Take care of yourself first.", category: "self-care" },
  { text: "Rest is not idleness — it is the key to wellbeing.", category: "self-care" },
  { text: "Taking breaks is productive. Your brain needs it.", category: "self-care" },
  { text: "Be gentle with yourself. You are a child of the universe.", category: "self-care" },
  { text: "Gratitude turns what we have into enough.", category: "gratitude" },
  { text: "Start each day with a grateful heart.", category: "gratitude" },
  { text: "Appreciate where you are in your journey.", category: "gratitude" },
  { text: "Small progress is still progress. Be grateful for every step.", category: "gratitude" },
  { text: "Gratitude is the fairest blossom which springs from the soul.", category: "gratitude" },
];

const CATEGORY_COLORS: Record<string, string> = {
  motivational: "text-blue-300",
  inspirational: "text-purple-300",
  "self-care": "text-green-300",
  gratitude: "text-yellow-300",
};

export default function QuoteDisplay() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const quote = QUOTES[quoteIndex];

  return (
    <div className="absolute top-4 left-4 max-w-xs z-10">
      <p className={`text-sm font-medium italic ${CATEGORY_COLORS[quote.category]}`}>
        &ldquo;{quote.text}&rdquo;
      </p>

    </div>
  );
}

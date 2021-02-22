import { useState, useEffect } from "react";

function QuoteComponent() {
  const [quote, setQuote] = useState(null);

  useEffect(async () => {
    const response = await fetch("https://quotes.rest/qod?category=inspire");
    const result = await response.json();
    const q = result["contents"]["quotes"][0]["quote"];
    const author = result["contents"]["quotes"][0]["author"];
    setQuote([q, author]);
  }, []);

  return (
    <div className="quote-app">
      {quote && (
        <blockquote>
          <p className="quote-txt">{quote[0]}</p>
          <footer className="quote-author">— {quote[1]} </footer>
        </blockquote>
      )}
    </div>
  );
}

export default QuoteComponent;

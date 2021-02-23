import { useState, useEffect } from "react";

function QuoteComponent() {
  const [quote, setQuote] = useState("");
  const [err, setErr] = useState("");

  useEffect(async () => {
    try {
      const response = await fetch("https://quotes.rest/qod?category=inspire");
      const result = await response.json();
      const q = result["contents"]["quotes"][0]["quote"];
      const author = result["contents"]["quotes"][0]["author"];
      setQuote([q, author]);
    } catch (err) {
      setErr("Too many requests.");
    }
  }, []);

  return (
    <div className="quote-app">
      <blockquote>
        <p className="quote-txt">{quote[0] ? quote[0] : err}</p>
        <footer className="quote-author">— {quote[1] ? quote[1] : ""} </footer>
      </blockquote>
    </div>
  );
}

export default QuoteComponent;

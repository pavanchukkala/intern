"use client";

import { useEffect } from "react";

export default function SearchBar() {
  useEffect(() => {
    const input = document.getElementById("searchBox");
    const cards = document.querySelectorAll("#grid > div");

    input.addEventListener("input", e => {
      const q = e.target.value.toLowerCase();
      cards.forEach(card => {
        const txt =
          (card.dataset.title + " " + card.dataset.tags).toLowerCase();
        card.style.display = txt.includes(q) ? "" : "none";
      });
    });
  }, []);

  return (
    <input
      id="searchBox"
      placeholder="Search posts..."
      className="w-full p-3 mb-6 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
    />
  );
}

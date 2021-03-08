import React, { useEffect, useState } from "react";

const STORAGE_KEY = "my_watchlist_v1";
const STATUSES = ["Want to Watch", "Watching", "Completed"];

const INITIAL_ITEMS = [
  { id: 1, title: "Spirited Away", status: "Completed", rating: 5 },
  { id: 2, title: "Spider-Man: Into the Spider-Verse", status: "Want to Watch", rating: 0 },
];

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch (e) {
      return INITIAL_ITEMS;
    }
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Want to Watch");
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function handleAdd(e) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    setItems([{ id: Date.now(), title: clean, status, rating: Number(rating) }, ...items]);
    setTitle("");
    setRating(0);
  }

  function updateItem(id, patch) {
    setItems(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function removeItem(id) {
    setItems(items.filter((it) => it.id !== id));

import { useCallback, useEffect, useState } from "react";
import { mapFoodFromApi } from "../utils/foodImages";

export function useFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFoods = useCallback(async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch("/api/foods");
      if (!res.ok) {
        throw new Error("Failed to load menu");
      }
      const data = await res.json();
      setFoods(data.map(mapFoodFromApi));
    } catch (err) {
      setError(err.message || "Could not load menu items");
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  return { foods, loading, error, reload: loadFoods };
}

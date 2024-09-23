import { useState } from 'react';

export default function useTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const test = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001`, {
        method: 'GET',
        headers: {},
      });
      if (!response.ok) throw new Error('Test failed.');
      const res = await response.json();
      return res;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { test, loading, error };
}

'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import useTest from '@/hooks/useTest';

export default function Test() {
  const { test, loading, error } = useTest();

  useEffect(() => {
    console.log('Testing api route...');

    const runTest = async () => {
      const res = await test();
      toast('Test result:', res);
    };

    runTest();
  }, []);

  return (
    <div className="test-page">
      {loading && <p>Testing api route...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <p>Test successful!</p>}
    </div>
  );
}

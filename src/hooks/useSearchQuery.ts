import { useState, useEffect } from 'react';

function useSearchQuery(key: string): [string, (query: string) => void] {
  const [query, setQuery] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, query);
    };
  }, []);

  return [query, setQuery];
}

export default useSearchQuery;

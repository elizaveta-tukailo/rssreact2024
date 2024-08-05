import { useState, useEffect } from 'react';

function useSearchQuery(key: string): [string, (query: string) => void] {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
    return '';
  });

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, query);
      }
    };
  }, []);

  return [query, setQuery];
}

export default useSearchQuery;

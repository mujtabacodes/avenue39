import { useEffect, useState } from 'react';

const useColorMode = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedColorMode = localStorage.getItem('colorMode') as 'light' | 'dark' | null;
    const initialMode = savedColorMode || 'light';
    setColorMode(initialMode);
    document.documentElement.classList.add(initialMode);

    console.log('Initial Color Mode:', initialMode);
  }, []);

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColorMode);
    localStorage.setItem('colorMode', newColorMode);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newColorMode);

    console.log('Toggled Color Mode:', newColorMode);
  };

  return [colorMode, toggleColorMode] as const;
};

export default useColorMode;

import React, { useEffect, useState } from 'react';

const AsciiBackground = () => {
  const [asciiGrid, setAsciiGrid] = useState([]);

  // Function to generate a random ASCII character
  const getRandomAsciiChar = () => {
    // Ensuring chars include space for a less dense look as well
    const chars = '01+-*/#@&%$ABCDEFGHIJKLMNOPQRSTUVWXYZ '; // Added space at the end
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Function to generate a row of ASCII characters
  const generateAsciiRow = (width) => {
    let row = '';
    for (let i = 0; i < width; i++) {
      row += getRandomAsciiChar();
    }
    return row;
  };

  useEffect(() => {
    const updateGrid = () => {
      // Get the actual computed style from the rendered element
      const element = document.querySelector('.ascii-background');
      let charWidth = 10; // Default fallback
      let charHeight = 20; // Default fallback

      if (element) {
        const computedStyle = getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        const lineHeight = parseFloat(computedStyle.lineHeight); // This will be 'normal' or a pixel value

        charWidth = fontSize * 0.6; // Approximation for monospace font width
        // If line-height is 'normal', it computes to a factor of font-size (e.g., 1.2 * font-size)
        // For our tight grid, we usually force line-height: 1 in CSS, so it's just fontSize
        charHeight = lineHeight > 0 ? lineHeight : fontSize;
      }

      const visibleWidth = window.innerWidth;
      const visibleHeight = window.innerHeight;

      // Add a generous buffer to ensure full coverage
      const numCols = Math.ceil(visibleWidth / charWidth) + 15; // Add extra columns
      const numRows = Math.ceil(visibleHeight / charHeight) + 15; // Add extra rows

      const newGrid = [];
      for (let r = 0; r < numRows; r++) {
        newGrid.push(generateAsciiRow(numCols));
      }
      setAsciiGrid(newGrid);
    };

// ... also update the setInterval part where numColsCurrent is calculated ...
// ... rest of AsciiBackground.jsx ...

    updateGrid(); // Initial grid generation

    // Update grid on window resize to ensure it covers the screen
    window.addEventListener('resize', updateGrid);

    // Animation loop for flowing effect
    const interval = setInterval(() => {
      setAsciiGrid(prevGrid => {
        if (!prevGrid || prevGrid.length === 0) return []; // Handle empty grid case

        const numColsCurrent = Math.ceil(window.innerWidth / (parseFloat(getComputedStyle(document.querySelector('.ascii-background'))?.fontSize || '14') * 0.6)) + 5; // Re-calculate based on current width and font-size
        const newRow = generateAsciiRow(numColsCurrent);
        return [...prevGrid.slice(1), newRow]; // Shift rows up and add a new one at the bottom
      });
    }, 200); // Slightly faster interval for smoother flow (was 200)

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateGrid);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="ascii-background">
      {asciiGrid.map((row, rowIndex) => (
        <pre key={rowIndex}>{row}</pre> // <pre> preserves whitespace and monospace font
      ))}
    </div>
  );
};

export default AsciiBackground;
import React from 'react';

// Example: A simple 5x5 pixel heart shape
// Each string represents a row of pixels. 'X' is colored, '.' is transparent.
// You'll define your spaceship and planet shapes similarly.
const defaultHeartPixels = [
  " .X.X. ",
  ".XXX.XX",
  ".XXXXXX",
  ".XXXXX.",
  " .XXX. ",
  "  .X.  "
];

const PixelArt = ({ pixelData = defaultHeartPixels, pixelSize = 4, pixelColor = '#00ff66' }) => {
  return (
    <div
      className="pixel-art-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${pixelData[0].length}, ${pixelSize}px)`,
        gap: '0px', // No gap between pixels
      }}
    >
      {pixelData.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.split('').map((pixel, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="pixel"
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: pixel === 'X' ? pixelColor : 'transparent',
              }}
            ></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PixelArt;
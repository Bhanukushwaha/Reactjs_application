import React from 'react';
const ExampleCarouselImage = ({ text, imageSrc }) => {
  return (
    <img
      src={imageSrc}  
      alt={text}
      className="d-block w-100"
      style={{ height: '300px', objectFit: 'cover' }} 
    />
  );
};
export default ExampleCarouselImage;

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Selider() {
  return (
    <Carousel>
      {/* First Slide - Image */}
      <Carousel.Item>
        <img className="d-block w-100" src="pixabay-459203.jpg" alt="First slide" style={{ height: '660px' }}/>
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Second Slide - Video */}
      <Carousel.Item>
			<video
				 className="d-block"
				 autoPlay
				 loop
				 muted
				 style={{
					 width: '100vw',  // Full viewport width
					 height: '100vh', // Full viewport height
					 objectFit: 'cover', // Ensures the video covers the full screen without distortion
				 }}	>
				<source src="5590457-uhd_30fps.mp4" type="video/mp4" />				
			</video>        
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Third Slide - Image */}
      <Carousel.Item>
        <img className="d-block w-100" src="pexels-batuha.jpg" alt="Third slide" style={{ height: '660px' }}/>
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default Selider;

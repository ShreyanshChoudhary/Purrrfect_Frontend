import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage'; // Import the CarouselImage component
import './CarouselFade.css';

function CarouselFade() {
  return (
    <div className="carousel-wrapper flex justify-center items-center h-screen">
      <Carousel fade className="carousel-container w-[90%] md:w-[80%] lg:w-[60%] h-[500px]" indicators={true}>
        <Carousel.Item>
          <CarouselImage text="Rio the Cat" />
          <Carousel.Caption>
            <h3>Rio the Cat</h3>
            <p>A friendly feline ready to find a home!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage text="Luna the Kitten" />
          <Carousel.Caption>
            <h3>Luna the Kitten</h3>
            <p>Meet Luna, playful and full of life!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage text="Max the Dog" />
          <Carousel.Caption>
            <h3>Max the Dog</h3>
            <p>Max is loyal and loves to play!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselFade;

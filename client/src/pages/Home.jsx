
import { useState, useEffect } from 'react';
import Login from '../Authentication/Login';

import SampleMemories from './SampleMemories';
import image1 from '../assets/nature.png';
import image2 from '../assets/family.png';
import image3 from '../assets/adventure.png';
import image4 from '../assets/cullera.png';
import image5 from '../assets/beach.png';
import image6 from '../assets/culrinarishe.png';


const Home = () => {
  // State to manage the active slide
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };


  // Array of slide data with titles and descriptions
  const slides = [
    {
      title: 'Teile deine besten Erinnerungen.',
      description: 'Lass deine Freunde liken und kommentieren',
      image: image1,
      isCTASlide: true, 
    },
    {
      title: 'Familiäre abendeteuer',
      description: 'Bewahre kostbare Momente mit geliebten Menschen.',
      image: image2,
    },
    {
      title: 'Abenteuerreisen',
      description: 'Teile deine unvergesslichen Reiseerlebnisse.',
      image: image3,
    },
    {
      title: 'Stadtbildgenüsse',
      description: 'Erkunde die lebhafte Energie belebter Städte.',
      image: image4,
    },
    {
      title: 'Strandurlaub',
      description: 'Entspanne und erhole dich an den unberührten Sandstränden.',
      image: image5,
    },
    {
      title: 'Kulinarische Abenteuer',
      description: 'Genieße die Aromen internationaler Küchen.',
      image: image6,
    },
  ];
  

  // Function to handle automatic slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="relative">
        <div className="h-96 w-full relative overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-full h-full bg-cover bg-center flex-shrink-0 relative`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                
                }}
              >
                <div
                  className={`${
                    slide.isCTASlide ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-50'
                  } absolute bottom-0 left-0 w-full h-1/3 p-4 text-white flex flex-col justify-end`}
                >
                  <h1
                    className={`${
                      slide.isCTASlide ? 'text-4xl' : 'text-4xl'
                    } font-semibold mb-2`}
                  >
                    {slide.title}
                  </h1>
                  <p className={`${slide.isCTASlide ? 'text-lg' : 'text-lg'}`}>
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isLoginModalOpen && <Login closeModal={toggleLoginModal} />}
      <SampleMemories openLoginModal={toggleLoginModal} />
      
    </div>
  );
};

export default Home;

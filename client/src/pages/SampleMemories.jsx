import { useState } from 'react';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login'; // Import the Login component
import { FaHeart } from 'react-icons/fa';
import sarah from '../assets/sarah.png';
import chris from '../assets/chris.png';
import emilia from '../assets/emilia.png';
import Alex from '../assets/Alex.png';

const Memories = [
  {
    id: 1,
    title: 'Ein Strandsonnenuntergang zum Erinnern',
    description: 'Ein unvergesslicher Abend am Strand in Mallorca mit Freundenunden.',
    location: 'Mallorca, Spanien',
    tags: ['Strand', 'Sonnenuntergang', 'Freunde'],
    authorName: 'Sarah',
    image: sarah,
  },
  {
    id: 2,
    title: 'Die Wildnis erkunden',
    description: 'Unterwegs in die Eifel-Wildnis mit Georges!',
    location: 'Eifel, Deutschland',
    tags: ['Abenteuer', 'Natur', 'Freunde'],
    authorName: 'Chris',
    image: chris,
  },
  {
    id: 3,
    title: 'Picknickglück im Park',
    location: 'Köln, Deutschland',
    description: 'Schöne Zeit mit meiner Familie im Kölner Grünpark.',
    tags: ['Familie', 'Picknick', 'Park'],
    authorName: 'Emily',
    image: emilia,
  },
  {
    id: 4,
    title: 'Exotische Abenteuer warten',
    description: 'Spannende Zeiten am Cullera Beach!',
    location: 'Cullera, Spanien',
    tags: ['Reisen', 'Abenteuer', 'Erkundung'],
    authorName: 'Alex',
    image: Alex,
  },
];


const SampleMemories = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal
  const [likeCounts, setLikeCounts] = useState(
    Memories.map(() => Math.floor(Math.random() * 100))
  );

  // Function to handle liking a memory
  const handleLike = (memoryId) => {
    const updatedLikeCounts = likeCounts.map((count, index) =>
      index === memoryId ? count + 1 : count
    );
    setLikeCounts(updatedLikeCounts);
  };

  // Function to open the registration modal
  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  // Function to close the registration modal
  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  // Function to open the login modal
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4">
          Entdecke schöne Erinnerungen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Memories.map((memory, index) => (
            <div
              key={memory.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{memory.title}</h2>
                <p className="text-gray-600 mb-2">{memory.description}</p>
                <p className="text-gray-600 mb-2">{memory.location}</p>
                <div className="flex space-x-2 mb-2">
                  {memory.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary text-white rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(index)}
                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                  >
                    <FaHeart className="mr-1 text-red-500" />
                    {likeCounts[index]} Likes
                  </button>
                  <p className="text-sm text-gray-500">
                  Erstellt von {memory.authorName}
                  </p>
                </div>
                <button
                  onClick={openRegistrationModal}
                  className="bg-secondary text-white rounded-md px-3 py-1 hover:bg-primary-dark transition mt-2"
                >
                  Mehr
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRegistrationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/60">
          <Register closeRegistrationModal={closeRegistrationModal} openLoginModal={openLoginModal} />
        </div>
      )}
      {showLoginModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/60">
          <Login closeModal={closeLoginModal} />
        </div>
      )}
    </div>
  );
};

export default SampleMemories;

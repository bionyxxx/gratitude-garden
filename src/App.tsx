import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './config/firebase';
import { motion } from 'framer-motion';

interface Gratitude {
  id: string;
  message: string;
  timestamp: number;
  flowerEmoji: string;
}

function App() {
  const [gratitude, setGratitude] = useState('');
  const [gratitudes, setGratitudes] = useState<Gratitude[]>([]);
  const [selectedFlower, setSelectedFlower] = useState<Gratitude | null>(null);

  const flowerEmojis = ['🌸', '🌺', '🌹', '🌷', '🌻', '🌼', '💐', '🪷'];

  useEffect(() => {
    fetchGratitudes();
  }, []);

  const fetchGratitudes = async () => {
    const q = query(collection(db, 'gratitudes'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const gratitudesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Gratitude));
    setGratitudes(gratitudesList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitude.trim()) return;

    try {
      const randomFlower = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
      
      await addDoc(collection(db, 'gratitudes'), {
        message: gratitude,
        timestamp: Date.now(),
        flowerEmoji: randomFlower
      });
      setGratitude('');
      fetchGratitudes();
    } catch (error) {
      console.error('Error adding gratitude:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-garden-purple to-garden-pink p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-cute text-pink-600 mb-2">
            🌸 Gratitude Garden 🌸
          </h1>
          <p className="text-2xl font-cute text-pink-500 animate-bounce">
            Punya Amelllll Comelll
          </p>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-center mb-6">
            <p className="text-xl text-pink-700 font-cute leading-relaxed">
              "Setiap rasa syukur yang kamu tanam hari ini,
              akan tumbuh menjadi kebahagiaan yang mekar di masa depan."<br/>
              
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="Tulis hal yang kamu syukuri hari ini..."
                className="flex-1 p-4 rounded-xl border-2 border-garden-pink focus:outline-none focus:border-pink-400 bg-white/90 text-lg text-pink-700 placeholder-pink-300"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg font-cute text-lg"
              >
                Tanam 🌱
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {gratitudes.map((g) => (
            <motion.div
              key={g.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="cursor-pointer"
              onClick={() => setSelectedFlower(g)}
            >
              <div className="text-7xl text-center hover:animate-bounce bg-white/30 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                {g.flowerEmoji}
              </div>
            </motion.div>
          ))}
        </div>

        {selectedFlower && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-b from-white to-pink-50 p-8 rounded-2xl max-w-md w-full shadow-2xl border-2 border-pink-200"
            >
              <div className="text-7xl text-center mb-6 animate-bounce">
                {selectedFlower.flowerEmoji}
              </div>
              <p className="text-2xl text-pink-700 mb-8 text-center font-cute leading-relaxed">
                {selectedFlower.message}
              </p>
              <button
                onClick={() => setSelectedFlower(null)}
                className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg font-cute text-lg"
              >
                Close 💝
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminAudioFilter = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await axios.get("http://localhost:3000/audios");
        if (Array.isArray(res.data)) {
          const audiosWithPriority = res.data.map((audio) => {
            let priority = 0;
            const nameLower = audio.name.toLowerCase();
            console.log(nameLower);
            if (nameLower.includes("bharath")) {
              priority = 4;
            } else if (nameLower.includes("lokesh")) {
              priority = 3;
            } else if(nameLower.includes("shashi")){
                priority = 2;
            }else{
                priority = 1;
            }

            return { ...audio, priority };
          });

          audiosWithPriority.sort((a, b) => b.priority - a.priority);

          setAudios(audiosWithPriority);
        } else {
          setAudios([]);
        }
      } catch (error) {
        console.error("Error fetching audios:", error);
        setAudios([]);
      }
    };

    fetchAudios();
  }, []);

  return (
    <motion.div
      className="p-10 min-h-screen bg-gradient-to-tr from-purple-50 to-purple-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-purple-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Prioritized Patient Audios
        </motion.h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-purple-600 text-white text-center">
            <tr>
              <th className="py-4 px-6">Audio Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Play</th>
            </tr>
          </thead>
          <tbody>
            {audios.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No audio files found.
                </td>
              </tr>
            ) : (
              audios.map((audio, index) => {
                const audioUrl = `http://localhost:3000/audio/${audio.id}`;
                return (
                  <motion.tr
                    key={audio.id}
                    className="text-center border-b border-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                    }}
                  >
                    <td className="py-4 px-6 font-semibold">{audio.name}</td>
                    <td className="py-4 px-6">{audio.email}</td>
                    <td className="py-4 px-6">
                      <audio controls src={audioUrl} />
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminAudioFilter;

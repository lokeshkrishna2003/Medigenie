import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminAudio = () =>{

  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        console.log("Fetching audios...");
        console.log("line 12...");
        const res = await axios.get("http://localhost:3000/audios");
        console.log("Fetched audios line 4:", res.data);
        if (Array.isArray(res.data)) {
          setAudios(res.data);
        } else {
          setAudios([]);
        }
      } catch (error) {
        console.error("Error fetching audios line 21:", error);
        setAudios([]);
      }
    };

    fetchAudios();

    const channel = new BroadcastChannel("audioUploadChannel");
    channel.onmessage = (event) => {
      if (event.data === "new-audio-uploaded") {
        console.log("🔄 Refreshing audios on admin side...");
        fetchAudios();
      }
    };

    return () => channel.close();
  }, []);

  return (
    <motion.div
      className="p-10 min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-red-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Uploaded Audios
        </motion.h1>
        <button
          onClick={() => {
            window.location.href = "/admin-audio-filter";
          }}
          className="bg-red-700 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
        >
          Prior Patients
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white text-center">
            <tr>
              <th className="py-4 px-6">Audio Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Play</th>
            </tr>
          </thead>
          <tbody>
            {audios.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No audio files found.
                </td>
              </motion.tr>
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
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
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

export default AdminAudio;
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allusers");
      setUsers(res.data.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.div
      className="p-10 min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Registered Users
      </motion.h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white text-center">
            <tr>
              <th className="py-4 px-6">No of Patients</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  className="border-b hover:bg-blue-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-4 px-6 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-gray-800">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminUser;
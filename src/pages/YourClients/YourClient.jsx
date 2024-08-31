import React, { useEffect, useState } from "react";
import ClientCards from "../../camponents/ClientCards/ClientCards";
import axios from "axios";
import { motion } from "framer-motion";
import { baseUrl } from "../../../urls.js";

function YourClient() {
  const [clients, setClients] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [loading, setLoading] = useState(true);

  const handleDelete = (clientId) => {
    setClients(clients.filter((client) => client._id !== clientId));
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const getClients = await axios.get(`${baseUrl}/client/getclients`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });

        setClients(getClients.data.clients);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);
  console.log(clients);
  const filtereedClients = clients.filter((client) =>
    client.fullName.toLowerCase().includes(searchClient.toLowerCase())
  );
  if (loading) {
    return <p className="font-button-Text">Loading...</p>; // Display loading while fetching clients
  }

  return (
    <div>
      <motion.div className="w-full h-72 py-3 outline-none outline-Lic-Blue rounded-lg overflow-y-scroll scroll-smooth">
        <div>
          <h1 className="font-SideHeading-Text">Your Client List</h1>
          <input
            type="text"
            placeholder="Search"
            vlaue={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
            className="w-[80%] outline-none outline-Lic-Blue rounded-xl px-2 "
          />
          <div>
            {filtereedClients.length > 0 ? (
              filtereedClients.map((client) => (
                <ClientCards
                  key={client._id}
                  client={client}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default YourClient;

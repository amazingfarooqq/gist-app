import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getGistForUser, getPublicGists } from "../services/gistService";

const GistContext = createContext({});
export const GistContextAPI = () => useContext(GistContext);

export const GistProvider = ({ children }) => {
  const [gists, setGists] = useState([]);
  console.log({gists});

  const [publicGists, setPublicGists] = useState([]);
  const [InitiatGist, setInitiatGist] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGists();
  }, []);

  const fetchGists = async (username = "") => {
    setLoading(true);
    try {
      let response;
      if (!InitiatGist) {
        response = await getPublicGists();
        setPublicGists(response.data)
        setInitiatGist(true)
      }
      if (username) {
        response = await getGistForUser(username);
      } 
      if (!username) {
        setGists(publicGists)
      } 
      if (response) {
        setGists(response.data);
      }
    } catch (error) {
      console.error("Error fetching gists:", error);
    } finally {
      setLoading(false);
    }
  };
  return <GistContext.Provider value={{ gists, loading, fetchGists }}>
  {children}
</GistContext.Provider>;
};

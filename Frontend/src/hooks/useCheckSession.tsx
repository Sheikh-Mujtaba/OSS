import { useState, useEffect } from "react";
import axios from "axios";

const useCheckSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:8082/auth/check-session", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error("Error checking session:", err);
        setIsLoggedIn(false);
      });
  }, []);

  return {isLoggedIn ,setIsLoggedIn};
};

export default useCheckSession;

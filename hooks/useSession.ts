import { useEffect, useState } from "react";
import { getSessions } from "@/services/session.services";

export const useSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions().then(setSessions);
  }, []);

  return sessions;
};
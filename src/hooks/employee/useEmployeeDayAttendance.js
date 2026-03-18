import { useState, useEffect, useCallback, useMemo } from "react";
import { getEmployeeDayAttendance } from "../../services/EmployeeService/employeeService";

const useEmployeeDayAttendance = (date) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchDayAttendance = async () => {
  try {
    setLoading(true);
    const data = await getEmployeeDayAttendance(date);
    setSessions(data.sessions || []);
  } catch (err) {
    console.log("API ERROR:", err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    if (date) {
      fetchDayAttendance();
    }
  }, [date]);

  const formattedSessions = useMemo(() => {
    return sessions.map((session) => ({
      ...session,

      punchInFormatted: session.punch_in
        ? new Date(session.punch_in).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "--",

      punchOutFormatted: session.punch_out
        ? new Date(session.punch_out).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "--",
    }));
  }, [sessions]);

  const refetch = useCallback(async () => {
    await fetchDayAttendance();
  }, [date]);

  return {
    sessions: formattedSessions,
    loading,
    error,
    refetch,
  };
};

export default useEmployeeDayAttendance;
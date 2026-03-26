import { useState, useEffect, useCallback } from "react";
import { getEmployeeAttendance } from "../../services/EmployeeService/employeeService";

const useEmployeeAttendance = (month, year) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);

     try {
      const data = await getEmployeeAttendance({ month, year });
      setAttendance(data || []);
    } catch (err) {
      console.log("Attendance fetch error:", err.response?.data || err.message);
      setError(err.response?.data || err.message || "Unknown error");
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    if (month && year) {
      fetchAttendance();
    }
  }, [fetchAttendance, month, year]);

  return { attendance, loading, error, refetch: fetchAttendance };
};

export default useEmployeeAttendance;
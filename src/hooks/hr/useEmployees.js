import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getEmployeeDetails,
  getEmployeeRoute,
} from "../../services/HrServices/employeeService";
import { createEmployee as createEmployeeService } from "../../services/HrServices/employeeService";



export const useCreateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateEmployee = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await createEmployeeService(payload);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateEmployee, loading, error };
};


export const useEmployeeDetails = (id) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeDetails(id),
    enabled: !!id,
  });
};


export const useEmployeeLocations = (id, date) => {
  return useQuery({
    queryKey: ["employeeRoute", id, date],
    queryFn: () => getEmployeeRoute(id, date),
    enabled: !!id,
  });
};
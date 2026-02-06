import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployee,
  addEmployee,
  getEmployeeLocations,
} from "../services/HrServices/employeeService";

const dummyEmployees = [
  { id: "1", name: "Arjun S", location: "MG Road, Kochi", status: "active" },
  { id: "2", name: "Suresh Kumar", location: "Vyttila Hub", status: "active" },
  { id: "3", name: "Neha Sharma", location: "Off Duty", status: "inactive" },
  { id: "4", name: "Rahul Menon", location: "Palarivattom", status: "active" },
  { id: "5", name: "Vishnu Prasad", location: "Tripunithura", status: "active" },
  { id: "6", name: "Sneha Joseph", location: "Angamaly", status: "active" },
];

export const useEmployees = (search, status) =>
  useQuery({
    queryKey: ["employees", search, status],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));


      return dummyEmployees.filter((emp) => {
        const matchesSearch =
          emp.name.toLowerCase().includes(search.toLowerCase()) ||
          emp.location.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          status === "all" ? true : emp.status === status;

        return matchesSearch && matchesStatus;
      });
    },
  });

export const useEmployeeDetails = (id) =>
  useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      // get from dummy data
      return dummyEmployees.find((emp) => emp.id === id);
    },
    enabled: !!id,
  });

export const useEmployeeLocations = (id) =>
  useQuery({
    queryKey: ["employeeLocations", id],
    queryFn: async () => {

      const locations = [
        { place: "MG Road, Kochi", time: "Today, 04:30 pm", current: true },
        { place: "Palarivattom", time: "Today, 04:00 pm" },
        { place: "Tripunithura", time: "Today, 03:00 pm" },
         { place: "Palarivattom", time: "Today, 04:00 pm" },
        { place: "Tripunithura", time: "Today, 03:00 pm" },
           { place: "Tripunithura", time: "Today, 03:00 pm" },
         { place: "Palarivattom", time: "Today, 04:00 pm" },
        { place: "Tripunithura", time: "Today, 03:00 pm" },
      ];
      return locations;
    },
    enabled: !!id,
  });

export const useAddEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // just log the payload for now
      console.log("Adding employee:", payload);
      return { ...payload, id: Date.now().toString() };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

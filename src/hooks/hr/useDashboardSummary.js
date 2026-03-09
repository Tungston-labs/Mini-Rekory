import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../../services/HrServices/dashboardServices";

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    refetchInterval: 30000,
  });
};
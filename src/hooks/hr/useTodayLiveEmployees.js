import { useQuery } from "@tanstack/react-query";
import { getLiveEmployees } from "../../services/HrServices/liveAttendanceService";

export const useLiveEmployees = ({search,
  page,
  page_size}) => {
  return useQuery({
    queryKey: ["liveEmployees", search,
  page,
  page_size],
    queryFn: () => getLiveEmployees(search,
  page,
  page_size),
    keepPreviousData: true,
    refetchInterval: 30000,
  });
};
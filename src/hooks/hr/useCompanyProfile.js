import { useQuery } from "@tanstack/react-query";
import { getCompanyProfile } from "../../services/HrServices/profileService";

export const useCompanyProfile = () => {
  return useQuery({
    queryKey: ["companyProfile"],
    queryFn: getCompanyProfile,

    // 🔥 match your departments hook style
    onError: (error) => console.log("COMPANY PROFILE ERROR:", error),

    // optional (good practice)
    staleTime: 1000 * 60 * 5,
  });
};
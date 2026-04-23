import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getLiveEmployees,
} from "../../services/HrServices/liveEmployeeService";

export const useLiveEmployees = (search, filter) => {
  return useInfiniteQuery({
    queryKey: ["liveEmployees", search, filter],

    queryFn: ({ pageParam = 1 }) =>
      getLiveEmployees({ pageParam, search, filter }),

    getNextPageParam: (lastPage) => lastPage.nextPage,

    keepPreviousData: true,
  });
};
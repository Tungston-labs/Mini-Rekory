export const useLiveEmployees = (search, filter) => {
  return useInfiniteQuery({
    queryKey: ["liveEmployees", search, filter],

    queryFn: ({ pageParam = 1 }) =>
      getLiveEmployees({ pageParam, search, filter }),

    getNextPageParam: (lastPage) => {
      const current = lastPage.current_page;
      const total = lastPage.total_pages;

      return current < total ? current + 1 : undefined;
    },

    keepPreviousData: true,
  });
};
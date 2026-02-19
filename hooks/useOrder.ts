import { orderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => orderService.getServices(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

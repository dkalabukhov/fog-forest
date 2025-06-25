import { favoriteService } from "@/services/favorite.service";
import { useQuery } from "@tanstack/react-query";

export const useGetFavorites = () => {
  const { data } = useQuery({
    queryKey: ['get favorites'],
    queryFn: () => favoriteService.getFavorites(),
  })

  return { data };
}
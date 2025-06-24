import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/auth/auth.service'
import { EnumRole } from '@/shared/types/role.enum'

export const useGetRole = () => {
  const { data, isLoading: isLoadingRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: () => authService.verifyRole(),
    select: (response) => {
      const data = response.data as { role?: EnumRole | null};
      return data.role;
    }
  })

  return {
    role: data,
    isLoadingRole
  }
}

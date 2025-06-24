import { PUBLIC_URL } from "@/config/url.config";
import { authService } from "@/services/auth/auth.service";
import { IAuthForm } from "@/shared/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function useAuthForm(isReg: boolean) {
  const router = useRouter();

  const form = useForm<IAuthForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth user'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isReg ? 'register' : 'login', data),
    onSuccess() {
      form.reset()
      toast.success(isReg ? 'Регистрация прошла успешно' : 'Вы успешно авторизировались')
      router.replace(PUBLIC_URL.home());
    },
    onError(error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Что-то пошло не так')
      }
    }
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  }

  return { onSubmit, form, isPending }
}
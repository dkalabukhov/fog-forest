import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form-elements/Form"
import { Input } from "@/components/ui/form-elements/Input"
import { validEmail } from "@/shared/constants/emailRegex"
import { IAuthForm } from "@/shared/types/auth.interface"
import { UseFormReturn } from "react-hook-form"
import styles from './Auth.module.scss'

interface AuthFieldsProps {
  form: UseFormReturn<IAuthForm, any, IAuthForm>
  isPending: boolean
  isReg?: boolean
}

export function AuthFields({
  form,
  isPending,
  isReg = false
} : AuthFieldsProps) {
  return (
    <>
      {isReg && (
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Имя обязательно'}}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.form__label}>Имя</FormLabel>
              <FormControl>
                <Input
                  className={styles.form__input}
                  id="name"
                  placeholder="Имя"
                  disabled={isPending}
                  {...field}  />
              </FormControl>
              <FormMessage className={styles.form__errorMessage} />
            </FormItem>
            )}
          />
      )}
      <FormField
          control={form.control}
          name="email"
          rules={{
            required: 'Email обязателен',
            pattern: {
              value: validEmail,
              message: 'Почта имеет некорректный формат'
            }}}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.form__label}>Email</FormLabel>
              <FormControl>
                <Input
                  className={styles.form__input}
                  placeholder="example@mail.com"
                  type="email"
                  disabled={isPending}
                  {...field}  />
              </FormControl>
              <FormMessage className={styles.form__errorMessage} />
            </FormItem>
          )}
        />
      <FormField
        control={form.control}
        name="password"
        rules={{
          required: 'Имя обязательно',
          minLength: {
            value: 6,
            message: 'Пароль должен быть не менее 6 символов'
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={styles.form__label}>Пароль</FormLabel>
            <FormControl>
              <Input
                className={styles.form__input}
                placeholder="******"
                type="password"
                disabled={isPending}
                {...field}  />
            </FormControl>
            <FormMessage className={styles.form__errorMessage} />
          </FormItem>
        )}
      />
    </>
  );
}
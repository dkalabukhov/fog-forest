'use client';

import { useAuthForm } from "./useAuthForm";
import styles from './Auth.module.scss'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Form } from "@/components/ui/form-elements/Form";
import { Button } from "@/components/ui/Button";
import { AuthFields } from "./AuthFields";
import { Social } from "./Social";

export function Auth() {
  const [isReg, setIsReg] = useState(false);

  const {
    onSubmit,
    form,
    isPending
  } = useAuthForm(isReg)

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authWrapper__leftSide}></div>
      <div className={styles.authWrapper__rightSide}>
        <h1 className={styles.authWrapper__heading}>Fog&Forest</h1>
        <Card className={styles.card}>
          <CardHeader className={styles.card__header}>
            <CardTitle className={styles.card__title}>
              {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription className={styles.card__description}>
              Войдите или создайте учетную запись, чтобы совершать покупки
            </CardDescription>
            <CardContent className={styles.card__content}>
              <Form {...form}>
                <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
                  <AuthFields form={form} isPending={isPending} isReg={isReg} />
                  <Button className={styles.form__submitButton} disabled={isPending}>Продолжить</Button>
                </form>
              </Form>
              <Social />
            </CardContent>
          </CardHeader>
          <CardFooter className={styles.card__footer}>
            {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
            <button onClick={() => setIsReg(!isReg)}>
              {isReg ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
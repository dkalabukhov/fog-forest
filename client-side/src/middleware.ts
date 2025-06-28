import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SERVER_URL } from './config/api.config'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from './config/url.config'

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const accessToken = cookies.get('accessToken')?.value
  const refreshToken = cookies.get('refreshToken')?.value

  let role: string | null = null
  let isAuthenticated = false

  // Функция для проверки роли пользователя
  const verifyUserRole = async () => {
    try {
      const verifyResponse = await fetch(`${SERVER_URL}/auth/verify-role`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      if (verifyResponse.ok) {
        const data = await verifyResponse.json()
        return data.role || null
      }
    } catch (error) {
      console.error('Failed to verify role:', error)
    }
    return null
  }

  // Проверяем роль, если есть accessToken
  if (accessToken) {
    role = await verifyUserRole()
    isAuthenticated = role !== null
  }

  // Если accessToken невалиден, но есть refreshToken, пробуем обновить токены
  if (!isAuthenticated && refreshToken) {
    try {
      const refreshResponse = await fetch(`${SERVER_URL}/auth/login/access-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      })

      if (refreshResponse.ok) {
        // Повторно проверяем роль с новым токеном
        role = await verifyUserRole()
        isAuthenticated = role !== null
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
    }
  }

  // Редирект с /auth, если пользователь уже авторизован
  if (nextUrl.pathname.startsWith(PUBLIC_URL.auth()) && isAuthenticated) {
    return NextResponse.redirect(new URL(PUBLIC_URL.home(), nextUrl))
  }

  // Только ADMIN может зайти в /store
  if (nextUrl.pathname.startsWith(STORE_URL.root()) && role !== 'ADMIN') {
    return NextResponse.redirect(new URL(PUBLIC_URL.home(), nextUrl))
  }

  // Только авторизованные — в /dashboard
  if (nextUrl.pathname.startsWith(DASHBOARD_URL.root()) && !isAuthenticated) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/store/:path*', '/dashboard/:path*', '/auth/:path*'],
}
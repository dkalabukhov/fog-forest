import { Request } from 'express';

interface RequestWithCookies extends Request {
  cookies: Record<string, string | undefined>;
}

export const extractFromCookie =
  (cookieName: string) =>
  (request: RequestWithCookies): string | null => {
    return request.cookies?.[cookieName] ?? null;
  };

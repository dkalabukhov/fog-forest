import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'generated/prisma';

export const CurrentUser = createParamDecorator(
  (
    data: keyof User | undefined,
    context: ExecutionContext,
  ): User | User[keyof User] => {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    return data ? user[data] : user;
  },
);

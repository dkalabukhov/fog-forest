import { Prisma } from 'generated/prisma';

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    reviews: true;
  };
}>;

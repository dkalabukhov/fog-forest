import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICapturePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/paymentStatus.dto';
import { OrderStatus } from 'generated/prisma';
import { appendFileSync } from 'fs';

const checkout = new YooCheckout({
  shopId: process.env['YOOKASSA_SHOP_ID']!,
  secretKey: process.env['YOOKASSA_SECRET_KEY']!,
});

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return await this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: {
          id: item.productId,
        },
      },
    }));

    const total = dto.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        items: {
          create: orderItems,
        },
        total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const payment = await checkout.createPayment({
      amount: {
        value: total.toFixed(2),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.CLIENT_URL}/success`,
      },
      description: `Оплата заказа в магазине fog&forest. Id платежа #${order.id}`,
    });

    return payment;
  }

  async updateStatus(dto: PaymentStatusDto) {
    appendFileSync('ordersService.log', `${JSON.stringify(dto)}\n`);
    if (dto.event === 'payment.waiting_for_capture') {
      const capturePayment: ICapturePayment = {
        amount: {
          value: dto.object.amount.value,
          currency: dto.object.amount.currency,
        },
      };

      const capturedPayment = await checkout.capturePayment(
        dto.object.id,
        capturePayment,
      );

      return capturedPayment;
    }

    if (dto.event === 'payment.succeeded') {
      const orderId = dto.object.description.split('#')[1];

      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: OrderStatus.PAYED,
        },
      });

      return true;
    }

    return true;
  }
}

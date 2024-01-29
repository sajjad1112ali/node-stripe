import { StripeService } from './stripe';
import { OrderItem, OrderItems } from './types';

export class PaymentService {
  private stripeService: StripeService;
  public constructor() {
    this.stripeService = new StripeService();
  }

  public async createCustomer() {
    const customer = this.stripeService.createCustomer({
      description: 'The description of the customer',
      email: 'somerandom@mailinator.com',
      name: 'Mailinator Customer Name',
    });
    return customer;
  }

  getLineItemsData(items: OrderItems) {
    return items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
  }

  public async checkoutSession(customerID: string, orderItems: OrderItems) {
    const lineItems = this.getLineItemsData(orderItems);
    const stripeSession = this.stripeService.checkoutSession(
      lineItems,
      customerID,
    );
    return stripeSession;
  }

  public async cardSession(customerID: string) {
    const stripeSession = await this.stripeService.cardSession(customerID);
    return stripeSession;
  }

  public async detachPaymentMethod(paymentMethodID: string) {
    const paymentMethod = await this.stripeService.detachPaymentMethod(
      paymentMethodID,
    );
    return paymentMethod;
  }

  public async createInvoice(customerID: string, paymentMethodID: string) {
    const invoice = await this.stripeService.createInvoice(
      customerID,
      paymentMethodID,
    );
    return invoice;
  }
}

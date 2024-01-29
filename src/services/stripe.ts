import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;
  public constructor() {
    this.stripe = new Stripe('sk_test_sqe7GWMDvPFgeedibL3n7EdG00XUol8glq');
  }

  public async createCustomer(
    customerDetails: Stripe.CustomerCreateParams,
  ): Promise<Stripe.Customer> {
    const customer: Stripe.Customer = await this.stripe.customers.create(
      customerDetails,
    );
    return customer;
  }

  public async checkoutSession(
    lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem>,
    customerID: string,
  ) {
    const data: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      customer: customerID,
      success_url:
        'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url:
        'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      line_items: lineItems,
      mode: 'payment',
    };
    const session: Stripe.Checkout.Session =
      await this.stripe.checkout.sessions.create(data);
    return session;
  }

  public async cardSession(customerID: string) {
    const data: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      customer: customerID,
      success_url:
        'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url:
        'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      mode: 'setup',
    };
    const session: Stripe.Checkout.Session =
      await this.stripe.checkout.sessions.create(data);
    return session;
  }

  public async detachPaymentMethod(paymentMethodID: string) {
    const paymentMethod = await this.stripe.paymentMethods.detach(
      paymentMethodID,
    );
    return paymentMethod;
  }

  public async createInvoiceItem(customerID: string) {
    const invoiceItem = await this.stripe.invoiceItems.create({
      customer: customerID,
      unit_amount: 2000,
      quantity: 3,
      description: 'Invoice item 1',
      currency: 'usd',
    });
    return invoiceItem;
  }

  public async createInvoice(customerID: string, paymentMethodID: string) {
    const invoiceItemRes = await this.createInvoiceItem(customerID);
    const invoice = await this.stripe.invoices.create({
      customer: customerID,
      pending_invoice_items_behavior: 'include',
      default_payment_method: paymentMethodID,
    });
    const payRes = await this.stripe.invoices.pay(invoice.id);
    return payRes;
  }
}

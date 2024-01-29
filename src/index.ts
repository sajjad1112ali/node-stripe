import { PaymentService } from './services/payment';
import { OrderItems } from './services/types';
const paymentService = new PaymentService();
(async () => {
  const customerID = 'cus_PRdLv87By7omfW';
  const paymentMethodID = 'pm_1Ock5iHcesNADLDePEw76LoY';
  const orderItems: OrderItems = [
    {
      name: 'product 1',
      price: 20,
      quantity: 2,
    },
    {
      name: 'product 2',
      price: 10,
      quantity: 1,
    },
    {
      name: 'product 3',
      price: 5,
      quantity: 5,
    },
  ];
  // console.log(await paymentService.createCustomer());
  // console.log(await paymentService.checkoutSession(customerID, orderItems));
  // console.log(await paymentService.cardSession(customerID));
  // console.log(await paymentService.detachPaymentMethod(paymentMethodID));
  // console.log(await paymentService.createInvoice(customerID, paymentMethodID));
})();

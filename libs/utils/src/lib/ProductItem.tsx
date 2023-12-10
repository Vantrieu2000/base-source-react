/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import * as _ from 'lodash';
import * as uuid from 'uuid';
export class ProductItem {
  public readonly key: string = uuid.v1();
  public order_product_name?: string;
  public product_id?: number;
  public quantity: number;
  public price?: number;
  public tax_id?: number;
  public tax_rate: number;
  public tax_round_type?: string;
  public unit_id?: number;


  constructor(productItem: Partial<ProductItem>) {
    this.order_product_name = productItem.order_product_name;
    this.product_id = productItem.product_id;
    this.quantity = productItem.quantity || 1;
    this.price = productItem.price;
    this.tax_id = productItem.tax_id;
    this.tax_rate = productItem.tax_rate || 0;
    this.tax_round_type = productItem.tax_round_type || '1';
    this.unit_id = productItem.unit_id;

  }

  get amount() {
    return this.price ? this.price * this.quantity : 0;
  }

  get amount_with_tax() {
    const price = this.price
      ? this.price * this.quantity * (1 + this.tax_rate / 100)
      : 0;

    if (!price) {
      return price;
    }

    if (this.tax_round_type === '0') {
      return Math.floor(price);
    } else if (this.tax_round_type === '2') {
      return Math.ceil(price);
    } else {
      return Math.round(price);
    }
  }

  get tax_amount() {
    return this.amount_with_tax - this.amount;
  }

  get raw() {
    return {
      ...this,
      amount: Math.round(this.amount),
      amount_with_tax: this.amount_with_tax,
    };
  }
}

export const totalProductAmount = (products: ProductItem[], withTax = true) => {
  return _.reduce(
    products,
    (sum, product: ProductItem) => {
      if (!(product instanceof ProductItem)) {
        product = new ProductItem(product);
      }
      const price = withTax ? product.amount_with_tax : product.amount;
      return sum + price;
    },
    0
  );
};

export const amountWithTax = (
  amount: number,
  tax: { rate: number; round_type: string }
) => {
  const amount_with_tax = amount * (1 + tax.rate / 100);

  if (tax.round_type === '0') {
    return Math.floor(amount_with_tax);
  } else if (tax.round_type === '2') {
    return Math.ceil(amount_with_tax);
  } else {
    return Math.round(amount_with_tax);
  }
};

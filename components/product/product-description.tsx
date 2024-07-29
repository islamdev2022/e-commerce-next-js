import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { VariantSelector } from './variant-selector';

export interface Product {
  title: string;
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  options: Array<{id:string, name: string; values: string[] }>;
  variants: Array<{ id: string; title: string; price: string; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> }>;
  descriptionHtml?: string;
}

const mockProduct: Product = {
  title: "Mock Product",
  priceRange: {
    maxVariantPrice: {
      amount: "99.99",
      currencyCode: "USD",
    },
  },
  options: [
    { id: "1", name: "Size", values: ["S", "M", "L", "XL"] },
    { id: "2", name: "Color", values: ["Red", "Green", "Blue"] },
  ],
  variants: [
    { id: "1", title: "Small - Red", price: "99.99", availableForSale: true, selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "Red" }] },
    { id: "2", title: "Medium - Green", price: "99.99", availableForSale: true, selectedOptions: [{ name: "Size", value: "M" }, { name: "Color", value: "Green" }] },
    { id: "3", title: "Large - Blue", price: "99.99", availableForSale: true, selectedOptions: [{ name: "Size", value: "L" }, { name: "Color", value: "Blue" }] },
  ],
  descriptionHtml: "<p>This is a mock product description.</p>",
};

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart 
      // product={product}
       />
    </>
  );
}
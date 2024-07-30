import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { VariantSelector } from './variant-selector';
import { Product,mockProducts } from 'components/FakeProduct';


export function ProductDescription({ mockProduct }: { mockProduct: Product }) {
  return (
    <>
   
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{mockProduct.title}</h1>
        <p>{mockProduct.description}</p>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={mockProduct.priceRange.maxVariantPrice.amount}
            currencyCode={mockProduct.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        {/* <div>
          <img
            src={mockProduct.featuredImage.url}
            alt={mockProduct.featuredImage.altText}
            width={mockProduct.featuredImage.width}
            height={mockProduct.featuredImage.height}
          />
        </div>
        <div className="flex space-x-2">
          {mockProduct.images.map((image, index) => (
            <img key={index} src={image.url} alt={image.altText} className="w-16 h-16 object-cover" />
          ))}
        </div> */}
      </div>
      fsdlhfmsdkhfdsi
      <VariantSelector options={mockProduct.options} variants={mockProduct.variants} />
      {mockProduct.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={mockProduct.descriptionHtml}
        />
      ) : null}
      <AddToCart 
      product={mockProduct}
       />
    </>
  );
}

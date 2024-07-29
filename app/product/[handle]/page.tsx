import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import Link from 'next/link';
import { Suspense } from 'react';

// Mock data and functions
const HIDDEN_PRODUCT_TAG = 'hidden';
const mockProduct = {
  id: '1',
  handle: 'mock-product',
  title: 'Mock Product',
  description: 'This is a mock product description.',
  featuredImage: {
    url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg',
    width: 600,
    height: 400,
    altText: 'Mock Product Image'
  },
  images: [
    { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 1' },
    { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 2' }
  ],
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: '10.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '20.00', currencyCode: 'USD' }
  },
  seo: {
    title: 'Mock Product SEO Title',
    description: 'Mock Product SEO Description'
  }
};

const getProduct = async (handle: string) => {
  return handle === 'mock-product' ? mockProduct : null;
};

const getProductRecommendations = async (id: string) => {
  return [mockProduct, mockProduct, mockProduct];
};

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return (
    <ProductProvider>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <p className="mb-8 text-5xl font-bold">{product.title}</p>
              <p className="text-lg">{product.description}</p>
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

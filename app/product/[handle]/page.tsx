import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProductDescription } from 'components/product/product-description';
import { mockProducts } from 'components/FakeProduct';

const HIDDEN_PRODUCT_TAG = 'hidden';

// Function to fetch the product based on the handle
const getProduct = async (handle: string) => {
  return mockProducts.find((product) => product.handle === handle) || null;
};

const getProductRecommendations = async (id: string) => {
  return [mockProducts[0], mockProducts[1], mockProducts[2]];
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
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              {product && <ProductDescription mockProduct={product} />}
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
            key={product?.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product?.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product?.title || ''}
                label={{
                  title: product?.title ?? '',
                  amount: product?.priceRange.maxVariantPrice.amount ?? '',
                  currencyCode: product?.priceRange.maxVariantPrice.currencyCode ?? '',
                }}
                src={product?.featuredImage?.url ?? ""}
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

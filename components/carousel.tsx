import Link from 'next/link';
import { GridTileImage } from './grid/tile';

type Product = {
  handle: string;
  title: string;
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
  };
};

// Mock data
const mockProducts: Product[] = [
  {
    handle: 'product-1',
    title: 'Mock Product 1',
    priceRange: {
      maxVariantPrice: {
        amount: '29.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg'
    }
  },
  {
    handle: 'product-2',
    title: 'Mock Product 2',
    priceRange: {
      maxVariantPrice: {
        amount: '49.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg'
    }
  },
  {
    handle: 'product-3',
    title: 'Mock Product 3',
    priceRange: {
      maxVariantPrice: {
        amount: '39.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg'
    }
  }
];

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = [...mockProducts, ...mockProducts, ...mockProducts]; // Duplicating products for the carousel

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {products.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url ?? ''}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

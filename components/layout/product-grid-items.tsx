import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

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
  }
];

export default function ProductGridItems({ mockProducts }: { mockProducts: Product[] }) {
  return (
    <>
      {mockProducts.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
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
              src="/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg"
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}

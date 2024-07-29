import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';

import { sorting, defaultSort } from 'lib/constants';

// Mock data and functions
const mockProducts = [
  {
    handle: 'mock-product-1',
    title: 'Mock Product 1',
    priceRange: {
      maxVariantPrice: { amount: '29.99', currencyCode: 'USD' }
    },
    featuredImage: { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Mock Product 1' }
  },
  {
    handle: 'mock-product-2',
    title: 'Mock Product 2',
    priceRange: {
      maxVariantPrice: { amount: '39.99', currencyCode: 'USD' }
    },
    featuredImage: { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Mock Product 2' }
  },
  {
    handle: 'mock-product-3',
    title: 'Mock Product 3',
    priceRange: {
      maxVariantPrice: { amount: '49.99', currencyCode: 'USD' }
    },
    featuredImage: { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Mock Product 3' }
  }
];

const getProducts = async ({
  sortKey,
  reverse,
  query
}: {
  sortKey?: string;
  reverse?: boolean;
  query?: string;
}) => {
  // For simplicity, ignoring sortKey, reverse, and query parameters
  return mockProducts;
};

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems mockProducts={products} />
        </Grid>
      ) : null}
    </>
  );
}

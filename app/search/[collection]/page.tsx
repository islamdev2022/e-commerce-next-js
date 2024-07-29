import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { sorting, defaultSort } from 'lib/constants';

// Mock data and functions
const mockCollection = {
  title: 'Mock Collection',
  seo: {
    title: 'Mock Collection SEO Title',
    description: 'Mock Collection SEO Description'
  },
  description: 'This is a mock collection description.'
};

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

const getCollection = async (collection: string) => {
  return collection === 'mock-collection' ? mockCollection : null;
};

const getCollectionProducts = async ({
  collection,
  sortKey,
  reverse
}: {
  collection: string;
  sortKey?: string;
  reverse?: boolean;
}) => {
  return collection === 'mock-collection' ? mockProducts : [];
};

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems mockProducts={products} />
        </Grid>
      )}
    </section>
  );
}

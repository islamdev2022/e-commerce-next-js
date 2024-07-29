'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PathFilterItem = {
  title: string;
  path: string;
};

type SortFilterItem = {
  title: string;
  slug: string;
};

type ListItem = PathFilterItem | SortFilterItem;

function createUrl(path: string, params: URLSearchParams): string {
  const url = new URL(path, window.location.origin);
  url.search = params.toString();
  return url.toString();
}

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  newParams.delete('q');

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />;
}

// Mock data for testing
const mockPathFilterItem: PathFilterItem = {
  title: 'Home',
  path: '/'
};

const mockSortFilterItem: SortFilterItem = {
  title: 'Price: Low to High',
  slug: 'price-asc'
};

// Render components with mock data for testing
<FilterItem item={mockPathFilterItem} />;
<FilterItem item={mockSortFilterItem} />;

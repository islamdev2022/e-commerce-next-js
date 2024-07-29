import type { Metadata } from 'next';
import Prose from 'components/prose';
import { notFound } from 'next/navigation';

// Mock data and functions
const mockPage = {
  title: 'Mock Page Title',
  body: '<p>This is a mock page body content.</p>',
  bodySummary: 'Mock page summary.',
  seo: {
    title: 'Mock Page SEO Title',
    description: 'Mock Page SEO Description'
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-07-29T00:00:00Z'
};

const getPage = async (page: string) => {
  return page === 'mock-page' ? mockPage : null;
};

// Uncomment and use this function if needed for metadata generation
// export async function generateMetadata({
//   params
// }: {
//   params: { page: string };
// }): Promise<Metadata> {
//   const page = await getPage(params.page);

//   if (!page) return notFound();

//   return {
//     title: page.seo?.title || page.title,
//     description: page.seo?.description || page.bodySummary,
//     openGraph: {
//       publishedTime: page.createdAt,
//       modifiedTime: page.updatedAt,
//       type: 'article'
//     }
//   };
// }

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}

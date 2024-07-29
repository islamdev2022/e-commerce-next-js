import OpengraphImage from 'components/opengraph-image';

// Mock data and function
const mockPage = {
  title: 'Mock Page Title',
  seo: {
    title: 'Mock Page SEO Title'
  }
};

const getPage = async (page: string) => {
  return page === 'mock-page' ? mockPage : null;
};

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) {
    return new Response('Page not found', { status: 404 });
  }

  const title = page.seo?.title || page.title;
  return await OpengraphImage({ title });
}

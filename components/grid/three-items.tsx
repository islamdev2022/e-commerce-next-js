import {GridTileImage} from 'components/grid/tile';
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
  featuredImage: {
    url: string;
  };
};

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
      url: 'https://www.bing.com/images/search?view=detailV2&ccid=jUhREZmY&id=57C5F65C31F001A3E1587A956615A44155BE9D0B&thid=OIP.jUhREZmYLBkJCe7cmSdevwHaEX&mediaurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.8d48511199982c190909eedc99275ebf%3Frik%3DC52%252bVUGkFWaVeg%26riu%3Dhttp%253a%252f%252fwww.hdwallpaper.nu%252fwp-content%252fuploads%252f2015%252f06%252fDragon-Ball-Z-Wallpapers-HD.jpg%26ehk%3DiiLYrqVPmjLsWuSQFx9Ew6JlHiNfo4mzV5RKzSJZW3U%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=2356&expw=4000&q=dragon+ball+z&simid=608003521201322709&form=IRPRST&ck=B0FF689987380B333F3B323C4CD8BC46&selectedindex=2&itb=0&ajaxhist=0&ajaxserp=0&vt=0&sim=11'
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
      url: 'https://www.bing.com/images/search?view=detailV2&ccid=jUhREZmY&id=57C5F65C31F001A3E1587A956615A44155BE9D0B&thid=OIP.jUhREZmYLBkJCe7cmSdevwHaEX&mediaurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.8d48511199982c190909eedc99275ebf%3Frik%3DC52%252bVUGkFWaVeg%26riu%3Dhttp%253a%252f%252fwww.hdwallpaper.nu%252fwp-content%252fuploads%252f2015%252f06%252fDragon-Ball-Z-Wallpapers-HD.jpg%26ehk%3DiiLYrqVPmjLsWuSQFx9Ew6JlHiNfo4mzV5RKzSJZW3U%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=2356&expw=4000&q=dragon+ball+z&simid=608003521201322709&form=IRPRST&ck=B0FF689987380B333F3B323C4CD8BC46&selectedindex=2&itb=0&ajaxhist=0&ajaxserp=0&vt=0&sim=11'
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
      url: 'https://www.bing.com/images/search?view=detailV2&ccid=jUhREZmY&id=57C5F65C31F001A3E1587A956615A44155BE9D0B&thid=OIP.jUhREZmYLBkJCe7cmSdevwHaEX&mediaurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.8d48511199982c190909eedc99275ebf%3Frik%3DC52%252bVUGkFWaVeg%26riu%3Dhttp%253a%252f%252fwww.hdwallpaper.nu%252fwp-content%252fuploads%252f2015%252f06%252fDragon-Ball-Z-Wallpapers-HD.jpg%26ehk%3DiiLYrqVPmjLsWuSQFx9Ew6JlHiNfo4mzV5RKzSJZW3U%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=2356&expw=4000&q=dragon+ball+z&simid=608003521201322709&form=IRPRST&ck=B0FF689987380B333F3B323C4CD8BC46&selectedindex=2&itb=0&ajaxhist=0&ajaxserp=0&vt=0&sim=11'
    }
  }
];

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Using mock data for the homepage items
  const homepageItems = [...mockProducts];

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}

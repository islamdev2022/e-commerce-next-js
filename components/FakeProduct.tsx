export interface ProductVariant {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }
  
  export interface CartItem {
    id?: string;
    quantity: number;
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
    merchandise: {
      id: string;
      title: string;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
      product: {
        id: string;
        handle: string;
        title: string;
        featuredImage: {
          url: string;
        };
      };
    };
  }

  export interface Cart {
    taxAmount: any;
    totalAmount: any;
    id?: string;
    checkoutUrl: string;
    totalQuantity: number;
    lines: CartItem[];
    cost: {
      subtotalAmount: {
        amount: string;
        currencyCode: string;
      };
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
      totalTaxAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  }
  
  
export interface Product {
    id: string;
    handle: string;
    title: string;
    description: string;
    featuredImage: {
      url: string;
      width: number;
      height: number;
      altText: string;
    };
    images: Array<{ url: string; altText: string }>;
    tags: string[];
    availableForSale: boolean;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    seo: {
      title: string;
      description: string;
    };
    options: Array<{ id: string; name: string; values: string[] }>;
    variants: Array<{ id: string; title: string; price: string; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> }>;
    descriptionHtml?: string;
  }
  

export const mockProducts: Product[] = [
    {
        id: '1',
        handle: 'mock-product-1',
        title: 'Mock Product 1',
        description: 'This is a mock product description for product 1 okoko.',
        featuredImage: {
          url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg',
          width: 600,
          height: 400,
          altText: 'Mock Product Image 1',
        },
        images: [
          { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 1' },
          { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 2' },
        ],
        tags: [],
        availableForSale: true,
        priceRange: {
          minVariantPrice: { amount: '10.00', currencyCode: 'USD' },
          maxVariantPrice: { amount: '20.00', currencyCode: 'USD' },
        },
        seo: {
          title: 'Mock Product SEO Title 1',
          description: 'Mock Product SEO Description 1',
        },
        options: [
          { id: '1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
          { id: '2', name: 'Color', values: ['Red', 'Green', 'Blue'] },
        ],
        variants: [
          {
            id: '1',
            title: 'Small - Red',
            price: '99.99',
            availableForSale: true,
            selectedOptions: [
              { name: 'Size', value: 'S' },
              { name: 'Color', value: 'Red' },
            ],
          },
          {
            id: '2',
            title: 'Medium - Green',
            price: '99.99',
            availableForSale: true,
            selectedOptions: [
              { name: 'Size', value: 'M' },
              { name: 'Color', value: 'Green' },
            ],
          },
          {
            id: '3',
            title: 'Large - Blue',
            price: '99.99',
            availableForSale: true,
            selectedOptions: [
              { name: 'Size', value: 'L' },
              { name: 'Color', value: 'Blue' },
            ],
          },
        ],
        descriptionHtml: '<p>This is a mock product description for product 1.</p>',
      },
      {
        id: '2',
  handle: 'mock-product-2',
  title: 'Mock Product 2',
  description: 'This is a mock product description for product 2.',
  featuredImage: {
    url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg',
    width: 600,
    height: 400,
    altText: 'Mock Product Image 2',
  },
  images: [
    { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 1' },
    { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 2' },
  ],
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: '10.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '20.00', currencyCode: 'USD' },
  },
  seo: {
    title: 'Mock Product SEO Title 2',
    description: 'Mock Product SEO Description 2',
  },
  options: [
    { id: '1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
    { id: '2', name: 'Color', values: ['Red', 'Green', 'Blue'] },
  ],
  variants: [
    {
      id: '1',
      title: 'Small - Red',
      price: '99.99',
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: 'S' },
        { name: 'Color', value: 'Red' },
      ],
    },
    {
      id: '2',
      title: 'Medium - Green',
      price: '99.99',
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: 'M' },
        { name: 'Color', value: 'Green' },
      ],
    },
    {
      id: '3',
      title: 'Large - Blue',
      price: '99.99',
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: 'L' },
        { name: 'Color', value: 'Blue' },
      ],
    },
  ],
  descriptionHtml: '<p>This is a mock product description for product 2.</p>',
      },
      {
        id: '3',
  handle: 'mock-product-3',
  title: 'Mock Product 3',
  description: 'This is a mock product description for product 3.',
  featuredImage: {
    url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg',
    width: 600,
    height: 400,
    altText: 'Mock Product Image 3',
  },
  images: [
    { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 1' },
    { url: '/assets/_cae479a4-40f9-4d38-8130-9dba498e7467.jpg', altText: 'Image 2' },
  ],
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: '10.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '20.00', currencyCode: 'USD' },
  },
  seo: {
    title: 'Mock Product SEO Title 3',
    description: 'Mock Product SEO Description 3',
  },
  options: [
    { id: '1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
    { id: '2', name: 'Color', values: ['Red', 'Green', 'Blue'] },
  ],
  variants: [
    {
      id: '1',
      title: 'Small - Red',
      price: '99.99',
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: 'S' },
        { name: 'Color', value: 'Red' },
      ],
    },
    {
      id: '2',
      title: 'Medium - Green',
      price: '99.99',
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: 'M' },
        { name: 'Color', value: 'Green' },
      ],
    },
    {
      id: '3',
      title: 'Large - Blue',
      price: '99.99',
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: 'L' },
        { name: 'Color', value: 'Blue' },
      ],
    },
  ],
  descriptionHtml: '<p>This is a mock product description for product 3.</p>',
      }
];

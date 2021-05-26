/* used for tests */
const cards = {
  totalItems: 4,
  items: [
    {
      id: 'id 1',
      volumeInfo: {
        imageLinks: {
          thumbnail: 'http://www.dummycover1.com',
        },
        title: 'Title 1',
        authors: ['Author 1'],
        publisher: 'Publisher 1',
        infoLink: 'https://www.dummylink1.com',
      },
    },
    {
      id: 'id 2',
      volumeInfo: {
        title: 'Title 2',
        authors: ['Author 2', 'Author 3'],
        publisher: 'Publisher 2',
        infoLink: 'https://www.dummylink2.com',
      },
    },
    {
      id: 'id 3',
      volumeInfo: {},
    },
    {
      id: 'id 4',
      volumeInfo: {
        authors: ['Author 4', 'Author 5', 'Author 6'],
      },
    },
  ],
};

export default cards;

export const noCards = {
  totalItems: 0,
};

export const manyCards1 = {
  totalItems: 24,
  items: [
    {
      id: 'id 1',
      volumeInfo: {
        title: 'Title 1',
      },
    },
    {
      id: 'id 2',
      volumeInfo: {},
    },
    {
      id: 'id 3',
      volumeInfo: {},
    },
    {
      id: 'id 4',
      volumeInfo: {},
    },
    {
      id: 'id 5',
      volumeInfo: {},
    },
    {
      id: 'id 6',
      volumeInfo: {},
    },
    {
      id: 'id 7',
      volumeInfo: {},
    },
    {
      id: 'id 8',
      volumeInfo: {},
    },
    {
      id: 'id 9',
      volumeInfo: {},
    },
    {
      id: 'id 10',
      volumeInfo: {},
    },
  ],
};

export const manyCards2 = {
  totalItems: 24,
  items: [
    {
      id: 'id 11',
      volumeInfo: {
        title: 'Title 11',
      },
    },
    {
      id: 'id 12',
      volumeInfo: {},
    },
    {
      id: 'id 13',
      volumeInfo: {},
    },
    {
      id: 'id 14',
      volumeInfo: {},
    },
    {
      id: 'id 15',
      volumeInfo: {},
    },
    {
      id: 'id 16',
      volumeInfo: {},
    },
    {
      id: 'id 17',
      volumeInfo: {},
    },
    {
      id: 'id 18',
      volumeInfo: {},
    },
    {
      id: 'id 19',
      volumeInfo: {},
    },
    {
      id: 'id 20',
      volumeInfo: {},
    },
  ],
};

export const manyCards3 = {
  totalItems: 24,
  items: [
    {
      id: 'id 21',
      volumeInfo: {
        title: 'Title 21',
      },
    },
    {
      id: 'id 22',
      volumeInfo: {},
    },
    {
      id: 'id 23',
      volumeInfo: {},
    },
    {
      id: 'id 24',
      volumeInfo: {},
    },
  ],
};

/* used for displaying cards to create/check layout */
export const testCards = [
  {
    id: 'id 1',
    volumeInfo: {
      title: 'The Meaning of Liff',
      authors: ['Douglas Adams', 'John Lloyd'],
      publisher: 'Pan Macmillan',
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=-VMnAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      infoLink:
        'http://books.google.co.uk/books?id=-VMnAAAAQBAJ&dq=intitle:%22the+meaning+of+liff%22&hl=&source=gbs_api',
    },
  },
  {
    id: 'id 2',
    volumeInfo: {
      title: "Dirk Gently's Holistic Detective Agency",
      authors: ['Douglas Adams'],
      publisher: 'Simon and Schuster',
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=4FmpBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      infoLink: '#',
    },
  },
  {
    id: 'id 3',
    volumeInfo: {
      title: 'Title',
      authors: ['Author 1', 'Author 2', 'Author 3'],
      publisher: 'Publisher',
      infoLink: 'http://www.dummylink.com',
    },
  },
];

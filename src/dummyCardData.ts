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
  totalItems: 14,
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
  totalItems: 14,
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
  ],
};

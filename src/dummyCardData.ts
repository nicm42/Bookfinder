const cards = {
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

export const noCards = [false];

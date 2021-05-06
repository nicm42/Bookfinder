import { Card, Cover, Title, Author, Publisher } from './Books.styles';

const Books = () => {
  const cards = [
    {
      id: 'id 1',
      cover:
        'http://books.google.com/books/content?id=f280CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      title: 'Harry Potter: The Complete Collection (1-7)',
      author: 'J.K. Rowling',
      publisher: 'Pottermore Publishing',
      link:
        'https://play.google.com/store/books/details?id=f280CwAAQBAJ&source=gbs_api',
    },
    {
      id: 'id 2',
      cover:
        'http://books.google.com/books/content?id=N6DeDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      title: 'Harry Potter and the Deathly Hallows',
      author: 'J. K. Rowling',
      publisher: 'Bloomsbury Publishing',
      link:
        'http://books.google.co.uk/books?id=N6DeDQAAQBAJ&dq=harry+potter&hl=&source=gbs_api',
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <Card key={card.id} data-testid="card">
          <Cover src={card.cover} />
          <Title data-testid="title">{card.title}</Title>
          <Author data-testid="author">{card.author}</Author>
          <Publisher data-testid="publisher">{card.publisher}</Publisher>
          <a href={card.link}>More information</a>
        </Card>
      ))}
    </>
  );
};

export default Books;

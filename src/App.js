import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Card, Column, Tile, Level, Image, Media, Navbar } from 'rbx';

const ProductTile = ({img, title, price}) => ( //creates one tile
        <Card width="300px">
          <Card.Image>
            <Image.Container>
              <Image src= { img } />
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media.Item>
              <Title>{ title }</Title>
              <Title>{ price }</Title>
            </Media.Item>
          </Card.Content>
          <Level.Item>
            <Button>Add to Cart</Button>
          </Level.Item>
        </Card>
);


const ProductTable = ({productList}) => (
  <Level>
    <Level.Item>
      {/* <Tile size={20}> */}
      <Column.Group multiline={ true }>
        { productList.map(product => 
          <Column key={ product.sku}>  {/* change key */}
            <ProductTile key={ product.sku } 
                        img={ product.img } 
                        title={ product.title }
                        price={ product.price } />
          </Column> )}
      </Column.Group>
      {/* </Tile> */}
    </Level.Item>
  </Level>
);

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      {/* <Navbar.Menu>Menu</Navbar.Menu> */}
      <ProductTable productList={ products} />
    </Container>
    // <ul>
    //   {products.map(product => <li key={product.sku}>{product.title}</li>)}
    // </ul>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import AppBar from '@material-ui/core/Button';
import { Button, Container, Title, Card, Column, Level, Image, Media, Navbar, Dropdown, Icon } from 'rbx';
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// let picturesLarge = ["100_1", "101_1","876661122392077_1", "5619496040738316_1", "6090484789343891_1", "8552515751438644_1", "9197907543445676_1", "10412368723880252_1", "10547961582846888_1", "10686354557628304_1","11033926921508488_1","11600983276356164_1"]
const ProductTile = ({img, title, price}) => ( //creates one tile
        <Card width="300px">
          <Card.Image>
            <Image.Container>
              <Image src= { img } />
              {/* {console.log("img is: ", {img})} */}
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media.Item>
             <Level.Item><Title subtitle={true}>{ title }</Title></Level.Item>
              <Level.Item><Title subtitle={true}>{ price }</Title></Level.Item>
            </Media.Item>
          </Card.Content>
          <Level.Item>
            <Button size={"medium"} color={"black"} fullwidth={true}>Add to Cart</Button>
          </Level.Item>
        </Card>
);


const ProductTable = ({productList}) => (
  <Column.Group multiline={ true }>
    { productList.map(product =>
      {
        let str = "./data/products/" + product.sku + "_1.jpg";
        return (
        <Column key={ product.sku} size={3}>  {/* change key */}
          <ProductTile key={ product.sku } 
                      img={ str }
                        title={ product.title }
                        price={ product.currencyFormat + product.price } />
         </Column>); 
      }
    )
    }
  </Column.Group>
);



const PriceFilter = ({}) => (
  <Dropdown>
            <Dropdown.Trigger>
              <Button>
               <span>Select</span>
               <Icon>
                 {/* <FontAwesomeIcon icon={fas}/> */}
                 {/* <i class="fas fa-caret-down"></i> */}
               </Icon>
             </Button>
            </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Content>
                  <Dropdown.Item>Select</Dropdown.Item>
                  <Dropdown.Item>Lowest to Highest</Dropdown.Item>
                  <Dropdown.Item>Highest to Lowest</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Menu>
          </Dropdown>
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
      <Navbar transparent>
        <Navbar.Segment align="end">
          <Navbar.Item>
              <Title>shopping cart</Title>
          </Navbar.Item> 
        </Navbar.Segment>
      </Navbar>
      <Column.Group>
        <Column size="one-fifth" multiline={true}>
          <Title size={5}>Sizes:</Title>
          <Button.Group >
            <Button rounded={true} color={"light"}>S</Button>
            <Button rounded={true} color={"light"}>M</Button>
            <Button rounded={true} color={"light"}>L</Button>
            <Button rounded={true} color={"light"}>XL</Button>
          </Button.Group>
        </Column>
        <Column>
          <Container>
            <Level>
              <Level.Item align="Left">X Product(s) found. </Level.Item>
              <Level.Item as="div" align="right">
                <Title subtitle={true} spaced={true}> Order By  </Title> 
                <PriceFilter />
              </Level.Item>
            </Level>
            <ProductTable productList={products} />
          </Container>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default App;
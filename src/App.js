import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import Sidebar from "react-sidebar";
import { Button, Container, Title, Card, Column, Level, Image, Media, Navbar, Dropdown, Icon } from 'rbx';
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const buttonStyle ={
  margin: "15px"
}

const cartStyle = {
  sidebar: {
    // padding: "5px",
    position: "relative",
    background: "black"
  },
  overlay: {
    position:"absolute"
  }
}

const CartTile = ({img, title, size, desc, quantity, price}) => {
  <Level>
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={ img }/>
        </Image.Container>
      </Card.Image>
    <Title> {title} </Title>
    <Title subtitle>{ size }</Title><Title subtitle>{ desc }</Title>
    <Title subtitle>Quantity: { quantity }</Title>
    <Title subtitle>{price}</Title>
    </Card>
  </Level>
}

const ProductTile = ({img, title, price}) => { //creates one tile
  const [cartList, setCartList] = useState([]);

  return (
        <Card width="300px">
          <Card.Image>
            <Image.Container>
              <Image src= { img } />
              {/* {console.log("img is: ", {img})} */}
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media.Item>
             <Level.Item><Title subtitle={true} size={6}>{ title }</Title></Level.Item>
              <Level.Item><Title subtitle={true}>{ price }</Title></Level.Item>
            </Media.Item>
          </Card.Content>
          <Level.Item>
            <Button size={"medium"} color={"black"} fullwidth={true} onClick={() => {
              addToCart(title, cartList); 
              setCartList(cartList)}
            }>Add to Cart</Button>  
          </Level.Item>
        </Card>
  );
};

function addToCart(title, cartList) {
  let contains = false
  let index;
  for(let i = 0; i < cartList.length -1; i++){
    if(cartList[i][0] === title) {
      contains = true;
      index = i;
    }
  }
  if(contains){
    cartList[index][1]++
  } else {
    cartList.push([title, 1]);
  }
  return cartList
}

const CartContainer = ({ cartOpen, setCartOpen }) => (
  <Sidebar sidebar={"Hello"}
           pullRight={true}
           open={cartOpen}
           onSetOpen={setCartOpen}
           styles={cartStyle}>
    <button style={buttonStyle} onClick={() => {
      setCartOpen(true);
      cartList.map(item =>  //HOW DO I PASS THE CARTLIST TO HERE?????
        <CartTile >
          img= {item.img}
          title={item.title}
          size={item.size}
          desc={item.desc}
          quantity={item.quantity}
          price={item.price}
        </CartTile>)
    }
    }>Cart</button>
  </Sidebar>
);

const ProductTable = ({productList}) => (
  <Column.Group multiline>
    { productList.map(product =>
        {
          let str = "./data/products/" + product.sku + "_1.jpg";
          return (
          <Column key={ product.sku} size={4}>  {/* change key */}
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

const SizeFilter = ({}) => (
  <Column size="one-fifth" >
    <Title size={5}>Sizes:</Title>
    <Button.Group >
      <Button rounded={true} color={"light"}>S</Button>
      <Button rounded={true} color={"light"}>M</Button>
      <Button rounded={true} color={"light"}>L</Button>
      <Button rounded={true} color={"light"}>XL</Button>
    </Button.Group>
  </Column>
)

const PriceFilterRow = ({}) => (
  <Level>
    <Level.Item align="Left">X Product(s) found. </Level.Item>
    <Level.Item as="div" align="right">
      <Title subtitle={true} spaced={true}> Order By  </Title> 
      <PriceFilter />
    </Level.Item>
  </Level>
)

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [cartOpen, setCartOpen] = useState(false);
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
      <Column.Group>
        <Column size={1}><CartContainer cartOpen={cartOpen} setCartOpen={setCartOpen}/></Column>
        <SizeFilter/>
        <Column>
          <Container>
            <PriceFilterRow/>
            <ProductTable productList={products} />
          </Container>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default App;
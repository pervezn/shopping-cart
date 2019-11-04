import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
// import Sidebar from "react-sidebar";
// import { FaShoppingCart } from 'react-icons/fa';
import { Button, Container, Title, Card, Column, Modal, Content, Level, Image, Media, Navbar, Dropdown, Icon } from 'rbx';
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const buttonStyle ={
  margin: "15px"
}

// const cartStyle = {
//   sidebar: {
//     // padding: "5px",
//     position: "relative",
//     background: "black"
//   },
//   overlay: {
//     position:"absolute"
//   }
// }

const CartTile = ({item, size, numItem, remove }) => {
  console.log("ITEMS ARE: ", item);
  return (
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={'./data/products/' + item.sku + '_1.jpg'} />
        </Image.Container>
      </Card.Image>
      <Card.Content>
        <Content>
          {item.title} <br/>
          {item.style} <br/>
          {'$' + numItem*item.price} <br/>
          {"Quantity: " + numItem} <br/>
          <Button onClick={() => {remove(item.sku, size); }}>Remove</Button>
        </Content>
      </Card.Content>
    </Card>
  )
};

const ProductTile = ({product, addToCart}) => { //creates one tile
  const [cartList, setCartList] = useState([]);

  return (
        <Card width="300px">
          <Card.Image>
            <Image.Container>
              <Image src={'./data/products/' + product.sku + '_1.jpg'} />
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media.Item>
             <Level.Item><Title subtitle={true} size={6}>{ product.title }</Title></Level.Item>
              <Level.Item><Title subtitle={true}>{'$' + product.price }</Title></Level.Item>
            </Media.Item>
          </Card.Content>
          <Level.Item> 
            <Button.Group >
              <Button rounded={true} color={"light"} onClick={() => addToCart(product.sku, 'S')}>S</Button>
              <Button rounded={true} color={"light"} onClick={() => addToCart(product.sku, 'M')}>M</Button>
              <Button rounded={true} color={"light"} onClick={() => addToCart(product.sku, 'L')}>L</Button>
              <Button rounded={true} color={"light"} onClick={() => addToCart(product.sku, 'XL')}>XL</Button>
            </Button.Group>
          </Level.Item>
          <Level.Item>
            <Button size={"medium"} color={"black"} fullwidth={true} 
            // onClick={() => {
            //   addToCart(title, cartList); 
            //   setCartList(cartList)}
            // }
            >Add to Cart</Button>  
          </Level.Item>
        </Card>
  );
};


// const CartContainer = ({ cartOpen, setCartOpen, contents }) => (
//   <Sidebar sidebar={contents}
//            pullRight={true}
//            open={cartOpen}
//            onSetOpen={setCartOpen}
//            styles={cartStyle}>
//     <button style={buttonStyle} onClick={() => {
//       setCartOpen(true);
//     } }>Cart</button>
//   </Sidebar>
// );

const fixedFormat = (items) => {
  let formattedItems = [];
  console.log(items)
  for(let i = 0; i < items.length; i++){
    let currItem = items[i];
    let currProd = currItem.product
    if(currItem['S'] !== 0){
      formattedItems.push([currProd, 'S', currItem['S']]);
    }
    if(currItem['M'] !== 0){
      formattedItems.push([currProd, 'M', currItem['M']]);
    }
    if(currItem['L'] !== 0){
      formattedItems.push([currProd, 'L', currItem['L']]);
    }
    if(currItem['XL'] !== 0){
      formattedItems.push([currProd, 'XL', currItem['XL']]);
    }
  }
  return formattedItems;
}

const Cart = ({contents, removeFromCart}) => {
  if (contents.length === 0) {
    return (
      <Container>

      </Container>
    )
  }
  const formattedItems = fixedFormat(contents);
  return (
    <Container>
      <Title>Shopping Cart</Title>
      <Column.Group multiline>
      <Column size='full'>
        </Column>
        {formattedItems.map(item => 
          <Column size='full' key={item[0].sku}>
            <CartTile key={item.productId} item={item[0]} size={item[1]} numItems={item[2]} removeFromCart={removeFromCart}/>
          </Column>
        )}
      </Column.Group>
    </Container>
  )

}

// const ProductTable = ({productList}) => (
//   <Column.Group multiline>
//     { productList.map(product =>
//         {
//           let str = "./data/products/" + product.sku + "_1.jpg";
//           return (
//           <Column key={ product.sku} size={3}>  {/* change key */}
//             <ProductTile key={ product.sku } 
//                         img={ str }
//                           title={ product.title }
//                           price={ product.currencyFormat + product.price } />
//           </Column>); 
//         }
//       )
//     }
//   </Column.Group>
// );

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
  const [contents, setContents] = useState([])
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const prodDict = {};
  for(let i = 0; i < products.length; i++){
    prodDict[products[i].sku] = products[i];
  }

  const add = (id, size) => {
    let cartContent = contents;
    let found = false;
    let i;
    for(i = 0; i < cartContent.length; i += 1){
      if(cartContent[i].productId === id){
        found = true;
        break;
      }
    }
    if(found) {
      cartContent[i][size] += 1;
    } else {
      cartContent.push({
        productId: id,
        product: parseInt(id),
        product: prodDict[id],
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
      });
      // console.log("Carcontent is: ", cartContent)
      // console.log("SIZE IS: ", size)
      // console.log("lenght is: ", cartContent.length)
      // console.log("minus 1: ", cartContent.length - 1)
      // console.log("Size is: ", cartContent[cartContent.length - 1][size])
      cartContent[cartContent.length - 1][size] += 1;
      // console.log("Size after is: ", cartContent[cartContent.length - 1][size])
    }
    // console.log(cartContent)
    setContents(cartContent);
    setCartOpen(true);
  };

  const remove = (id, size) => {
    let cartContent = contents;
    let found = false;
    let i;
    for(i = 0; i < cartContent.length; i++){
      if(cartContent[i].productId === id){
        found = true;
        break;
      }
    }
    if(found) {
      cartContent[i][size] = cartContent[i][size] > 0 ? cartContent[i][size] - 1 : 0;
    } else {
      cartContent.push({
        productId : id,
        product : prodDict[id],
        'S' : 0,
        'M' : 0,
        'X' : 0,
        'XL' : 0,
      });
      cartContent[i][size] = cartContent[i][size] > 0 ? cartContent[i][size] - 1 : 0;
    }
    setContents(cartContent);
    setCartOpen(true);
  }

  console.log("contents is: ", contents)
  return (
    <Container>
      <Navbar>
          <Navbar.Brand>
            <Navbar.Item>
              <h1 style={{ fontSize: '24px' }}><strong>T-Shirt Store</strong></h1>
            </Navbar.Item>
            <Navbar.Item>
              <Button color='black' onClick={() => setVisibility(true)}>
                {/* <Icon>
                  <FaShoppingCart />
                </Icon> */}
              </Button>
            </Navbar.Item>
          </Navbar.Brand>
      </Navbar>
      <Modal active={isVisible}>
        <Modal.Background />
        <Modal.Content>
          <Cart key="Cart" contents={contents} removeFromCart={remove}></Cart> 
          {contents}
          
        </Modal.Content>
        <Modal.Close onClick={() => setVisibility(false)} />
      </Modal>
        <Column.Group>
          <Column>
            {/* <Container> */}
              <PriceFilterRow/>
              <Column.Group multiline>
                {products.map(product =>
                  // <ProductTile product={ product } addToCart={ add }></ProductTile>
                  <ProductTile key={product.sku} product={ product } addToCart={ add }></ProductTile>
                )}
              </Column.Group>
              {/* <ProductTable productList={products} /> */}
            {/* </Container> */}
          </Column>
        </Column.Group>
    </Container>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
// import * as firebase from 'firebase';
import 'rbx/index.css';
import { Container, Column, Button, Navbar, Modal, Icon, Message } from 'rbx';
import Product from './components/Product';
import Cart from './components/Cart';
// import { FaShoppingCart } from 'react-icons/fa';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const App = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const products = Object.values(data);
  console.log("products is: ", products)
  const [isVisible, setVisibility] = useState(false);
  const [contents, setContents] = useState([]);

   // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "AIzaSyCqiYWHqPGNWL-SLEwzDBAMS0fr1PxBbZI",
    authDomain: "shopping-cart-b1fda.firebaseapp.com",
    databaseURL: "https://shopping-cart-b1fda.firebaseio.com",
    projectId: "shopping-cart-b1fda",
    storageBucket: "shopping-cart-b1fda.appspot.com",
    messagingSenderId: "316766707669",
    appId: "1:316766707669:web:4880bc20b63dc47de9675c",
    measurementId: "G-WV0J9ES84S"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  
  const db = firebase.database().ref();

  useEffect(() => { 
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json",  {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        }
      );
      const json = await response.json();
      const handleData = snap => {
        if (snap.val()) {
          let result = {};
          Object.keys(json).map(product => {
            result[product] = Object.assign(json[product], snap.val()[product])
          });
          setData(result)
        }
      };
      db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const useRenderUpdate = () => {
    const [value, set] = useState(true);
    return () => set(value => !value);
  };

  const renderUpdate = useRenderUpdate();

  const productDict = {};
  for (let i = 0; i < products.length; i += 1) {
    productDict[products[i].sku] = products[i];
  }

  const Welcome = ({ user }) => (
    <Message color="info">
      <Message.Header>
        Welcome, {user.displayName}
        <Button primary onClick={() => firebase.auth().signOut()} > 
          Log out
        </Button>
      </Message.Header>
    </Message>
  );
  
  const SignIn = () => (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  );

  const Banner = ({ user }) => (
    <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn />}
    </React.Fragment>
  );

  const addItem = (id, size) => {
    let cartContent = contents;
    let newData = data;
    let foundItem = false;
    let i;
    for (i = 0; i < cartContent.length; i += 1) {
      if (contents[i].productId === id) {
        foundItem = true;
        break;
      }
    }
    if (foundItem) {
      cartContent[i][size] += 1;
    }
    else {
      cartContent.push({
        productId: id,
        product: productDict[id],
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
      });
      cartContent[cartContent.length - 1][size] += 1;
    }
    newData[id][size] -= 1;
    setData(newData);
    setContents(cartContent);
    setVisibility(true);
    renderUpdate();
  };

  const removeItem = (id, size) => {
    let cartContent = contents;
    let newData = data;
    let foundItem = false;
    let i;
    for (i = 0; i < cartContent.length; i += 1) {
      if (cartContent[i].productId === id) {
        foundItem = true;
        break;
      }
    }
    if (foundItem) {
      cartContent[i][size] = cartContent[i][size] > 0 ? cartContent[i][size] - 1 : 0;
    }
    else {
      cartContent.push({
        productId: id,
        product: productDict[id],
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
      });
      cartContent[i][size] = cartContent[i][size] > 0 ? cartContent[i][size] - 1 : 0;
    }
    newData[id][size] += 1;
    setData(newData);
    setContents(cartContent);
    setVisibility(true);
    renderUpdate();
  };

  return (
    <Container>
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item>
            <h1 style={{ fontSize: '24px' }}><strong>T-Shirt Store</strong></h1>
          </Navbar.Item>
          <Navbar.Item>
            <Button color='black' onClick={() => setVisibility(true)}>
              <Icon>
                {/* <FaShoppingCart /> */}
              </Icon>
            </Button>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
      <Banner user={ user } />
      <Modal active={isVisible}>
        <Modal.Background />
        <Modal.Content>
          <Cart user={ user } key="Cart" contents={contents} removeFromCart={ removeItem }></Cart>
        </Modal.Content>
        <Modal.Close onClick={() => setVisibility(false)} />
      </Modal>
      <Column.Group multiline>
        {products.map(product =>
          <Product user={ user } key={product.sku} product={ product } addToCart={ addItem }></Product>
        )}
      </Column.Group>
    </Container>
  );
};

export default App;


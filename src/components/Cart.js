import React from 'react';
import 'rbx/index.css';
import { Container, Column, Title, Button } from 'rbx';
import CartItem from './CartItem';

const formatItems = (items) => {
  let formattedItems = [];
  for (let i = 0; i < items.length; i += 1) {
    let currItem = items[i];
    let product = currItem.product;
    if (currItem['S'] !== 0) {
      formattedItems.push([product, 'S', currItem['S']]);
    }
    if (currItem['M'] !== 0) {
      formattedItems.push([product, 'M', currItem['M']]);
    }
    if (currItem['L'] !== 0) {
      formattedItems.push([product, 'L', currItem['L']]);
    }
    if (currItem['XL'] !== 0) {
      formattedItems.push([product, 'XL', currItem['XL']]);
    }
  }
  return formattedItems
};

const Cart = ({ contents, removeFromCart, user }) => {
    if (contents.length === 0) {
      return (
        <Container>
          
        </Container>
      )
    }
    const formattedItems = formatItems(contents);
    let total = 0;
    for (let i = 0; i < formattedItems.length; i += 1) {
      total += formattedItems[i][0].price * formattedItems[i][2]
    }
    //console.log(formattedItems, total);
    return (
      <Container>
        <Title>Shopping Cart</Title>
        <Column.Group multiline>
          <Column size='full'>
          </Column>
          {formattedItems.map(item =>
            <Column size='full' key={item[0].sku+item[1]+String(Math.random())}>
              <CartItem user={ user } key={String(item.productId)+item[1]+String(Math.random())} item={item[0]} size={item[1]} numItems={item[2]} remove={removeFromCart} />
            </Column>
            )}
          <Column size='full'>
            <Button>Total is ${total}. Checkout?</Button>
          </Column>
        </Column.Group>
      </Container>
    )

};

export default Cart;
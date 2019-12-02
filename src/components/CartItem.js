import React from 'react';
import 'rbx/index.css';
import { Card, Button, Content, Image } from 'rbx';

const CartItem = ({ item, size, numItems, remove, user }) => {
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
                    {'$' + numItems*item.price} <br/>
                    {'Size: ' + size} <br />
                    {"Quantity: " + numItems} <br />
                    <Button onClick={() => { 
                        remove(item.sku, size); }}>
                        Remove
                    </Button>
                </Content>
            </Card.Content>
        </Card>
    )
};

export default CartItem;
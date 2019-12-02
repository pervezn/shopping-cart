import React from 'react';
import 'rbx/index.css';
import { Card, Image, Content, Column, Button } from 'rbx';

const Product = ({ product, addToCart, user }) => {
    const sText = product['S']===0 ? 'S Out of Stock' : 'S';
    const mText = product['M']===0 ? 'M Out of Stock' : 'M';
    const lText = product['L']===0 ? 'L Out of Stock' : 'L';
    const xlText = product['XL']===0 ? 'XL Out of Stock' : 'XL';
    return (
        <Column size="one-third" key={product.sku}>
            <Card>
                <Card.Image>
                    <Image.Container>
                        <Image src={'./data/products/' + product.sku + '_1.jpg'} />
                    </Image.Container>
                </Card.Image>
                <Card.Content>
                    <Content>
                        {product.title} <br/>
                        {product.style} <br/>
                        {'$' + product.price}
                        <Button.Group>
                            <Button disabled={(product['S']===0)} onClick={() => addToCart(product.sku, 'S')}>
                                {sText}
                            </Button>
                            <Button disabled={(product['M']===0)} onClick={() => addToCart(product.sku, 'M')}>
                                {mText}
                            </Button>
                            <Button disabled={(product['L']===0)} onClick={() => addToCart(product.sku, 'L')}>
                                {lText}
                            </Button>
                            <Button disabled={(product['XL']===0)} onClick={() => addToCart(product.sku, 'XL')}>
                                {xlText}
                            </Button>
                        </Button.Group>
                    </Content>
                </Card.Content>
            </Card>
        </Column>
    )
};

export default Product;
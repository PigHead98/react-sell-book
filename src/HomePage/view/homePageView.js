import React from "react";

import "./homePageView.css";
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default function HomePageView ( { clickBuy, dataBook } ) {
    return <Card>
        <CardBody>
            <CardTitle>{ dataBook.name }</CardTitle>
            <CardSubtitle>{ dataBook.title }</CardSubtitle>
            <CardText>view: { dataBook.view }</CardText>
            <Button onClick={ clickBuy }>Button</Button>
        </CardBody>
    </Card>;
}
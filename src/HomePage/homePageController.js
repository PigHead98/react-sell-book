import React, { Component } from "react";
import axios from "axios";
import HomePageView from "./view/homePageView";

import {
    CardColumns, Container, Row
} from 'reactstrap';

export class HomePageController extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            dataBook : []
        };

        this.clickBuy = this.clickBuy.bind( this );
    }

    clickBuy ( item ) {
        return ( e ) => {
            console.log( item )
        }
    }

    componentDidMount () {
        axios.get( "http://192.168.1.9:8888/book" )
            .then( res => {
                this.setState( state => {
                    return {
                        dataBook : this.state.dataBook.concat( res.data )
                    }
                } );
            } )
            .catch( err => console.log( err ) );
    }

    render () {
        const { dataBook } = this.state;
        let data = <Container>
            <Row>
                <CardColumns>
                    {
                        dataBook.map( ( item, index ) =>
                            <HomePageView
                                key={ index }
                                clickBuy={ this.clickBuy( item ) }
                                dataBook={ item }/>
                        )
                    }
                </CardColumns>
            </Row>
        </Container>;

        return dataBook.length > 1 && data
    }
}
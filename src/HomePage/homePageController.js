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

        axios( {
            method : 'get',
            url : process.env.REACT_APP_SERVER_URL + "/book",
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNTMzZmQyYjMxMjg1OWRjMDU3NTUyMyIsIm5hbWUiOiLEkMOgbyBUcsaw4budbmcgQW4iLCJlbWFpbCI6InRlc3RAZy5tIn0sImlhdCI6MTU4MzIzMTUxMSwiZXhwIjoxNTgzMjM1MTExfQ.MMlFGHQsNdetf1IvoNcvdNgA6Ag5K5RBSSpmvXxkDpk'
            },
        } )
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
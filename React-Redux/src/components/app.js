import React, { Component } from 'react';
import Search from '../containers/search';
import ListOfHotels from "../containers/list_of_hotels";

import { connect } from 'react-redux';
import { getAllHotels,getHotel } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component{
    componentWillUnmount(){
        this.props.getHotel("");
    }
    render(){
        const {getHotel,getAllHotels, searchWord} = this.props;
        let { hotels } = this.props; 
        if(searchWord.trim().length!==0){
            hotels=hotels.filter(hotel => hotel.name.toLowerCase().includes(searchWord.toLowerCase()));
        }
        return(
            <div>
                <Search getHotel={getHotel}/>
                <ListOfHotels hotels={hotels} getAllHotels={getAllHotels}/>
            </div>
        )
    }
}

function mapStateToProps({hotel}){
    return { 
        hotels:(hotel.hotel|| []),
        searchWord:(hotel.searchWord || "")
     }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getHotel, getAllHotels},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
import React, { Component } from 'react';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = { keyword:'' }
    }

    handleChange = (event) =>{
        this.setState({ keyword:event.target.value },()=> {
            this.props.getHotel(this.state.keyword);

        })
    }

    render(){
        return(
        <div className="main_search">
            <div className="searchInput_con">
                <input className="searchInput" type="text" value={this.state.keyword} onChange={this.handleChange}/>
                <img  className="image" alt="search" src="https://static.thenounproject.com/png/101791-200.png"/>
            </div>
        </div>
        )
    }
}

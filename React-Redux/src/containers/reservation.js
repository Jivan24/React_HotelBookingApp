import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { getBooking , getHotel} from '../actions';
import { bindActionCreators } from 'redux';
import Search from '../containers/search';


class Reservation extends Component {
    componentDidMount(){
        this.props.getBooking()
    }

    componentWillUnmount(){
        this.props.getHotel("");
    }

    listofbooking = (bookings) => {
        if(bookings.length===0){
            return   <center><h3>No reservation found</h3></center>
        }

        return bookings.map((book, index)=>{
                return (
                <div className="container" key={index}>
                    <br/><br/>
                    <div className="media border p-3">
                        <img src={book.cover} alt={book.city} className="mr-3 mt-3 rounded-circle"/>
                        <div className="media-body">
                            <p className="res_content"> 
                                <span>
                                    Your booking <b>{book.name}</b>  for city <b>{book.city} </b>  is confirmed  from <b>{book.startdate} </b> to <b>{book.endDate}</b> .
                                </span>
                            </p>
                        </div>
                    </div>
                </div>                        
            );
        });
    }


    render(){
        const {getHotel, searchWord } = this.props;
        let { bookings } = this.props; 
        if(searchWord.trim().length!==0){
            bookings=bookings.filter(booking => booking.name.toLowerCase().includes(searchWord.toLowerCase()));
        }
        return(
            <div>
                <Search getHotel={getHotel}/>
                <center><h2>Your Reservation</h2></center>
                {this.listofbooking(bookings)}
            </div>
        )
        
    }
    
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({ getBooking, getHotel},dispatch);
}
function mapStateToProps({hotel}){
    return{
        bookings: (hotel.bookings || []),
        searchWord:(hotel.searchWord || "")
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Reservation);
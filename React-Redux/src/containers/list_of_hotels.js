import React,{Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class ListOfHotels extends Component {

    constructor(props){
        super(props);
        this.state = {
            startdate:'',
            endDate:'',
            isSubmiting: false
        }
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getAllHotels();
    }

    handleChangeStartDate(event) {
        this.setState({startdate: event.target.value});
    }

    handleChangeEndDate(event) {
        this.setState({endDate: event.target.value});
    }

    handleSubmit=(event,value)=>{
        this.setState({isSubmiting:true});
        event.preventDefault();
         const input = {
          "id":value.id,
          "name":value.name,
          "available": value.available,
          "city": value.city,
          "cover": value.cover,
          "startdate":this.state.startdate,
          "endDate": this.state.endDate
        }

        let uri = 'http://localhost:3000/graphqlresrvation';
        axios.post(uri, { variables:input })
        .then((_) => {
                this.setState({isSubmiting:false});
                window.$('.close').click();
                window.$('.modal-backdrop').hide();
                setTimeout(()=>{
                    this.props.history.push("/reservation");
                    window.scrollTo(0,0);
                },0);
        }).catch(_=>{
            this.setState({isSubmiting:false});
        })
      }
      
    ListOfHotels = (hotel) => {
        if(hotel.length===0){
            return   <center><h3>No results found</h3></center>
        }
            return hotel.map((hotel)=>{
                var a  = hotel.name.replace(/\s/g,'')
                 return(

                    <div className="container" key={hotel.id}>
                    <br/><br/>
                        
                        <div className="media border p-3"  key={hotel.id}>
                            <img src={hotel.cover} alt={hotel.name} className="mr-3 mt-3 rounded-circle"/>
                            <div className="media-body">
                            <br/><br/>
                            <h4>{hotel.name}</h4>
                            <h4>{hotel.city}</h4>
                            <h4>Room Available: {hotel.available}</h4>
                            </div>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#'+a}>
                                   Book Hotel
                            </button>
                            <div className="modal fade" id={a}>
                                        <div className="modal-dialog">
                                        <div className="modal-content">
                                        
                                        
                                            <div className="modal-header">
                                            <h4 className="modal-title">Enter Detail for> {hotel.name}</h4>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            
                                        
                                            <div className="modal-body">
                                                    <div className="form-group">
                                                        <label htmlFor="name">City Name</label>
                                                        <input type="text" 
                                                                className="form-control" 
                                                                id="name"
                                                                value={hotel.city}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="hotel">Hotel Name</label>
                                                        <input type="text" 
                                                                className="form-control" 
                                                                id="hotel"
                                                                value={hotel.name}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="date">Check In</label>
                                                        <input type="date" 
                                                                className="form-control"
                                                                 id="date"
                                                                 value={this.state.startdate}
                                                                 onChange={this.handleChangeStartDate}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="date">Check Out</label>
                                                        <input type="date" 
                                                                className="form-control"
                                                                 id="date"
                                                                 value={this.state.enddate}
                                                                 onChange={this.handleChangeEndDate}/>
                                                    </div>
                    
                                                    <button disabled={this.state.isSubmiting} className="btn btn-success" onClick={(e)=>this.handleSubmit(e,hotel)}>
                                                        {this.state.isSubmiting ? "Booking ...." : "Book Now"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                  
                        
                )
            })
    }

    render(){
        return(
            <div>
                <center><h2>Available Hotel</h2></center>
                {this.ListOfHotels(this.props.hotels)}
            </div>
        )
        
    }
    
}

export default withRouter(ListOfHotels);
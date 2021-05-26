const URL_HOTELS = 'http://localhost:3000/graphqlhotels'
const URL_BOOKING= 'http://localhost:3000/graphqlbookings'


export function getHotel(keyword){
    return {
         type:'SEARCH_HOTELS',
         payload:keyword
     }
}

export async function getAllHotels(){
    const response = await fetch(`${URL_HOTELS}`,{method:'GET'})
    const hotelResponse = await response.json();

    let hotels = [];
    try{ hotels = hotelResponse.data.hotels; }
    catch(err){ hotels=[]; }
    
    return {
         type:'SEARCH_ALL_HOTELS',
         payload:hotels
     }
}

export async function getBooking(){
    const response = await fetch(`${URL_BOOKING}`,{method:'GET'});
    const bookingResponse = await response.json();

    let bookings = [];
    try{ bookings = bookingResponse.data.bookings; }
    catch(err){ bookings=[]; }

    return {
         type:'SEARCH_ALL_BOOKING',
         payload:bookings
     }
}


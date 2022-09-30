import React, { useState } from 'react'
import Button from '../Button/Button'
import InputComponent from '../Popup/InputComponent'
// import { NavLink } from 'react-router-dom'
import '../Booking/Booking.css'
import { useNavigate } from 'react-router'
import apiCall from '../../Services/apiCall'



const   NewBooking = ({data}) => {

  const [NewBookingData, setNewBookingData] = useState({
    guestFirstName:"",
    guestLastName:"",
    checkInDate:"",
    checkOutDate:"",
    numberOfAdults:"",
    numberOfChild:""
    
  });
  const [rooms,setRoom] =  useState(null)  

  const{guestFirstName,guestLastName,checkInDate,checkOutDate,numberOfAdults,numberOfChild}=NewBookingData
  
  const onChange=(value,key)=>{
   if(rooms)return 
    setNewBookingData({
      ...NewBookingData,
      [key]:value
    })
  }


 

    const [Booknow, setBooknow] = useState(false)
    const [showroom,setShowroom]=useState(false)
    const [booking,setBooking]=useState(null)
    // const [checkStatus,setCheckstatus]=useState(null)
    const navigate=useNavigate()

    const BookingData = async(e)=>{
      e.preventDefault();
      console.log(NewBookingData);
      let res = await addBooking();

    }
    
    const addBooking=()=>apiCall("/booking","POST",{...formatBooking(),roomId:rooms.id,status:rooms.status});
    const getRooms =()=>apiCall("/get-rooms","POST",formatBooking())
    const updateStatus=(status)=>apiCall("/booking","PUT",{id:booking.id,status})


    const getAvailablerooms= async()=>{
      let room = await getRooms();
      if(room.id){
        setRoom(room);
        setGetAvailableroom(true);
        setShowroom(true)
      }
    }
    // const Checkin=async()=>{
    //   let booking = await getBooking();
    //   if(booking.id){
    //     setBooking
    //   }
    // }

    const [GetAvailable,setGetAvailableroom] = useState(false)


    const book= async()=>{
      const booking = await addBooking();
      setBooking(booking)
      console.log(booking);
      setBooknow(true)
    }
    const formatBooking=()=>{
      return {
        ...NewBookingData,
        checkinDate: new Date(NewBookingData.checkInDate).toISOString(),
        checkoutDate: new Date(NewBookingData.checkOutDate).toISOString(),
      }
    }
    
  return (
    <div className='13'>
      <div className='new-booking-main'>
        <div className='new-booking-text'> 
        <h3>New Booking {guestFirstName+" "+guestLastName}</h3>
        

        </div>
        {/* <form action='' onSubmit={BookingData}> */}
        <div className='booking-inputs'>
          <InputComponent text='Guest First Name' type='text' value={guestFirstName} setState={(value)=>onChange(value,"guestFirstName")}/>
          <InputComponent text='Guest Last Name' type='text' value={guestLastName} setState={(value)=>onChange(value,"guestLastName")}/>
          <InputComponent text='Check In Date'type='date' value={checkInDate} setState={(value)=>onChange(value,"checkInDate")} />
          <InputComponent text='Check Out Date'type='date' value={checkOutDate} setState={(value)=>onChange(value,"checkOutDate")} />
          <InputComponent text='Number of Adults'type='number' value={numberOfAdults} setState={(value)=>onChange(value,"numberOfAdults")}/>
          <InputComponent text='Number of Children'type='Number' value={numberOfChild} setState={(value)=>onChange(value,"numberOfChild")} />
          <div className="buttons">
          <div className='btn1'>
      
            <Button className='booking-button' text='Get Available Rooms' btnclr='orange' color='white' Functionality={getAvailablerooms}/>

            {GetAvailable ? 
            <div className='available-btn-fn'>
            
            <div className='btn'>
              <Button  text='Book Room' btnclr='white' color='orange' border='1px solid orange' Functionality={book}/>
            </div>
            <div className='btn'>
              <Button text='Back' btnclr='white' color='orange' Functionality={()=>{navigate(-1)}} />
            </div> 
            </div> : ""}
          </div>
          {
            showroom&& 
            (<div className='showroom'>
              <label style={{fontWeight:600}}>Available room:</label>{rooms.roomNumber}
              <label  style={{fontWeight:600}}>Price:</label>{rooms.price}
              </div>
            )
          }
          
          {Booknow ? 
          <div className='btn2'>
          <div><Button text='Check In' btnclr='white' color='orange' border='1px solid orange' Functionality={()=>{
            updateStatus("Checked In");}}/></div>
          <div><Button text='Check Out' btnclr='white' color='orange' border='1px solid orange' Functionality={()=>{
            updateStatus("Checked Out");}}/></div>
          <div><Button text='Cancel' btnclr='white' color='orange' border='1px solid orange'/></div>
          </div> : ""
          }

          
        </div>
        </div>
        {/* </form> */}


      </div>
    </div>
  )
}

export default NewBooking
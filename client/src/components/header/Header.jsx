import { faBed, faCalendarDays, faCar, faHotel, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./header.css"
import { DateRange } from 'react-date-range'
import { useContext, useState } from "react"
import { addMonths } from 'date-fns'
import 'react-date-range/dist/styles.css' 
import 'react-date-range/dist/theme/default.css' 
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"

const Header = ({type}) => {
  const[destination,setDestination] = useState("")
  const[openDate,setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      key: 'selection'
    }
  ]);

  const minDate = new Date();
  const maxDate = addMonths(new Date(), 14); // For 14 months from now
  // const maxDate = addYears(new Date(), 1); // Uncomment this for 1 year from now

  const[openOptions,setOpenOptions] = useState(false)
  const[options,setOptions] = useState({
    adult:1,
    children:0,
    room:1,
  })

  const navigate= useNavigate()
  const {user} = useContext(AuthContext)

  const handleOption = (name,operation)=>{
    setOptions((prev)=>{
      return{
        ...prev,
        [name]: operation === "i" ? options[name]+1 : options[name]-1
      }
    })
  }

  const {dispatch} = useContext(SearchContext)

  const handleSearch= ()=>{
    dispatch({type: "NEW_SEARCH", payload: {destination,dates,options}})
    navigate("/hotels",{ state: {destination, dates, options } })
  }

  return (
    <div className={`header ${type==="list" ? "listMode" : ""}`}>
      <div className="headerContainer">
       <div className="headerList">
         <div className="headerListItem active">
         <FontAwesomeIcon icon={faHotel} />
         <span> Stays</span>
         </div>
         <div className="headerListItem">
         <FontAwesomeIcon icon={faPlane} />
         <span> Flights</span>
         </div>
         <div className="headerListItem">
         <FontAwesomeIcon icon={faCar} />
         <span> Car rentals</span>
         </div>
         <div className="headerListItem">
         <FontAwesomeIcon icon={faBed} />
         <span> Attractions </span>
         </div>
         <div className="headerListItem">
         <FontAwesomeIcon icon={faTaxi} />
         <span> Airport taxis</span>
         </div>
        </div>
        { type!=="list" && 
         <> 
         <h1 className="headerTitle">The perfect home base
         for your special trip</h1>
         <p className="headerDesc"> Discover dreamy holiday homes all over the world </p>
         {!user && <button className="headerBtn"> Sign in / Register </button>}
         <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon"/>
            <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={e=>setDestination(e.target.value)}/>
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
           <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
           {openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            minDate={minDate}
            maxDate={maxDate}
            className="date"
            />}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
            <span  onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                <button  disabled={options.adult<=1}className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Childern</span>
                <div className="optionCounter">
                <button  disabled={options.children<=0}className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                <span className="optionCounterNumber">{options.children}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                <button  disabled={options.room<=1}className="optionCounterButton" onClick={()=>handleOption("room","d")}>-</button>
                <span className="optionCounterNumber">{options.room}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                </div>
              </div>
            </div>}
          </div>
          <div className="headerSearchItem">
            <button className="searchBtn" onClick={handleSearch}>Search</button>
          </div>
         </div> </>}
      </div> 
    </div>
  )
}

export default Header

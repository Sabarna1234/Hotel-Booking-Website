import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import "./home.css"
import Featured from "../../components/featured/Featured"
import PropertyList from "../../components/propertyList/PropertyList"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>

      <div className="homeContainer">
        <h1 className="heading">Trending destination</h1>
        <h5 className="headingDes">Most popular choices for travellers in India</h5>
        <Featured/>
        <h1 className="homeTitle">Browse by property type </h1>
        <PropertyList/>
        <h1 className="homeTitle">Home guests love </h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home

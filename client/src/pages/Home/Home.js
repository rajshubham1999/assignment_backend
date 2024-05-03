import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import Movies from '../../components/Movies/Movies'
// import Data from '../../components/Data/Data'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Banner/>
        
        <Movies/>
    </div>
  )
}

export default Home
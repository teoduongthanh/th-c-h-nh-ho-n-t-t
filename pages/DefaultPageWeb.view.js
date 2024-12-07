import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const DefaultPageWeb = ({children}) => {
  return (
    <>
    <Header />
      <div>
        {children}
      </div>
    <Footer />
  </>
  )
}

export default DefaultPageWeb

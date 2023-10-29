import React from 'react'
import IconSection from '../../components/IconSection/IconSection'
import Feature from '../../components/Feature/Feature'
import Faqs from '../../components/Faqs/Faqs'
import Cto from '../../components/Cto/Cto'
import Contact from '../../components/Contact/Contact'
import Hero from '../../components/Hero/Hero'
import Drops from '../Drop/Drops/Drops'

const Home = () => {
  return (
    <>
      <div className='p-3 sm:p-8 space-y-6 sm:space-y-12'>
        <Hero />
        <IconSection />
        {/* <Feature /> */}
        {/* <Faqs /> */}
        <div className='flex items-center justify-center'>
        <Drops />
        </div>
        <Cto />
        {/* <Contact /> */}
      </div>
    </>
  )
}

export default Home
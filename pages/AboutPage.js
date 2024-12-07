import React from 'react'
// import TitleFirst from '../components/About/TitleFirst'
// import BannernText from '../components/About/BannernText'
// import TranferInfo from '../components/About/TranferInfo'
// import CarouselSlideItem from '../components/About/Carousel'
// import Donation from '../components/About/Donation'
// import HeaderAbout from '../components/About/HeaderAbout'
import banner from '../assets/img/banner01.png'
import MoMo from '../assets/img/momo.jpg'
import PayPal from '../assets/img/paypal.png'
import VietComBank from '../assets/img/vietcombank.png'

const AboutPage = () => {
    return (
        // <div>
        //     <HeaderAbout />
        //     <TitleFirst />
        //     <BannernText />
        //     <TranferInfo />
        //     < CarouselSlideItem />
        //     <Donation />
        // </div>
        <div className='pt-40 lg:px-20 px-8'>
            <div className='text-orange-500 text-3xl text-center font-bold'>Support Dailydictation.com</div>
            <div className='bg-[#d2e6e4] lg:flex my-10'>
                <img className='lg:w-1/2' src={banner} alt='description' />
                <div className='lg:w-1/2 px-4'>
                    <p className='text-black text-xl py-10'>
                        Hello friends! I'm Huy from Vietnam. I am the founder of
                        dailydictation.com 🤗<br /> As a person who has used many different
                        methods to learn English, I realized that dictation is an amazing
                        way to improve my English. That's why I created this website to
                        help all English learners practice easily and effectively.<br />
                        Building and maintaining a website takes time, money and effort. I
                        need your help to keep the site running and to add more useful
                        features.<br /> If you can help me with money, awesome 🤩! You can send
                        me a donation to my PayPal / Bank accounts (see below).<br /> Another
                        great way to help me is to share this website with your friends.
                        😇<br /> I sincerely appreciate your support! Thank you!!!!
                    </p>
                </div>
            </div>
            <div className='p-10'>
                <div className='text-3xl font-bold text-[#71d1b3] text-center p-5'>Support transfer information</div>
                <div className='grid max-lg:grid-rows-3 lg:grid-cols-3 gap-10 '>
                    <div className='border-2 rounded-lg'>
                        <img className='aspect-square ' src={MoMo} alt='description' />
                        <div className='bg-green-50 text-center py-8'>
                            <div className='text-xl'>09xxxx</div>
                            <div className='text-xl'>Ngyuen Van A</div>
                        </div>
                    </div>
                    <div className='border-2 rounded-lg'>
                        <img className='aspect-square ' src={PayPal} alt='description' />
                        <div className='bg-green-50 text-center py-8'>
                            <div className='text-xl'>09xxxx</div>
                            <div className='text-xl'>Ngyuen Van A</div>
                        </div>
                    </div>
                    <div className='border-2 rounded-lg'>
                        <img className='aspect-square ' src={VietComBank} alt='description' />
                        <div className='bg-green-50 text-center py-8'>
                            <div className='text-xl'>09xxxx</div>
                            <div className='text-xl'>Ngyuen Van A</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
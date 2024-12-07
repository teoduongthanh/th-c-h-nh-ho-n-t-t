// import logo from './logo.svg';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';
import Section4 from '../components/Home/Section4';
import Section5 from '../components/Home/Section5';
import Section6 from '../components/Home/Section6';
import Section7 from '../components/Home/Section7';


function Home() {
    return (
        <div className="App font-raleway overflow-x-hidden">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
        </div>
    );
}

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavScroll from './components/NavSroll';
import "bootstrap/dist/css/bootstrap.min.css";
import FunFactSection from './components/FunFactSection';
import "./styles.css";

const countries = [
    { id: 1, name: "USA", image: "./images/USA.jpg", gif: "./images/USA.gif", path: "usa" },
    { id: 2, name: "Niemcy", image: "./images/germany.png", gif: "./images/germany.gif", path: "germany" },
    { id: 3, name: "ZSRR/Rosja", image: "./images/zsrr.png", gif: "./images/rosja.gif", path: "zsrr" },
    { id: 4, name: "Wielka Brytania", image: "./images/uk.png", gif: "./images/uk.gif", path: "uk" },
    { id: 5, name: "Chiny", image: "./images/chiny.png", gif:"./images/chiny.gif", path: "china" }
];

const types = [
    { id: 1, name:"Czołgi lekkie", path: 'light' }, 
    { id: 2, name:"Czołgi średnie", path: 'medium' }, 
    { id: 3, name:"Czołgi ciężkie", path: 'heavy' }, 
    { id: 4, name:"Niszczyciele czołgów / Działa samobieżne", path: 'tk' }, 
    { id: 5, name:"Samobieżne zestawy przeciwlotnicze", path: 'aa' }, 

];

const CountryPanel = ({ country }: { country: typeof countries[0] }) => {
    const navigate = useNavigate();
    
    return (
        <div key={country.id} className="col-md-3 mb-2">  
            <div 
                className="country-panel p-3 shadow rounded" 
                style={{ 
                    backgroundImage: `url(${country.image})`, 
                    backgroundSize: "cover", 
                    borderRadius: "10px",
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/country/${country.path}`)}
            >
                <img src={country.gif} alt={country.name} className="hover-gif rounded" />
                <h5 className="text-white text-center mt-2">{country.name}</h5>
            </div>
        </div>
    );
};

const TankTypePanel = ({ tanktype }: { tanktype: typeof types[0] }) => {
    const navigate = useNavigate();
    
    return (
        <div key={tanktype.id} className="col-md-3 mb-2">  
            <div 
                className="tank-type-panel p-3 text-center bg-dark text-white rounded shadow" 
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/type/${tanktype.path}`)}
            >
                <h5 className="mb-0">{tanktype.name}</h5>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <div className="App" style={{ backgroundColor: "#1d3b35" }}>
            <NavScroll />
            <div className="container py-4" style={{ backgroundColor: "#686868", fontFamily: "Arial, sans-serif" }}>
                
                <header className="hero text-center text-white p-5 rounded shadow" style={{ backgroundImage: "url('./images/tank-background.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                    <h1 className="display-4">Witaj na Armed Beaver!</h1>
                    <p className="lead">Strona, na której dowiesz się wszystkiego o pojazdach pancernych!</p>
                </header>

                <section className="mt-5">
                    <h2 className="section-header text-center mb-4">Wybierz kraj</h2>
                    <div className="row">
                        {countries.map(country => (
                            <CountryPanel key={country.id} country={country} />
                        ))}
                    </div>
                </section>

                <section className="mt-5">
                    <h2 className="section-header text-center mb-4">Typy czołgów</h2>
                    
                    <div className="row justify-content-center">
                        {types.slice(0, 3).map((tanktype) => (
                            <TankTypePanel tanktype={tanktype} />
                        ))}
                    </div>
                    
                    <div className="row justify-content-center">
                        {types.slice(3).map((tanktype) => (
                            <TankTypePanel tanktype={tanktype} />
                        ))}
                    </div>
                    </section>
                <FunFactSection />

            </div>
        </div>
    );
};

export default App;
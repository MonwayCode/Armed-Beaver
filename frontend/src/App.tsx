import React from 'react';
import NavScroll from './components/NavSroll'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <NavScroll />  
      <div className="content">
        <h1>Witaj w mojej aplikacji!</h1>
        <p>Tu znajduje się reszta zawartości strony.</p>
      </div>
    </div>
  );
};

export default App;

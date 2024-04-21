import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {

      const [data, setData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            console.log('API response:', response.data); // Check API response
            setData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          }
        };

        fetchData();
      }, []);

      useEffect(() => {
        const filtered = data.filter(item => {
          if (item.name && typeof item.name === 'string') {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
        setFilteredData(filtered);
      }, [data, searchTerm]);
    
      const handleSearchChange = event => {
        setSearchTerm(event.target.value);
      };
    


  return (
    <div className="App">
      <h1 className='header'>CountryCompass</h1>
    
      <div className="card">
        <div className="card-body">
          Search your chosen country and see information about your country.
        </div>
      </div>

      <input type="text" className="form-control" placeholder="Your chosen country..." aria-label="country" aria-describedby="basic-addon1" value={searchTerm} onChange={handleSearchChange}></input>
    
      <div className="container">

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {filteredData.map(item => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                <p>Capital: {item.capital}</p>
                <p>Population: {item.population}</p>
              </li>
            ))}
          </ul>
        )}

      </div>

    </div>
  );
}

export default App;

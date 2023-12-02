import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`;

const Card = styled.div`
  width: 300px;
  margin: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchIcon = styled.span`
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
`;

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.punkapi.com/v2/beers').then((response) => {
      setBeers(response.data);
    });
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search beers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon role="img" aria-label="search" onClick={() => {}}>
          🔍
        </SearchIcon>
      </SearchContainer>
      <Container>
        {filteredBeers.map((beer) => (
          <Card key={beer.id}>
            <h3>{beer.name}</h3>
            <p>{beer.tagline}</p>
            <Image src={beer.image_url} alt={beer.name} />
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default App;

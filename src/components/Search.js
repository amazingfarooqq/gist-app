import React, { useState } from 'react';
import styled from 'styled-components';
import Octicon from 'react-octicon';
import { GistContextAPI } from '../features/contextapi';
import { getGistForUser } from '../services/gistService';

const Search = () => {
  const [username, setUsername] = useState('');
  const { fetchGists } = GistContextAPI()

  const handleSearch = async () => {
    await fetchGists(username);
  };

  return (
    <Wrapper>
      <InputBox>
        <Input
          type="text"
          placeholder="Search Gists for the username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </InputBox>
      
      <SearchButton onClick={handleSearch}> 
      <Octicon name="search"/>  
        <span style={{paddingLeft: 4}}>Search</span> 
      </SearchButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
  display: flex;
  align-items: center;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
  margin-right: 8px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

const SearchButton = styled.button`
  background-color: #0366d6;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  justifyContent: center;
  alignItems: center;
  display: flex;

  &:hover {
    background-color: #005cc5;
  }
`;

export default Search;

/* eslint-disable react-hooks/exhaustive-deps */
import { AutoComplete, Avatar, Input, Spin } from 'antd';
import { useSearchUser } from '../../react-query/query/user';
import { useCallback, useState } from 'react';
import image from "../../assets/defaultprofileimg.webp";
import debounce from 'lodash/debounce';
import { UseQueryResult } from '@tanstack/react-query';
import { searchUser } from '../../api/user/index.types';


const Search = () => {
  const [, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");


  interface User {
    _id: string;
    username: string;
    profilePicture: string;
  }

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value); 
    }, 600),
    []
  );

  const handleSearch = (value: string) => {
    setQuery(value); 
    debouncedSearch(value); 
  };

  const { data, isLoading } = useSearchUser(debouncedQuery)as UseQueryResult<searchUser[]>;
  
  
  
  const users: User[] = data?.users || [];

  const options = users.map(user => ({
    value: user.username,
    label: (
      <div className="flex items-center">
        <Avatar src={user.profilePicture || image} />
        <span className="ml-2">{user.username}</span>
      </div>
    ),
  }));

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <AutoComplete
          options={options}
          className="md:w-64 sm:w-48"
          placeholder="Search user"
          onSearch={handleSearch} 
          filterOption={false}
        >
          <Input.Search allowClear />
        </AutoComplete>
      )}
    </div>
  );
};

export default Search;
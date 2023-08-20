[![npm version](https://badge.fury.io/js/react-state-bridge.svg)](https://badge.fury.io/js/react-state-bridge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# react-state-bridge

> A custom React hook to simplify all api calls between frontend and backend and manage the various main states that result.

## Table of contents

- [react-state-bridge](#react-state-bridge)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [useBasicFetch](#useDateFetch)
  - [Authors](#authors)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

To install and set up the library, run:

```sh
$ npm i react-state-bridge
```

## Usage

To use the `useDataFetch` hook, follow these steps:

1. Import the hook in your component file:

```ts
import useDataFetch from 'react-state-bridge';
```

2. Call the useDataFetch hook in your functional component, providing the URL for the GET request as the first parameter. You can also pass optional parameters and an optional token for authorization:

```ts
type YourDataType = {
  // ... Your data type logic ...
}

type YourDataType2 = {
    // ... Your data type logic ...
}

const MyComponent = () => {
  const url = 'https://api.example.com/data'
  const url2 = 'https://api.example.com/data'

  const token = env.YOUR_TOKEN
  const params = {
     yourparams1: 'params1',
     yourparams2: 'params2',
     yourparams3: 'params3'
  }
  const params2 = {
     yourparams4: 'params4',
     yourparams5: 'params5',
     yourparams6: 'params6'
  }

  const fetchResult = useDataFetch<YourDataType[]>(url, params, token)
   const fetchResult2 = useDataFetch<YourDataType2[]>(url2, params2, token);

// Using data for the first call

  const { data: data, isLoading: isLoading, error: error, messageSucess: messageSucess } = fetchResult

// Use of data for a possible second call

  const { data: data2, isLoading: isLoading2, error: error2, messageSucess: messageSucess2 } = fetchResult2

  // ... Your component logic ...
}
```

3. The hook returns an object with the following properties:
  - `data`: The fetched data from the API.
  - `isLoading`: A boolean indicating whether the data is currently being fetched.
  - `error`: An error message in case the request fails.
  - `messageSuccess`: A success message if the request is successful.  

## Exemple

```ts
import React from 'react';
import {useDataFetch} from 'react-state-bridge';

type PostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const MyComponent: React.FC = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const yourAuthToken = env.YOUR_TOKEN;

  const fetchPostResult = useDataFetch<PostData[]>(url, null, yourAuthToken)

  const { data: postData, isLoading: isPostLoading, error: postError, messageSucess: postMessageSucess } = fetchPostResult

  return (
    <div>
      {isPostLoading && <p>Loading...</p>}
      {postData && (
        <div>
          {postData.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {postMessageSucess && <p>{messageSucess}</p>}
    </div>
  );
};

export default MyComponent;
```

## API

### useDateFetch

```js
useDateFetch(url: string = '', params?: any, token?: string)
```

## Authors

* **Lindow** - *react-state-bridge* - [Lindow](https://github.com/Lindow-ai)

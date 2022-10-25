<a name="readme-top"></a>

<div align="center">
  <h2 align="center">Currency Converter API</h3>

  <p align="center">
    Service developed as a response to the challenge of the second stage of the Jaya company
    <br />
    <a href="https://currency-converter-api-prod.herokuapp.com">Get deployed API URL</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
		<li><a href="#challenge">Challenge</a></li>
		<li><a href="#features">Features</a></li>
		<li><a href="#built-with">Built With</a></li>
        <li><a href="#layer-architecture">Layer architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
	 <li>
      <a href="#getting-started">Standards And Expectations</a>
      <ul>
        <li><a href="#iso-4217">ISO 4217</a></li>
        <li><a href="#error-codes">Error Codes</a></li>
		<li><a href="#log-levels">Log Levels</a></li>
      </ul>
     </li>
  </ol>
</details>

## Overview

### Challenge
Develop a Rest API that is capable of converting between two currencies using updated conversion rates from an external service

### Features

> **Create Transaction**
>> Create transaction and return the converted value to the user according to the value, base currency and quote currency

> **Find All User Transactions**
>> Find all transactions by user

### Built With
All the technologies used will be presented below, containing a motivation for their use

<details>
    <summary>Typescript</summary>
    <p>In addition to the familiarity of projects with static typing in Javascript, when it comes to
     productivity, this technology has several features that make the code cleaner and more readable</p>
</details>

<details>
    <summary>Node</summary>
    <p>I also assume that it is also a familiar technology. In addition to being a platform
     simple to work with, its environment construction is facilitated allowing to upload services in
     production quickly</p>
</details>

<details>
    <summary>Express</summary>
    <p>This framework is optimized for API builds. In addition to being compatible with Typescript typing,
bringing a readable and maintainable code</p>
</details>

<details>
    <summary>Jest</summary>
    <p>I confess that it was my first contact with this test structure. It brings several features,
     especially when we want to separate environments for unit testing or integration</p>
</details>

<details>
    <summary>Morgan & Winston</summary>
    <p>An application without logging is very difficult to "debug" to find a problem. With these two tools
     every request will be stored, and when there is an exception it will also be logged with the help of exception handlers</p>
</details>

<details>
    <summary>Prisma ORM</summary>
    <p>I always heard about this new ORM to work with any bank and any language. I decided to use
     because unlike other ORM's it has a safe typing and is ready for productive development</p>
</details>

<details>
    <summary>Postgres</summary>
    <p>The database was heavily supported by data flow, I think transactions are done daily.
     In addition to the high ORM compatibility above, all management is done by Prisma CLI</p>
</details>

### Layer architecture
Here is the node.js project structure

```bash
├── .github # github workflows
├── build # out tsc compile
├── docs # swagger api docs
├── prisma # schema and migrations
├── src
│   ├── api
|   |   ├── controllers # functions to get the request data from the services
|   |   |   ├── *.controller.ts
|   |   ├── middlewares # functions to manipulating request object
|   |   |   ├── handlers
|   |   |   |   ├── *.middleware.ts
|   |   |   ├── morgan
|   |   |   |   ├── *.middleware.ts
|   |   ├── models # database schema types
|   |   |   ├── *.model.ts
|   |   ├── routes # all the endpoints of the app
|   |   |   ├── v1
|   |   |   |   ├── *.route.ts
|   |   ├── services # all the business logic 
|   |   |   ├── __mocks__
|   |   |   ├── *.service.ts
│   ├── config # environment variables export
│   ├── database # the ORM client
│   ├── utils # small snippets
|   |   ├── currency
|   |   ├── logger
|   |   ├── swagger
│   ├── index.ts # start api server
│   ├── server.ts # export server
├── tests
|   ├── config
|   |   ├── setup
|   ├── integration
|   |   ├── *.test.ts
|   ├── unit
|   |   ├── *.test.ts
├── .env.example
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierrc
├── nodemon.json
├── package-json
├── package-lock.json
├── README.md
├── tsconfig.json
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting started
Here we will detail the requirements and installation

### Prerequisites
- IDE thats supports lint settings (eslint, prettier etc)

- npm
	```
	npm install npm@6.x
	```

- Postgres or SQL Database
  - [Click here](https://www.prisma.io/docs/reference/database-reference/supported-databases) for supported databases

- External APIs
	- Exchange Rates API: [Click here](https://apilayer.com/marketplace/exchangerates_data-api#pricing) to purchase a free access key
	>  Example of access key
	>> CCPa12bY1jUusV5uYEZCN9ZqLNqsSAGIZ

- How to get a access key?
  - Subscribe in Free Plan
  - [Click here](https://apilayer.com/signup) to go the sign up page
  - After signed up. [Click here](https://apilayer.com/account) to go the API key page
  - Copy Your API Key to Clipboard
  
  ![image](https://user-images.githubusercontent.com/42397106/197658018-43a7fad3-0899-451f-87a4-268e5f1f355e.png)

### Installation
Let's install our application by running some commands


1. Clone repository
	```bash
	git clone https://github.com/fabriciovasc/currency-converter-api.git)
	```

2. Setting environment variables
	```
	## Database environment
	DATABASE_URL=YOUR_DATABASE_URL

	## App enviroment
	NODE_ENV=ENVIRONMENT
	APP_NAME=YOUR_APP_NAME
	API_VERSION=YOUR_API_VERSION
	PORT=YOUR_SERVER_PORT

	## External API enviroment
	EXCHANGE_RATE_ACCESS_KEY=YOUR_EXCHANGE_RATE_ACCESS_KEY
	```
	<p align="right">
	* <a href="/blob/main/.env.example">Click here!</a> to go .env.example file
	</p>

3. Install packages
	```bash
	npm install
	```
4. Run database migrations
	```bash
	npm run prisma:dev
	```
5. Configure the ORM client
   ```bash
   npm run prisma:configure
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>   

## Usage
Here you will see the execution commands

1. Run all tests

	```bash
	npm run test
	```
	After execute command, the unit tests must be generated
	
	![image](https://user-images.githubusercontent.com/42397106/197649057-d6f3e9bb-99bb-4e64-a7ac-67796c7a669f.png)
	
	After execute command, the integration tests must be generated
	
	![image](https://user-images.githubusercontent.com/42397106/197649385-5527a6ac-88b3-4d5d-b231-ad6e4c486d29.png)
	
2. Run application

	There are two modes of application execution, when the code is transpiled to execute in the native language (Javascript) and when we use some tools to execute the code in a Typescript engine.

	**Javascript**
	
	``` bash
	npm run build
	npm start
	```
	
	All files go through the *transpile* process and are generated inside the directory with .js extensions ready for execution in a production environment, for example.
	
	```bash
	├── build
	│   ├── api
	│   ├── config
	│   ├── database
	│   ├── utils
	│   ├── index.d.ts
	│   ├── index.js
	│   ├── server.d.ts
	│   ├── server.js
	```
	
	**Typescript**
	
	``` bash
	npm run start:dev
	```
	
	The files are run in the Typescript engine and monitored for any changes to the files. **Recommending for the development environment**
	
3. Access the API Server

	After running the server, it is possible to access the API in some HTTP client or the documentation available in development mode
	
	**Access the API v1**
	
	```bash
	http://localhost:<PORT>/api/v1
	```
	
	When accessing you will get a response like below, which means the API version
	
	```bash
	{"version": "v1"}
	```
	
	**Access the API v1 Specs**
	
	```bash
	http://localhost:<PORT>/docs/v1
	```
	
	You will see documentation outlining the endpoints, as well as possible answers and a brief summary of each schema
	
	![image](https://user-images.githubusercontent.com/42397106/197651396-25ac4560-c19b-42b9-86bf-455d578931a6.png)
	
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Standards And Expectations
Some data transmitted in the service require agreements with standards, below some standards will be described so there are no questions

### ISO 4217
> [Click here](https://docs.1010data.com/1010dataReferenceManual/DataTypesAndFormats/currencyUnitCodes.html) for access currency codes

Currency code format pattern. Compose of three letters. The code must be send in the body of request
	
### Error Codes
All the errors to be expected

| Code			| Error Type			   | HTTP Code     |
| ------------- | ------------------------ | ----------------------------- | 
| 100			| Missing field 		   | Bad Request   |
| 101			| Invalid field 	       | Bad Request       |
| 102			| Unavailable api service  | Service Unavailable   |
| 103			| Transactions not found   | Not Found		   |

### Log Levels
All expected log levels

| Log type		| Color     		   | Level      				   |
| ------------- | ------------------------ 	   | ----------------------------- | 
| Error			| :red_circle: Red         | 0			    	   |
| Warning		| :yellow_circle: Yellow   | 1    			   |
| Info			| :white_circle: Cyan	   | 2     			|
| HTTP			| :purple_circle: Magenta  | 3		   					   |
| Debug			| :green_circle: Green	   | 4							   |

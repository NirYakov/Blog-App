# Blog Web Application

Full-stack web application using Angular 2+ for the front end, Node.js with Express for the backend, and MongoDB for the database.

Implemented features such as user authentication, blog post creation, and likes.

## Table of Contents

- [Features](#features)

- [Technologies](#technologies)

- [Installation](#installation)

- [Usage](#usage)

- [API Endpoints](#api-endpoints)

- [Contributing](#contributing)

- [License](#license)

## Features

- User authentication with login and signup functionality.

- Uploading, editing, and deleting posts.

- Liking posts.

## Technologies

- Angular 2+ (Front end)

- Node.js with Express (Backend)

- MongoDB (Database)

## Installation

1. Clone the repository:

git clone [repository URL]

2. Navigate to the project directory:

npm install

3. Install the dependencies:

move to "Back" and install all the dependencies

move to "blog-app-front" that in the "Front" folder and install all the dependencies

4. Setting up the database

need mongodb atlas user

put JSON file in the root directory that name is : MyMongoDb.json
the file look like this :
{
"username": "< username >",
"password": "< connection string >"
}

Happy Coding :)

## Usage

1. Start the development server:

navigate to "Back" folder then npm start
navigate to "blog-app-front" folder then npm start

2. Open your browser and navigate to [http://localhost:3000] to access the application. Back end.
3. Open your browser and navigate to [http://localhost:4200] to access the application. Front end.

## API Endpoints

- BaseUrl for development : [[http://localhost:3000/api/](http://localhost:3000/api/)]

-

- Post: BaseUrl + user/signup

- Post: BaseUrl + user/login

-

- Post: BaseUrl + posts

- Put: BaseUrl + posts/:id

- Get: BaseUrl + posts

- Get: BaseUrl + posts/:id

- Delete: BaseUrl + posts/:id

-

- Get: BaseUrl + likes

- Post: BaseUrl + likes/:id

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature/fix.

3. Make your changes.

4. Commit your changes.

5. Push the branch to your forked repository.

6. Open a pull request.

# Do It Already - API

A todo app that empowers you to knock out your bucklet list. 

Live version: (https://do-it-already-app.vercel.app/)

## Introduction 

If you've been dreaming of visiting Europe your whole life, but you still have yet to leave the country, what's stopping you? If it's sheer lack of willpower, create a "travel" todo with Do It Already and make that dream come to fruition. Or, say you're low on funds. Create a bucket list todo to save $$$ for your Euro trip! 

The app separates todos into four main categories: 
* Productivity 
* Finance 
* Fitness
* Travel 

Create todos that will help you achieve greater goals, or simply create fun todos for things you've never done, like reading a book trilogy or finishing a series you just haven't gotten around to yet. 

## Technologies

* Node and Express 
  * Authentication via JWT 
  * RESTful API 
* Testing 
  * Supertest (integration) 
  * Mocha and Chai (unit)
* Database 
  * Postgres
  * Knex.js 
  
## Production 

Deployed via Heroku

## API Endpoints

### Users Router
```
- /api/users 
- - GET - gets all users 
- - POST - creates a new user
```

### Todos Router
```
- /api/todos
- - GET - gets all todos 
- - POST - creates a new todo 
```

### Todos/:id Router 
```
- /api/todos/:id 
- - GET - gets todo by id 
- - DELETE - deletes a todo by id 
- - PATCH - updates a todo by id 
- - PUT - marks todo complete or incomplete by id 
```

### Categories Router
```
- /api/categories 
- - GET - gets all categories 
```

### Categories/:id Router
```
- /api/categories/:id
- - GET - gets categories by id 
```

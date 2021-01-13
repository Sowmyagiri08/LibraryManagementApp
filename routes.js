
const { User,Book,Borrows } = require('./model')
const Boom = require('boom');


exports.configureRoutes = (server) => {
  //Get All Users
  return server.route([{
    method: 'GET',
    path: '/users',
    handler: () => {
      return User.findAll();
    }
  }, 
  //Get User By Username
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request) => {
      return User.findByPk(request.params.id);
    }
  }, 
  //Register New User
  {
    method: 'POST',
    path: '/users/register',
    handler: (request) => {
      const user = User.build(request.payload);
      return user.save();
    }
  },
  //Login User
  {
    method: 'POST',
    path: '/users/login',
    handler: async (request) => {
      const user = await User.findAll({where:{'username':request.payload['username'],'password':request.payload['password']}});
      console.log(user);
      if(user.length==0) 
        return Boom.notFound();
      else
        return "Login Successful";
    }
  }, 
  //Update User
  {
    method: ['PUT', 'PATCH'],
    path: '/users/{id}',
    handler: async (request) => {
      const user = await User.findByPk(request.params.id);
      user.update(request.payload);
      return user.save();
    }
  }, 
  //Delete User
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: async (request) => {
      const article = await User.findByPk(request.params.id);
      return article.destroy();
    }
  },
  //Add a book 
  {
    method: 'POST',
    path: '/books',
    handler: (request) => {
      const book = Book.build(request.payload);
      return book.save();
    }
  },
  //Search book by Id
  {
    method: 'GET',
    path: '/books/{id}',
    handler: (request) => {
      const book = Book.findByPk(request.params.id);
      return book;
    }
  },
  //Search book by Name
  {
    method: 'GET',
    path: '/books',
    handler: (request) => {
      const book = Book.findAll({where:{'name':request.query['name']}});
      return book;
    }
  },
  //Issue book
  {
    method: 'POST',
    path: '/books/issue',
    handler: (request) => {
      const borrow = Borrows.build(request.payload);
      return borrow.save();
    }
  },
  //Issue book
  {
    method: ['PUT','PATCH'],
    path: '/books/return/{id}',
    handler: async (request) => {
        const borrow = await Borrows.findByPk(request.params.id);
        const newBorrow = Object.assign({},borrow);
        newBorrow['returnedDate']= new Date();
        borrow.update(newBorrow);
        return borrow.save();
    }
  }



]);
}
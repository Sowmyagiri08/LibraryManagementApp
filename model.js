const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');
const user = 'postgres';
const database = 'library';
const password = 'sowmya';


//Connect to postgres
const sequelize = new Sequelize(database, user, password, {
    dialect: 'postgres',
  });

//User Class
const User = sequelize.define('user', {
  username:{type:DataTypes.STRING,primaryKey:true},
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING(10)
});

//Book class
const Book = sequelize.define('book', {
  bookid:{type:DataTypes.STRING,primaryKey:true},
  name: Sequelize.STRING,
  author: Sequelize.STRING,
  pagecount: Sequelize.BIGINT,
  genre: Sequelize.STRING
});

//Borrows class
const Borrows= sequelize.define('borrows', {
  borrowid:{type:DataTypes.STRING,primaryKey:true},
  username: Sequelize.STRING,
  bookid: Sequelize.STRING,
  borrowedDate: {type:Sequelize.DATE, defaultValue:Sequelize.NOW},
  returnedDate: Sequelize.DATE
});

//adding username as foreign key
Borrows.hasOne(User);

//adding bookid as foreign key
Borrows.hasOne(Book);

// Create or alter table
User.sync({alter:true});
Book.sync({alter:true});
Borrows.sync({alter:true});

module.exports = {
  User,
  Book,
  Borrows
}

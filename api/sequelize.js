import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize('users', 'preschoolwords', 'Min8980zip', {
  host: 'db',
  dialect: 'mysql',
});



const User = UserModel(sequelize, Sequelize);
sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

module.exports = User;

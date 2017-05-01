var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const page = db.define('page', {

  title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING, allowNull: false, isUrl: true},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM('open', 'closed')},
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
}, {
  getterMethods: {
    route: function(){
      return '/wiki/' + this.urlTitle;
    }
  }
});

const user = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING,
          allowNull: false,
          validate: {isEmail: true}}
});

module.exports = {
//  page: page,
//  user: user,
  db: db
};

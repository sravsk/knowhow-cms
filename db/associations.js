const Company = require('./Models/Company');
const User = require('./Models/User');
const Category = require('./Models/Category');
const Article = require('./Models/Article');

Company.hasMany(User, {
  foreignKey: {
    allowNull: false
  }
});

User.belongsTo(Company, {
  allowNull: false
});

Company.hasMany(Category, {
  foreignKey: {
    allowNull: false
  }
});

Category.belongsTo(Company, {
  allowNull: false
});

Category.hasMany(Article, {
  foreignKey: {
    allowNull: false
  }
})

Article.belongsTo(Category, {
  allowNull: false
})

var assoc = () => {
  Company.sync().then(() => User.sync().then(() => Category.sync().then(() => Article.sync())))
};

module.exports = assoc;


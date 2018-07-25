const Company = require('./Models/Company');
const User = require('./Models/User');
const Category = require('./Models/Category');
const Article = require('./Models/Article');
const Passwordreset = require('./Models/Passwordreset');

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
    allowNull: true
  }
})

Article.belongsTo(Category, {
  allowNull: true
})

Article.belongsTo(Company, {
  allowNull: false
})

Company.hasMany(Article, {
  foreignKey: {
    allowNull: false
  }
})

Passwordreset.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

User.hasMany(Passwordreset, {
  foreignKey: {
    allowNull: false
  }
})

var assoc = () => {
  Company.sync().then(() => User.sync().then(() => Category.sync().then(() => Article.sync().then(() => Passwordreset.sync()))))
};

module.exports = assoc;

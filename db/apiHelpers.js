const db = require('./index.js');
const assoc = require('./associations.js');
const Company = require('./Models/Company');
const User = require('./Models/User');
const Category = require('./Models/Category');
const Article = require('./Models/Article');
const Invitation = require('./Models/Invitation');
const Passwordreset = require('./Models/Passwordreset');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const fetchCompanyId = async(companyKey) => {
  const companyId = await Company.findAll({
    where: {
      key : companyKey
    },
    attributes: ['id']
  })
  return new Promise(companyId);
};

const fetchCategoriesByCompany = async(companyId) => {
    const categories = await Category.findAll({
      where: {
        companyId: companyId
      },
      order: [
        ['id', 'DESC']
      ],
      attributes: ['id', 'name', 'description', 'companyId']
    })
    return categories;
};

const fetchCompanyData = async(companyId) => {
  const data = await Company.findAll({
    where: {
      id : companyId
    },
    attributes: ['id', 'name', 'domain']
  })
  return data;
};

const fetchOneArticle = async(companyId, articleId) => {
  const article = await Article.findAll({
    where: {
      companyId: companyId,
      id : articleId
    },
    attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
  return article;
};

const fetchArticles = async(companyId, categoryId) => {
  const articles = await Article.findAll({
      where: {
        companyId: companyId,
        categoryId: categoryId
      },
      order: [
        ['id', 'DESC']
      ],
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
  return articles;
}

const fetchTopArticles = async(companyId, articleIds, categoryId) => {
  let whereCondition = categoryId ? { categoryId: categoryId, companyId: companyId, id: articleIds } : { companyId: companyId, id: articleIds }
  const articles = await Article.findAll({
      where: whereCondition,
      order: [
        ['id', 'DESC']
      ],
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
  return articles;
}


const fetchFillerArticles = async(companyId, articleIds) => {
  const articles = await Article.findAll({
      where: {
        companyId: companyId,
        id: {
          [Op.notIn]: articleIds
        }
      },
      limit: (20 - articleIds.length),
      order: [
        ['id', 'DESC']
      ],
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
  return articles;
}

const fetchCompanyArticles = async(companyId) => {
  const articles = await Article.findAll({
      where: {
        companyId: companyId
      },
      order: [
        ['id', 'DESC']
      ],
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
  return articles;
}


module.exports = {
  fetchCompanyId,
  fetchCategoriesByCompany,
  fetchCompanyData,
  fetchOneArticle,
  fetchTopArticles,
  fetchFillerArticles,
  fetchArticles,
  fetchCompanyArticles
};
const db = require('./index.js');
const assoc = require('./associations.js');
const Company = require('./Models/Company');
const User = require('./Models/User');
const Category = require('./Models/Category');
const Article = require('./Models/Article');
const Invitation = require('./Models/Invitation');
const Passwordreset = require('./Models/Passwordreset');

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
  fetchArticles,
  fetchCompanyArticles
};
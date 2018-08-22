const randomWords = require('random-words');

const company = 'Send Grid';
const domain = 'sendgrid.com';

let companyId = 4;
let categoryId = 14;

const generateData = (length) => {
  let data = [];
  for (let i = 0; i < length; i++) {
    // if ((i % 1000) === 0) {
    //   console.log('COUNT', i+1)
    // }
    let article = {
      title: randomWords({ min: 1, max: 6 }).join(' '),
      description: randomWords({ min: 3, max: 10 }).join(' '),
      content: '',
      companyId: companyId,
      categoryId: categoryId
    }
    let contentLength = Math.floor(Math.random() * 20) + 2;
    content = '';
    for (let i = 0; i < contentLength; i++) {
      content += randomWords({ min: 3, max: 8 }).join(' ') + '.' + ' ';
    }
    article.content = content;
    data.push(article);
  }
  return data;
};

module.exports = { generateData, companyId, categoryId };



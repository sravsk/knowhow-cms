// const faker = require('faker');
const randomWords = require('random-words');

// const names = ['James Smith', 'William Smith', 'Daniel Smith', 'John Smith', 'Emily Smith', 'Olivia Smith', 'Sophia Smith', 'Madison Smith'];
// const categories = ['Usage', 'Customization', 'Know your metrics'];

const company = 'Send Grid';
const domain = 'sendgrid.com';

let companyId = 4;
let categoryId = 10;

// console.log(faker.name.findName())
// console.log(faker.internet.email())
// console.log(faker.company.companyName())
// console.log(faker.internet.domainName())
// console.log(faker.lorem.sentence())
// console.log(faker.lorem.text())

const generateData = (length) => {
  let data = [];
  for (let i = 0; i < length; i++) {
    // if ((i % 1000) === 0) {
    //   console.log('COUNT', i+1)
    // }
    let article = {
      title: randomWords({ min: 1, max: 6 }).join(' '),
      description: randomWords({ min: 3, max: 10 }).join(' '),
      content: ''
    }
    let contentLength = Math.floor(Math.random() * 15);
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


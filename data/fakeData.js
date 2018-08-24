const randomWords = require('random-words');
const fs = require('fs');

let articlesStream = fs.createWriteStream('./articles.txt');

// const company = 'Send Grid';
// const domain = 'sendgrid.com';

let companyId = 2;
let categoryId = 7;

let length = 1000000;

const generateData = (length) => {
  let data = [];
  for (let i = 0; i < length; i++) {
    let article = [];
    let title = randomWords({ min: 1, max: 6 }).join(' ');
    let description = randomWords({ min: 3, max: 10 }).join(' ');
    let content = '';
    let contentLength = Math.floor(Math.random() * 20) + 2;
    for (let i = 0; i < contentLength; i++) {
      content += randomWords({ min: 3, max: 8 }).join(' ') + '.' + ' ';
    }
    article = [title, description, content, companyId, categoryId];
    data.push(article);
  }
  return data;
};

let articlesCsv = generateData(length).join('\n');

articlesStream.write(articlesCsv, 'utf8');
articlesStream.on('finish', () => {
  console.log(`DONE WRITING ${length} articles to file.`)
})

articlesStream.end();







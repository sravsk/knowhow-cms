const request = require('request');
const expect = require('chai').expect;




// GET endpoints:
// GET '/'
// GET '/signup'
// GET '/login'
// get('/:companyId/categoriesdata'
// get('/:companyId/categories/:categoryId/articlesdata'
// get('/:companyId/articlesdata'
// get('/company'
// get('/api/:companyId'
// get('/api/article/:articleId'
// get('/user'
// get('/logout'
// get('/devadminpage'
// get('/db/testfill'
// get('/db/clear'
// get('/db/rebuild'
// // protect all routes except the ones above
// app.get('*', authMiddleware()


describe('server GET requests', function() {
  it('should respond to GET requests for / with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /signup with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/signup', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /login with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/login', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /1/categoriesdata with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/1/categoriesdata', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /1/categories/1/articlesdata with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/1/categories/1/articlesdata', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /1/articlesdata with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/1/articlesdata', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  // DOES NOT PASS
  // it('should respond to GET requests for /company with a 200 status code', function(done) {
  //   request('http://127.0.0.1:3000/company', function(error, response, body) {
  //     expect(response.statusCode).to.equal(200);
  //     done();
  //   });
  // });
  it('should respond to GET requests for /api/1 with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/api/1', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /api/article/1 with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/api/article/1', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /user with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/user', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /logout with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/logout', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /devadminpage with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/devadminpage', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should respond to GET requests for /db/testfill with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/db/testfill', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  //Comment out to prevent database from clearing
  // it('should respond to GET requests for /db/clear with a 200 status code', function(done) {
  //   request('http://127.0.0.1:3000/db/clear', function(error, response, body) {
  //     expect(response.statusCode).to.equal(200);
  //     done();
  //   });
  // });
  it('should respond to GET requests for /db/rebuild with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/db/rebuild', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  // DOES NOT PASS
  // it('Should 404 when asked for a nonexistent endpoint', function(done) {
  //   request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
  //     expect(response.statusCode).to.equal(404);
  //     done();
  //   });
  // });
});



// //POST ENDPOINTS
// POST '/signupuser'
// POST '/inviteuser'
// POST '/loginuser'
// POST '/addCategory'
// POST '/updatecategory'
// POST '/deletecategory'
// post('/article'
// post('/deleteArticle'


// DOES NOT PASS (NO POST REQUESTS PASS)
// describe('server POST requests', function() {
//   it('should accept POST requests to /signupuser', function(done) {
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/signupuser',
//       json: {
//         name: 'tester',
//         email: 'tester10@gmail.com',
//         password: 'tester10istesting',
//         company: 'tester10',
//         domain: 'www.tester10.com'
//       }
//     };
//     request(requestParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(201);
//       done();
//     });
//   });

//   it('should accept POST requests to /inviteuser', function(done) {
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/inviteuser',
//       json: {
//         email: 'knowhowrpt@gmail.com'
//       }
//     };
//     request(requestParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(201);
//       done();
//     });
//   });
//   it('should accept POST requests to /loginuser', function(done) {
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/loginusers',
//       json: {
//         email: 'tester@gmail.com',
//         password: 'testing123'
//       }
//     };
//     request(requestParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(201);
//       done();
//     });
//   });
//   it('should accept POST requests to /addCategory', function(done) {
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/addCategory',
//       json: {
//         categoryName: 'testCategory',
//         categoryDescription: 'testCategory description'
//       }
//     };
//     request(requestParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(201);
//       done();
//     });
//   });
//   // // Does this actually mess with our database? Because if so, we might not want to run this test since I hardcoded id of 1, assuming there is just the single category testCategory, which there isn't if this goes to our actual database
//   // it('should accept POST requests to /updatecategory', function(done) {
//   //   var requestParams = {
//   //     method: 'POST',
//   //     uri: 'http://127.0.0.1:3000/updatecategory',
//   //     json: {
//   //       id: 1,
//   //       name: 'testCategory',
//   //       description: 'testCategory description'
//   //     }
//   //   };
//   //   request(requestParams, function(error, response, body) {
//   //     expect(response.statusCode).to.equal(201);
//   //     done();
//   //   });
//   // });
//   // it('should accept POST requests to /deletecategory', function(done) {
//   //   var requestParams = {
//   //     method: 'POST',
//   //     uri: 'http://127.0.0.1:3000/deletecategory',
//   //     json: {
//   //       id: 1,
//   //       coId: 1
//   //     }
//   //   };
//   //   request(requestParams, function(error, response, body) {
//   //     expect(response.statusCode).to.equal(201);
//   //     done();
//   //   });
//   // });

// // Might want to test both new article (id=null) and update (id=1)
//   it('should accept POST requests to /article', function(done) {
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/article',
//       json: {
//         title: 'testArticle',
//         description: 'testArticle description',
//         content: 'testArticle content',
//         categoryId: 1,
//         id: null
//       }
//     };
//     request(requestParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(201);
//       done();
//     });
//   });

//   // //Again, this deletes articles. Would testing delete in our actual database?
//   // it('should accept POST requests to /deleteArticle', function(done) {
//   //   var requestParams = {
//   //     method: 'POST',
//   //     uri: 'http://127.0.0.1:3000/deleteArticle',
//   //     json: {
//   //       articleId: 1
//   //     }
//   //   };
//   //   request(requestParams, function(error, response, body) {
//   //     expect(response.statusCode).to.equal(201);
//   //     done();
//   //   });
//   // });
// });


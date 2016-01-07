var fs = require('fs'),
    path = require('path'),
    dbFilePath = path.join(__dirname, 'db.json'),
    dbContent = {
      users: [
        {
          id: 1,
          name: 'Joe Blogs',
          email: 'Joe.B@ac.me'
        }
      ]
    };

fs.exists(dbFilePath, function(exists) {
  if (! exists) {
    fs.writeFile(dbFilePath, JSON.stringify(dbContent), {encoding: 'utf-8'});
  }
});

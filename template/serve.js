const express = require('express');
const path = require('path');
const fs = require('fs');
const env = require('dotenv-mode');

const app = express();
const port = env("PORT") || 3000;

app.get('/', function (request, response) {
      console.log('Home page visited!');
      const filePath = path.resolve(__dirname, './build', 'index.html');
      fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                  return console.log(err);
            }
            data = data.replace(/\$OG_TITLE/g, 'React JS');
            data = data.replace(/\$OG_DESCRIPTION/g, "Web site created using create-react-app");
            response.send(data);
      });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const app = express();

const appName = 'nexusapp-frontend';
const outputPath = `${__dirname}/dist/${appName}`;

app.use(express.static(outputPath));

app.get('/*', (_, res) => {
  res.sendFile(`${outputPath}/index.html`);
});

app.listen(process.env.PORT || 8080);

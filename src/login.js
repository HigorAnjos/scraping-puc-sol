const puppeteer = require('puppeteer');
require('dotenv').config();

const matricula = process.env.MATRICULA;
const senha = process.env.SENHA;

const login = async (matricula, senha) => {
  const browser = await puppeteer.launch({ headless: false }); // Inicia o navegador
  const page = await browser.newPage();
  await page.goto('https://sol.pucgoias.edu.br/aluno/');
  await (await page.waitForSelector('#matricula')).type(matricula);

  await (await page.waitForSelector('body > div.container > div > div > form > input.p-top')).type(senha);

  await page.click('body > div.container > div > div > form > button');

  return { page, browser };
}

// login(matricula, senha).then(nav => {
//   console.log('Login realizado com sucesso!');
//   nav.page.close();
//   nav.browser.close();
// });

module.exports = login;
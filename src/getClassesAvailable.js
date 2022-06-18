const login = require('./login');

const matricula = process.env.MATRICULA;
const senha = process.env.SENHA;

const getNotesAndFrequencies = async () => {
  const { page, browser } = await login(matricula, senha);

  await (await page.waitForSelector('#menu-principal > a:nth-child(14) > div')).click();
  await page.goto('https://sol.pucgoias.edu.br/premat/prematricula.asp', {
    waitUntil: 'load',
    timeout: 0
  });

  await (await page.waitForSelector('body > div > center > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > form > p > input[type=submit]')).evaluate(() => {
    document.querySelector('body > div > center > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > form > p > input[type=submit]').click();
  });

  const inputElement = await page.$x('/html/body/table/tbody/tr[1]/td/form/p/input');
  console.log('inputElement', inputElement);
  await inputElement.click();


  browser.close();

};

getNotesAndFrequencies();
const puppeteer = require('puppeteer');
const login = require('./login');

const matricula = process.env.MATRICULA;
const senha = process.env.SENHA;

const getNotesAndFrequencies = async () => {
  const { page, browser } = await login(matricula, senha);
  await (await page.waitForSelector('#menu-principal > a:nth-child(9)')).click();

  const tableNotes = await (await page.waitForSelector('#wrap > div.container > div > div > div > table')).evaluate(() => {
    const table = document.querySelector('#wrap > div.container > div > div > div > table');
    const thead = Array.from(table.querySelectorAll('thead > tr > th'));
    console.log('thead', thead);
    const rows = Array.from(table.querySelectorAll('tbody > tr'));
    const notes = rows.map(row => {
      const columns = Array.from(row.querySelectorAll('td'));
      return {
        disciplina: columns[0].innerText,
        turma: columns[1].innerText,
        aulasprevistas: columns[2].innerText,
        aulasministradas: columns[3].innerText,
        numerodepresencas: columns[4].innerText,
        n1: columns[5].innerText,
        n2: columns[6].innerText,
      };
    }
    );
    return notes;
  });

  const AI = await (await page.waitForSelector('#wrap > div.container > div > div > p > strong')).evaluate(() => {
    const AI = document.querySelector('#wrap > div.container > div > div > p > strong').innerText;
    return AI;
  });

  const AI_SOL = AI.split(' ').join('').split(':').slice(1).toString();

  const notas = {
    ai: AI_SOL,
    notas: tableNotes,
  }
  
  console.log('NOTAS', notas);
};

getNotesAndFrequencies();
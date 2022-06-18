const login = require('./login');

const matricula = process.env.MATRICULA;
const senha = process.env.SENHA;

const getNotesAndFrequencies = async () => {
  const { page, browser } = await login(matricula, senha);
 
};

getNotesAndFrequencies();
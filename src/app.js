const puppeteer = require('puppeteer');
const user = require('./config');

(async () => {
  const USERNAME_SELECTOR = '#userNameInput';
  const PASSWORD_SELECTOR = '#passwordInput';
  const BUTTON_SELECTOR = '#submitButton';

  const browser = await puppeteer.launch({
    headless: false,
  });

  const minhaUbi = await browser.newPage();
  await minhaUbi.goto('https://minha.ubi.pt');

  await minhaUbi.click(USERNAME_SELECTOR);
  await minhaUbi.keyboard.type(user.username);

  await minhaUbi.click(PASSWORD_SELECTOR);
  await minhaUbi.keyboard.type(user.password);

  await minhaUbi.click(BUTTON_SELECTOR);

  await minhaUbi.waitForNavigation();

  await minhaUbi.goto('https://academicos.ubi.pt/Default.aspx');

  await minhaUbi.goto('https://academicos.ubi.pt/alunos/inscricaoturnos.aspx');
  await minhaUbi.waitForNavigation({ waitUntil: 'networkidle0' });

  await browser.close();
})();

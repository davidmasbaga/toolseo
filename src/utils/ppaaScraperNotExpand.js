import puppeteer from 'puppeteer';
import colors from 'colors';

const clearQuery = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  const withoutAccents = lowerCaseQuery
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n');
  const cleanText = withoutAccents.replace(/[^\w\s]/gi, '');
  const splitQuery = cleanText.split(' ');
  const finalQuery = splitQuery.join('+');
  return finalQuery;
};

const codeSearchQuery = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  const withoutAccents = lowerCaseQuery
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n');
  const cleanText = withoutAccents.replace(/[^\w\s]/gi, '');
  return cleanText;
};

const navigateToQuery = async (page, query, lowerQuery) => {
  await page.goto(`https://google.com/search?q=${query}`);
  console.log(`${colors.green('Query:')} ${query}`);
  await page.setViewport({ width: 1080, height: 1024 });
  await page.screenshot({
    path: 'screenshoot-cookies.jpg',
  });
  await acceptCookies(page);

  console.log('lowerQuery:', lowerQuery);
  // Lógica de DIVS para encontrar PPAA
  const jsnameHandle = await page.waitForXPath(
    `//*[@data-initq='${lowerQuery}']/div/div[@jsname]/@jsname`,
  );
  const firstJsname = await page.evaluate(
    (element) => element.textContent,
    jsnameHandle,
  );
  console.log(colors.red(firstJsname));
  const secondJsHandle = await page.waitForXPath(
    `(//*[@jsname='${firstJsname}']//*[@jsname]/@jsname)[1]`,
  );
  const secondJsName = await page.evaluate(
    (element) => element.textContent,
    secondJsHandle,
  );
  console.log(colors.red(secondJsName));

  // Sacamos los 4 primeros PPAA
  let ppaaHandles = await page.$x(
    `//*[@jsname='${secondJsName}']//*[@data-q]/@data-q`,
  );
  
  const listofPpaa = [];
  for (let handle of ppaaHandles) {
    let text = await page.evaluate((element) => element.textContent, handle);
    listofPpaa.push(text);
  }

  console.log(listofPpaa);
  return listofPpaa;
};

const acceptCookies = async (page) => {
  try {
    await page.waitForXPath("//div[text()='Aceptar todo']");
    const acceptButton = await page.$x("//div[text()='Aceptar todo']");
    await acceptButton[0].click();
  } catch (err) {
    console.log(err);
  }
};

export { clearQuery, codeSearchQuery, navigateToQuery, acceptCookies };

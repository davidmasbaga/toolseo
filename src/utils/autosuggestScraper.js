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

const navigateToGoogle = async (page, lowerQuery) => {
  await page.goto(`https://google.com/`);
  await page.setViewport({ width: 1080, height: 1024 });
  await page.screenshot({
    path: 'screenshoot-cookies.jpg',
  });
  await acceptCookies(page);
  const textareaSelector = 'textarea[type="search"]'
  await page.waitForSelector(textareaSelector)
  await page.type(textareaSelector, lowerQuery);
  await page.click(textareaSelector)

  //Lógica de scraper
  const xpath = "(//*/div/div/ul[contains(@role, 'listbox')]/li/div/div[2]/div[1]/@class)[1]";
  const parentClass= await page.waitForXPath(xpath)
  const mainClass = await page.evaluate(
    (element) => element.textContent,
    parentClass,
  );
  console.log('mainClass:', mainClass)

  // Verificar si mainClass se obtiene correctamente
  if (!mainClass) {
    console.error('mainClass no se obtuvo correctamente');
    return [];
  }

  // Buscar todos los divs con la misma clase y extraer su aria-label usando XPath
  const xpathForMainClass = `//div[contains(@class, '${mainClass}')]`;
  const elementsWithMainClass = await page.$x(xpathForMainClass);

  // console.log('elementsWithMainClass length:', elementsWithMainClass.length);

  if (!elementsWithMainClass.length) {
    console.error('No se obtuvieron los elementos correctamente');
    return [];
  }

  const ariaLabels = []

  const promises = elementsWithMainClass.map(element => element.evaluate(el=>el.getAttribute('aria-label')))

  const labels = await Promise.all(promises);
  // console.log('labels:', labels);

  const filteredAriaLabels = labels.filter(label => label !== null);
  console.log('filtered;',filteredAriaLabels)

  return filteredAriaLabels;
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

export { clearQuery, codeSearchQuery, navigateToGoogle, acceptCookies };

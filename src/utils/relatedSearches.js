import colors from 'colors'
const acceptCookies = async (page) => {
    try {
      await page.waitForXPath("//div[text()='Aceptar todo']");
      const acceptButton = await page.$x("//div[text()='Aceptar todo']");
      await acceptButton[0].click();
    } catch (err) {
      console.log(err);
    }
  };
  
  const navigateToQuery = async (page, query) => {
    await page.goto(`https://google.com/search?q=${query}`);
    console.log(`${colors.green('Query:')} ${query}`);
    await page.setViewport({ width: 1080, height: 1024 });
   
    await acceptCookies(page);
    const extractdataHveid = await page.waitForXPath(
      `//div[@data-hveid and @data-abe and descendant::text()[contains(., 'Búsquedas relacionadas')]]/@data-hveid`,
    );
    const dataHveidExtracted = await page.evaluate(
      (element) => element.textContent,
      extractdataHveid,
    );
    console.log(colors.red(dataHveidExtracted));
  
  
     const extractSecondDataClass = await page.waitForXPath(
      `//div[@data-hveid='${dataHveidExtracted}']/div/div[last()]/div/div/@class
        `,
    );
  
    
    const secondDataClassExtracted = await page.evaluate(
      (element) => element.textContent,
      extractSecondDataClass,
    );
    console.log(colors.yellow(secondDataClassExtracted))
  
  
    const relatedDivsExtracted = await page.evaluate((secondDataClassExtracted) => {
        const xpathExpression = `//div[@class='${secondDataClassExtracted}']//div`;
        const xpathResult = document.evaluate(xpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        const dataHveidValues = [];
        for (let i = 0; i < xpathResult.snapshotLength; i++) {
          const element = xpathResult.snapshotItem(i);
          const dataHveidValue = element.getAttribute('data-hveid');
          if(dataHveidValue) {  // Solo agregar el valor si no es null
            dataHveidValues.push(dataHveidValue);
          }
        }
        return dataHveidValues;
      }, secondDataClassExtracted);
      
      console.log(colors.blue(relatedDivsExtracted));
  
      let textContents = []
      
      // Hacemos un loop sobre relatedDivsExtracted y obtenemos el texto de cada div correspondiente
      for (let i = 0; i < relatedDivsExtracted.length; i++) {
        const textContent = await page.evaluate((dataHveid) => {
          const element = document.querySelector(`div[data-hveid='${dataHveid}']`);
          return element ? element.textContent : null;  // Si el elemento existe, devolvemos su texto
        }, relatedDivsExtracted[i]);
        
      if (textContent) {  
        textContents.push(textContent);
      }
    }
    
    
    console.log(colors.green(textContents));
  
   
    return textContents;
  };
  
  
      
      
        
  export { navigateToQuery };
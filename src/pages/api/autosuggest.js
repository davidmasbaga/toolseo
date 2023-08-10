import puppeteer from 'puppeteer';
import { clearQuery, codeSearchQuery, navigateToGoogle } from '../../utils/autosuggestScraper';

let allResults = [];
let finalResults = [];

async function scrape(queryArray, performSecondScrape = false, recursiveTimes = null) {
  for (let rawQuery of queryArray) {
    const lowerQuery = codeSearchQuery(rawQuery);
    console.log(lowerQuery);
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    try {
      const results = await navigateToGoogle(page, lowerQuery);
      allResults.push({ query: rawQuery, results: results });
      finalResults.push({ query: rawQuery, results: results });
    } catch (error) {
      console.log('No se ha encontrado la consulta: ' + rawQuery);
    } finally {
      await browser.close();
    }
  }

  if (performSecondScrape) {
    for (let result of allResults) {
      const resultado = result.results;
      const maxIter = recursiveTimes !== null ? Math.min(recursiveTimes, resultado.length) : resultado.length;
      for (let i = 0; i < maxIter; i++) {
        const secondSearchQuery = codeSearchQuery(resultado[i]);
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        try {
          const results = await navigateToGoogle(page, secondSearchQuery);
          finalResults.push({ query: secondSearchQuery, results: results });
        } catch (error) {
          console.log('No se ha encontrado la consulta ' + secondSearchQuery);
        } finally {
          await browser.close();
        }
      }
    }
  }

  return finalResults;
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { queries, performSecondScrape, recursiveTimes } = req.body;

    if (!queries || !Array.isArray(queries)) {
      return res.status(400).json({ error: 'Las consultas deben ser proporcionadas como una matriz.' });
    }

    try {
      const results = await scrape(queries, performSecondScrape, recursiveTimes);
      return res.status(200).json({ data: results });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al realizar la búsqueda.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

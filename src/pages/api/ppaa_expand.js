// Archivo: /pages/api/search.js
import puppeteer from 'puppeteer';
import { clearQuery, codeSearchQuery, navigateToQuery } from '../../utils/ppaaScraper';


const getResult = async (element, times = 15) => {
  const rawQuery = element;
  const userNumberInput = times;
  const timesToExpand = Math.round(userNumberInput * 0.6);
  const query = clearQuery(rawQuery);
  const lowerQuery = codeSearchQuery(rawQuery);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    const results = await navigateToQuery(page, query, lowerQuery, timesToExpand);
    await browser.close();
    return results.map((ppaa) => ({ keyword: element, ppaa }));
  } catch (error) {
    console.error('No se ha encontrado PPAA')
    await browser.close();
    return []
  }
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const { key } = req.body;

    // Asegúrate de manejar errores aquí, ya que key puede ser null si no se proporciona
    const results = await getResult(key);

    // Devuelve los resultados como JSON
    res.status(200).json({ data: results });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

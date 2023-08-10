import puppeteer from "puppeteer";
import { clearQuery } from "@/utils/ppaaScraper";
import { navigateToQuery } from "@/utils/relatedSearches";


const getResults = async (element )=>{
    const rawQuery = element;
    const query = clearQuery(rawQuery)
    console.log('query:',query)
    const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
    
      try {
        const results = await navigateToQuery(page, query);
        await browser.close();
        return results.map((related) => ({ keyword: element, related }));
      } catch (error) {
        console.error('No hemos encontrado información')
        await browser.close();
        return []
      }
    }

    export default async (req,res)=>{
      if (req.method ==='POST'){
        const {key} = req.body
      

      const results = await getResults(key);

  res.status(200).json({data:results});
    
      } else{
        res.setHeader('Allow','POST');
        res.status(405).end('Method not Allowed')
      }
    }

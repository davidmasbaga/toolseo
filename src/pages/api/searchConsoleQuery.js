import { createClient } from "../../utils/googleClient.js";

//En este endpoint realizaremos la consulta clásica de query + URL + Data de GSC

export default async function handler(req, res) {
  const { url,startDate, endDate } = req.body;
  const client = createClient();

  try {
    const response = await client.searchanalytics.query({
      siteUrl: url,
      startDate: startDate,
      endDate: endDate,
      rowLimit: 1500,
      dimensions: ["query", "page"],
    });

    const responseData = response.data.rows;
    const finalData = responseData.map((row) => {
      return {
        query: row.keys[0],
        url: row.keys[1],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: parseFloat(row.ctr).toFixed(2),
        position: parseFloat(row.position).toFixed(2),
      };
    });

    res.status(200).json(finalData);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los datos", error: error.message });
  }
}

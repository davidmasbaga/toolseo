import { createClient } from "../../utils/googleClient";

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
      dimensions: ["page"],
    });

    const responseData = response.data.rows;
    const finalData = responseData.map((row) => {
      return {
        url: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
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

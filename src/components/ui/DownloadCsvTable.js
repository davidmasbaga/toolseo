import React from 'react'
import { Button } from "semantic-ui-react";

function DownloadCsvTable(props) {

    function downloadCSV() {
        const headers = Object.keys(props.response[0]);
        const data = [headers, ...props.response.map(row => Object.values(row))];
        const csv = data.map(row => row.join(',')).join('\n');
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        link.target = '_blank';
        link.download = `data_${props.name}.csv`;
        link.click();
      }    

  return (
    <div>
    <Button color="teal" onClick={downloadCSV}>
                Download CSV
              </Button></div>
  )
}

export default DownloadCsvTable
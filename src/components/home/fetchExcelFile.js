import axios from "axios";
import * as XLSX from "xlsx";

const colors = [
  "#0F42F2",
  "#FA5757",
  "#DEEBBC",
  "#CBFB45",
  "#3789B8",
  "#A52a2a",
  "#B8379B",
  "#195818",
];

const fetchExcelFile = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const data = new Uint8Array(response.data);
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const totalRow = jsonData[9]; 
  const totalValueStr = totalRow ? totalRow[0] : "0"; 
  const totalValue = parseFloat(totalValueStr.toString().replace(/,/g, ""));
  
  const chartData = jsonData.slice(1, 9).map((row, index) => ({
    name: row[1],
    value: parseFloat(row[0].toString().replace(/,/g, "")),
    percentage:
      (parseFloat(row[0].toString().replace(/,/g, "")) / totalValue) * 100,
    color: colors[index % colors.length], 
  }));

  return chartData;
};

export { fetchExcelFile };

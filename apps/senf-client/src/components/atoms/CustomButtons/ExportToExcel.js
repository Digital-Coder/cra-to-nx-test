/** @format */

// /** @format */

// import React from "react";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// import downloadIcon from "../../../images/icons/file.png";

// export const ExportToExcel = ({ apiData, fileName, dataFinal }) => {
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   const exportToCSV = (apiData, fileName) => {
//     const ws = XLSX.utils.json_to_sheet(apiData);
//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   };

//   return (
//     <button
//       onClick={(e) => exportToCSV(apiData, fileName)}
//       className="monitoringFormControlSmall"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "white",
//         marginRight: "-10px",
//         marginBottom: "-20px",
//         width: "240px",
//       }}
//     >
//       {" "}
//       <img
//         src={downloadIcon}
//         style={{ paddingRight: "5px" }}
//         width="22"
//         alt="WeblinkIcon"
//       />
//       {dataFinal.length} Ideen exportieren
//     </button>
//   );
// };

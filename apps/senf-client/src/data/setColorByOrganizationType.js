/** @format */

const setColorByOrganizationType = (organizationType) => {
  let color;
  switch (organizationType) {
    case "Vereine":
      color = "rgb(248, 169, 160)";
      break;
    case "Initiativen":
      color = "rgb(210, 166, 229)";
      break;
    case "Planungsbüros":
      color = "rgb(146, 183, 178)";
      break;
    case "Politik":
      color = "rgb(255, 196, 115)";
      break;
    case "Inklusion / Soziales":
      color = "#e8907e";
      break;
    case "Versorgung":
      color = "#bd98f6";
      break;
    default:
      color = "#f9db95";
  }
  return color;
};

export default setColorByOrganizationType;

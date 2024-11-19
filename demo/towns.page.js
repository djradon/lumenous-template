export const title = "Central Albertan municipalities";
export const layout = "layouts/stand-alone.vto";

// Data for municipalities
const municipalities = [
  "Olds",
  "Didsbury",
  "Carstairs",
  "Sundre",
  "Bowden",
];

export default (data, filters) => {
  const municipalityList = municipalities.map((municipality) =>
    `<li>${municipality}</li>`
  ).join("\n");
  return `
    <h1>${data.title}</h1>
    <ul>
      ${municipalityList}
    </ul>
  `;
};

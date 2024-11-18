export const layout = "layouts/theme.vto";
export const main_menu = "themes";

const url = "https://djradon.github.io/lumenous-template/fetch.json";
const themes = await fetch(url).then((res) => res.json());

export default async function* () {
  for (const theme of themes) {
    yield {
      url: `/theme/${theme.id}/`,
      title: theme.name,
      ...theme,
    };
  }
}

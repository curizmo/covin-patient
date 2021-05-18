import config from "../config/index";

export async function getFile(container, file) {
  const response = await fetch(`${config.apiURL}/file/${container}/${file}`, {
    responseType: "blob",
  });

  return response.blob();
}

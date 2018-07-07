// @flow

/**
 * Imports module by URL
 * @param url URL of module to be imported
 */
export default function importURL(url: string): Promise<undefined> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.setAttribute("module", true);
    script.src = url;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      resolve();
    });
    script.addEventListener("error", reject);
  });
}

export function stripHTML(htmlString: string): string {
  // Use a regular expression to remove all HTML tags
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}
export function cleanHtmlContent(content: string): string {
  if (!content) return "";

  return (
    content
      // Remove HTML tags but preserve line breaks
      .replace(/<\/p>/g, "\n")
      .replace(/<\/li>/g, "\n")
      .replace(/<\/div>/g, "\n")
      .replace(/<[^>]*>/g, "")
      // Remove image source credits
      .replace(/Credit:.*?\n/g, "")
      // Remove URLs
      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
      // Clean up HTML entities
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#8230;/g, "...")
      // Remove multiple line breaks and spaces
      .replace(/\n\s*\n/g, "\n")
      .replace(/\s+/g, " ")
      // Remove extra whitespace
      .trim()
  );
}

declare module "react-native-rss-parser" {
  export interface RSSItem {
    id?: string;
    guid?: string;
    title: string;
    description?: string;
    link: string;
    published?: string;
    mediaContent?: Array<{ url: string }>;
    enclosures?: Array<{ url: string }>;
  }

  export interface RSSFeed {
    items: RSSItem[];
  }

  export function parse(text: string): Promise<RSSFeed>;
}

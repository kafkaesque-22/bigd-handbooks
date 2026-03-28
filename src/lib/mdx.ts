import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

const HANDBOOK_PATH = path.join(process.cwd(), 'content/handbook');
const HEADING_REGEX = /^##\s+(.*)$/gm;

interface Heading {
  id: string;
  title: string;
}

interface HandbookData {
  content: string;
  frontmatter: Record<string, any>;
  headings: Heading[];
}

export const getHandbookData = cache(async (slug: string): Promise<HandbookData | null> => {
  const filePath = path.join(HANDBOOK_PATH, `${slug}.mdx`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    const headings: Heading[] = Array.from(content.matchAll(HEADING_REGEX)).map((match) => {
      const title = match[1].trim();
      return {
        id: title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-'),
        title: title,
      };
    });

    return {
      content,
      frontmatter: {
        title: data.title || 'Untitled',
        ...data,
      },
      headings,
    };
  } catch (error) {
    console.error(`Error reading handbook file: ${slug}`, error);
    return null;
  }
});
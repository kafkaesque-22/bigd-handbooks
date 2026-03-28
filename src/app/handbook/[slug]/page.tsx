import { getHandbookData } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import HandbookContentWrapper from '@/components/handbook/HandbookContentWrapper';
import styles from './HandbookPage.module.css';

interface HandbookPageProps {
  params: Promise<{ slug: string }>;
}

export default async function HandbookPage({ params }: HandbookPageProps) {
  const { slug } = await params;
  const data = await getHandbookData(slug);

  if (!data) {
    notFound();
  }

  return (
    <HandbookContentWrapper sections={data.headings}>
      <article className={styles.prose}>
        <MDXRemote 
          source={data.content} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </article>
    </HandbookContentWrapper>
  );
}

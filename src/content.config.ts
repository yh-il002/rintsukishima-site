import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 書誌データは ../kindle-publishing/books/<slug>/ から必要な分だけコピーする
const edition = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    /** 仮題なら true（表示はそのまま、メモ用） */
    tentative: z.boolean().default(false),
    description: z.string(),
    cover: image(),
    /** 出版後に追記 */
    asin: z.string().optional(),
    amazonUrl: z.url().optional(),
  });

const books = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      year: z.number().int(),
      /** 並び順（大きいほど新しい） */
      order: z.number().int(),
      genre: z.object({ ja: z.string(), en: z.string() }),
      ja: edition({ image }),
      en: edition({ image }),
    }),
});

export const collections = { books };

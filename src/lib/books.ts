import { getCollection, type CollectionEntry } from 'astro:content';

export type Book = CollectionEntry<'books'>;

/** 新しい順 */
export async function getBooks(): Promise<Book[]> {
  const books = await getCollection('books');
  return books.sort((a, b) => b.data.order - a.data.order);
}

/** 説明文の最初の段落（一覧用） */
export const lead = (description: string) => description.trim().split('\n')[0];

export const paragraphs = (description: string) =>
  description
    .trim()
    .split('\n')
    .filter((p) => p.trim() !== '');

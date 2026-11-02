export type Lang = 'ja' | 'en';
export const langs: Lang[] = ['ja', 'en'];

export const SITE_URL = 'https://rintsukishima.com';

/**
 * 公式アカウント。フッターとプロフィールページに表示し、JSON-LD の sameAs にも使う
 * アカウントを作ったら、該当行のコメントを外す（空ならリンク欄ごと非表示）
 */
export const socials: { label: string; url: string }[] = [
  // { label: 'X', url: 'https://x.com/rin_tsukishima' },
  // { label: 'Instagram', url: 'https://www.instagram.com/rin_tsukishima/' },
  // { label: 'note', url: 'https://note.com/rin_tsukishima' },
  // { label: 'YouTube', url: 'https://www.youtube.com/@rin_tsukishima' }, // 確保済み。いまは非表示
];

/** Amazon 著者ページ（作成後に追記。sameAs にも使う） */
export const amazonAuthorPages: string[] = [];

export const ui = {
  ja: {
    siteName: '月島 凛 | Rin Tsukishima',
    homeDescription: '小説家・月島 凛（Rin Tsukishima）の公式サイト。著作とプロフィールを紹介します。',
    aboutTitle: 'プロフィール',
    aboutDescription: '小説家・月島 凛（つきしま りん）のプロフィール。',
    navLabel: 'メインメニュー',
    langGroupLabel: '言語',
    eyebrow: 'Novelist / 小説家',
    // TODO: キャッチコピー（作風をひとことで）
    catchcopy: '[キャッチコピー — 作風をひとことで。例：静けさの中にある、言葉にならない感情を書く。]',
    // TODO: プロフィール文（150〜250字）
    bio: '[プロフィール文（日本語）— 出身・書いているジャンル・作品に込めているテーマなどを150〜250字程度で。]',
    profileSub: 'プロフィール',
    worksSub: '著作',
    readMore: 'プロフィールを読む',
    availableOn: 'Amazon Kindle にて配信',
    readOnAmazon: 'Amazonで読む',
    comingSoon: '近日刊行',
    details: '作品の詳細',
    backToWorks: '著作一覧へ',
    links: 'リンク',
    otherLang: 'English edition',
    jobTitle: '小説家',
    notFound: 'ページが見つかりませんでした。',
    toHome: 'トップへ戻る',
  },
  en: {
    siteName: 'Rin Tsukishima | 月島 凛',
    homeDescription: 'The official website of Rin Tsukishima, a Japanese novelist. Books and profile.',
    aboutTitle: 'Profile',
    aboutDescription: 'About Rin Tsukishima, a Japanese novelist.',
    navLabel: 'Main menu',
    langGroupLabel: 'Language',
    eyebrow: 'Novelist',
    // TODO: Tagline in English
    catchcopy: '[Tagline in English — one line on what you write.]',
    // TODO: Profile in English (60–100 words)
    bio: '[Profile in English — a short bio of 60–100 words: where you are from, what you write, and the themes you return to.]',
    profileSub: '',
    worksSub: '',
    readMore: 'Read profile',
    availableOn: 'Available on Amazon Kindle',
    readOnAmazon: 'Read on Amazon',
    comingSoon: 'Coming soon',
    details: 'Details',
    backToWorks: 'All works',
    links: 'Links',
    otherLang: '日本語版',
    jobTitle: 'Novelist',
    notFound: 'Page not found.',
    toHome: 'Back to home',
  },
} as const;

export const t = (lang: Lang) => ui[lang];

/** 言語つきのパス（ja はプレフィックスなし） */
export const path = (lang: Lang, p = '/') => (lang === 'ja' ? p : `/en${p}`);

export const personId = `${SITE_URL}/#person`;

export function personJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: lang === 'ja' ? '月島 凛' : 'Rin Tsukishima',
    alternateName: lang === 'ja' ? ['Rin Tsukishima', 'ツキシマ リン'] : ['月島 凛', 'ツキシマ リン'],
    url: `${SITE_URL}${path(lang)}`,
    jobTitle: ui[lang].jobTitle,
    sameAs: [...amazonAuthorPages, ...socials.map((s) => s.url)],
  };
}

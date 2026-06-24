import { Head, Html, Main, NextScript } from "next/document";

// Apply the persisted theme before first paint to avoid a flash of the wrong
// theme on reload. Must stay in sync with STORAGE_KEY in hooks/use-theme.ts.
const themeScript = `(function(){try{var t=localStorage.getItem('interface-theme')||'system';var dark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

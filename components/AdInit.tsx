'use client';

import { useEffect } from 'react';

const waitFor = (fnName: string, timeout = 8000, interval = 100) => 
  new Promise<void>((resolve) => {
    const start = Date.now();
    const iv = setInterval(() => {
      // @ts-ignore
      if (typeof (window as any)[fnName] === "function") {
        clearInterval(iv);
        resolve();
      } else if (Date.now() - start > timeout) {
        clearInterval(iv);
        resolve(); // continue anyway
      }
    }, interval);
  });

export default function AdInit() {
  useEffect(() => {
    let mounted = true;

    async function initAll() {
      await Promise.all([
        waitFor("initAd"),
        waitFor("initSocialAd"),
        waitFor("initNativeAd"),
        waitFor("initBannerAd"),
        waitFor("initTextAd"),
      ]);

      if (!mounted) return;

      const w = window as any;
      try { w.initAd && w.initAd(["7SAD1569931FE9A3CA4", "popunder"]); } catch(e) { console.error(e); }
      try { w.initSocialAd && w.initSocialAd(["7SAD1569931FD995AB7", "social"]); } catch(e) { console.error(e); }
      try { w.initNativeAd && w.initNativeAd(["7SAD1569931FC4723C9", "native", 4]); } catch(e) { console.error(e); }
      try { w.initBannerAd && w.initBannerAd(["7SAD1569931DB11B66E", "banner", 1]); } catch(e) { console.error(e); }
      try { w.initTextAd && w.initTextAd(["7SAD1569931D19BE7D5", "text"]); } catch(e) { console.error(e); }

      console.log("✅ 7SearchPPC All ads initialized");
    }

    initAll();

    return () => { mounted = false; };
  }, []);

  return null;
}

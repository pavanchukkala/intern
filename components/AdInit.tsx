// components/AdInit.tsx
"use client";
import { useEffect } from "react";

/**
 * Safe, minimal initializer for 7searchppc vendor functions.
 * It waits a short time for vendor functions and calls them if present.
 * Adjust IDs/timeouts if needed.
 */

function waitFor(fnName: string, timeout = 8000, interval = 250) {
  return new Promise<void>((resolve) => {
    const start = Date.now();
    const iv = setInterval(() => {
      // @ts-ignore
      if (typeof (window as any)[fnName] === "function") {
        clearInterval(iv);
        resolve();
      } else if (Date.now() - start > timeout) {
        clearInterval(iv);
        resolve(); // resolve anyway, we handle missing functions gracefully
      }
    }, interval);
  });
}

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
      try { w.initAd && w.initAd(["7SAD1569931FE9A3CA4", "popunder"]); } catch {}
      try { w.initSocialAd && w.initSocialAd(["7SAD1569931FD995AB7", "social"]); } catch {}
      try { w.initNativeAd && w.initNativeAd(["7SAD1569931FC4723C9", "native", 4]); } catch {}
      try { w.initBannerAd && w.initBannerAd(["7SAD1569931DB11B66E", "banner", 1]); } catch {}
      try { w.initTextAd && w.initTextAd(["7SAD1569931D19BE7D5", "text"]); } catch {}
    }

    initAll();
    return () => { mounted = false; };
  }, []);

  return null;
}

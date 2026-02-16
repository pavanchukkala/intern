// components/AdInit.tsx
"use client";
import { useEffect } from "react";

/**
 * Lightweight client-only initializer for 7searchppc ad scripts.
 * It waits for vendor init functions to appear and calls them safely.
 *
 * Replace the IDs below with your actual ad unit IDs if they differ.
 */

function waitFor(fnName: string, timeout = 8000, interval = 200) {
  return new Promise<void>((resolve, reject) => {
    const start = Date.now();
    const handle = setInterval(() => {
      // @ts-ignore
      if (typeof (window as any)[fnName] === "function") {
        clearInterval(handle);
        resolve();
      } else if (Date.now() - start > timeout) {
        clearInterval(handle);
        reject(new Error(`${fnName} not found after ${timeout}ms`));
      }
    }, interval);
  });
}

export default function AdInit() {
  useEffect(() => {
    let mounted = true;

    async function initAll() {
      try {
        // Wait for any of the initializer functions to show up (best-effort)
        await Promise.allSettled([
          waitFor("initAd", 6000).catch(() => {}),
          waitFor("initSocialAd", 6000).catch(() => {}),
          waitFor("initNativeAd", 6000).catch(() => {}),
          waitFor("initBannerAd", 6000).catch(() => {}),
          waitFor("initTextAd", 6000).catch(() => {})
        ]);

        if (!mounted) return;

        const w = window as any;
        // Safe calls — each inside try/catch so a single missing fn won't break others.
        try { w.initAd && w.initAd(["7SAD1569931FE9A3CA4", "popunder"]); } catch(e) { /*noop*/ }
        try { w.initSocialAd && w.initSocialAd(["7SAD1569931FD995AB7", "social"]); } catch(e) { /*noop*/ }
        try { w.initNativeAd && w.initNativeAd(["7SAD1569931FC4723C9", "native", 4]); } catch(e) { /*noop*/ }
        try { w.initBannerAd && w.initBannerAd(["7SAD1569931DB11B66E", "banner", 1]); } catch(e) { /*noop*/ }
        try { w.initTextAd && w.initTextAd(["7SAD1569931D19BE7D5", "text"]); } catch(e) { /*noop*/ }
      } catch (err) {
        // keep silent in production; console available for local debugging
        // console.warn("AdInit error", err);
      }
    }

    initAll();
    return () => { mounted = false; };
  }, []);

  return null;
}

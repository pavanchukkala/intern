// components/AdInit.tsx
"use client";
import { useEffect } from "react";

function waitFor(fnName: string, timeout = 5000, interval = 200) {
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
        // wait for initAd (popunder) as an example
        await waitFor("initAd", 8000).catch(()=>{ /* ignore if missing */ });

        if (!mounted) return;

        // call initializers if they exist
        // Example IDs (replace with your real IDs)
        try { /* @ts-ignore */ window.initAd && window.initAd(['7SAD1569931FE9A3CA4','popunder']); } catch(e){}
        try { /* @ts-ignore */ window.initSocialAd && window.initSocialAd(['7SAD1569931FD995AB7','social']); } catch(e){}
        try { /* @ts-ignore */ window.initNativeAd && window.initNativeAd(['7SAD1569931FC4723C9','native', 4]); } catch(e){}
        try { /* @ts-ignore */ window.initBannerAd && window.initBannerAd(['7SAD1569931DB11B66E','banner', 1]); } catch(e){}
        try { /* @ts-ignore */ window.initTextAd && window.initTextAd(['7SAD1569931D19BE7D5','text']); } catch(e){}
      } catch (err) {
        // console.warn("Ad init error", err);
      }
    }

    initAll();
    return () => { mounted = false; };
  }, []);

  return null;
}

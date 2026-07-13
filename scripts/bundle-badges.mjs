#!/usr/bin/env node
/*
 * Bundle a self-contained "Published on Spacefast" badge into each example's
 * published output. The badge carries that example's prompt inline, so it needs
 * NO cross-origin fetch (no CORS, no dependency on spacefast.com being
 * redeployed). When the prompt/template changes, re-run this and republish.
 *
 * For each examples/<slug>:
 *   - resolve the publish dir (site/dist | site/build | site)
 *   - write <pubdir>/sf-badge.js  (badge code + this example's prompt + slug)
 *   - rewrite every .html to load /sf-badge.js instead of spacefast.com/badge.js
 *
 *   node scripts/bundle-badges.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const EX = path.join(ROOT, "examples");

// The self-contained badge. SF_PROMPT and SF_SLUG are injected per example.
const BADGE_BODY = `(function(){
"use strict";
if(window.__spacefastBadge)return;window.__spacefastBadge=true;
var BASE="https://spacefast.com",FONT="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
function ready(fn){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn();}
ready(function(){
var dark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;
var bg=dark?"#141414":"#fff",fg=dark?"#fff":"#141414",sub=dark?"rgba(255,255,255,.62)":"rgba(0,0,0,.55)",border=dark?"rgba(255,255,255,.16)":"rgba(0,0,0,.12)",field=dark?"#0c0c0c":"#f5f5f5";
var pill=document.createElement("button");pill.type="button";pill.setAttribute("aria-label","Published on Spacefast — make your own");
pill.style.cssText="position:fixed;bottom:18px;right:18px;z-index:2147483000;display:inline-flex;align-items:center;gap:10px;max-width:calc(100vw - 36px);padding:12px 18px;border-radius:999px;background:"+bg+";color:"+fg+";border:1px solid "+border+";font:600 15px/1.2 "+FONT+";box-shadow:0 8px 26px -6px rgba(0,0,0,.4);cursor:pointer;transition:transform .16s ease;";
pill.innerHTML='<span style="width:11px;height:11px;flex:0 0 auto;background:#ff603d;transform:rotate(45deg);border-radius:1px;"></span><span>This is a fake site published on <strong style="font-weight:700">Spacefast</strong>.</span>';
var pop=document.createElement("div");
pop.style.cssText="position:fixed;bottom:74px;right:18px;z-index:2147483000;width:min(360px,calc(100vw - 32px));background:"+bg+";color:"+fg+";border:1px solid "+border+";border-radius:14px;box-shadow:0 24px 60px -16px rgba(0,0,0,.5);padding:16px;font:400 14px/1.5 "+FONT+";display:none;";
pop.innerHTML='<div style="font:700 15px/1.3 '+FONT+';margin-bottom:4px;">Make your own.</div><div style="color:'+sub+';font-size:13px;margin-bottom:12px;">Copy this prompt into any AI agent — Claude, ChatGPT, Codex. It builds your version and publishes it free, no account needed.</div><pre data-p style="margin:0 0 12px;padding:11px 12px;background:'+field+';border:1px solid '+border+';border-radius:8px;max-height:160px;overflow:auto;white-space:pre-wrap;word-break:break-word;font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:'+fg+';"></pre><div style="display:flex;align-items:center;gap:10px;"><button type="button" data-c style="flex:0 0 auto;font:600 13px/1 '+FONT+';padding:9px 15px;border-radius:8px;background:#ff603d;color:#0e0e10;border:0;cursor:pointer;">Get prompt to publish your own</button><a href="'+BASE+'/examples" target="_blank" rel="noopener" style="font:600 13px/1 '+FONT+';color:'+sub+';text-decoration:none;">More examples ↗</a></div>';
pop.querySelector("[data-p]").textContent=SF_PROMPT;
var copyEl=pop.querySelector("[data-c]"),open=false;
function setOpen(v){open=v;pop.style.display=v?"block":"none";}
pill.addEventListener("click",function(e){e.stopPropagation();setOpen(!open);});
pop.addEventListener("click",function(e){e.stopPropagation();});
document.addEventListener("click",function(){if(open)setOpen(false);});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&open)setOpen(false);});
copyEl.addEventListener("click",function(){if(navigator.clipboard)navigator.clipboard.writeText(SF_PROMPT).catch(function(){});var p=copyEl.textContent;copyEl.textContent="Copied!";setTimeout(function(){copyEl.textContent=p;},1800);});
pill.addEventListener("mouseenter",function(){pill.style.transform="translateY(-2px)";});
pill.addEventListener("mouseleave",function(){pill.style.transform="translateY(0)";});
document.body.appendChild(pop);document.body.appendChild(pill);
});
})();`;

function pubDir(slug) {
  const base = path.join(EX, slug, "site");
  for (const c of ["dist", "build"]) {
    if (fs.existsSync(path.join(base, c, "index.html"))) return path.join(base, c);
  }
  return fs.existsSync(path.join(base, "index.html")) ? base : null;
}

const badgeTag = /<script\b[^>]*\bsrc=["'][^"']*\/badge\.js["'][^>]*><\/script>/gi;

let done = 0;
const skipped = [];
for (const slug of fs.readdirSync(EX).filter((d) => fs.statSync(path.join(EX, d)).isDirectory())) {
  const dir = pubDir(slug);
  const promptPath = path.join(EX, slug, "prompt.md");
  if (!dir || !fs.existsSync(promptPath)) {
    skipped.push(slug);
    continue;
  }
  const prompt = fs.readFileSync(promptPath, "utf8").trim();
  const js = `(function(){var SF_PROMPT=${JSON.stringify(prompt)},SF_SLUG=${JSON.stringify(slug)};\n${BADGE_BODY}\n})();`;
  fs.writeFileSync(path.join(dir, "sf-badge.js"), js);

  // rewrite every html to load /sf-badge.js
  const rewrite = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rewrite(p);
      else if (e.name.endsWith(".html")) {
        const s = fs.readFileSync(p, "utf8");
        const s2 = s.replace(badgeTag, '<script src="/sf-badge.js"></script>');
        if (s2 !== s) fs.writeFileSync(p, s2);
      }
    }
  };
  rewrite(dir);
  done++;
}
console.log(`Bundled self-contained badge into ${done} examples${skipped.length ? "; skipped: " + skipped.join(", ") : ""}`);

#!/usr/bin/env node
// Promociona automáticamente cada skill nueva (o modificada) a X y Reddit.
// Se ejecuta desde .github/workflows/promote-skill.yml en cada push a main
// que toque skills/**/SKILL.md.

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fm;
}

function changedSkillFiles() {
  const { execSync } = require("child_process");
  const range = process.env.GITHUB_SHA
    ? `${process.env.BEFORE_SHA || "HEAD~1"} ${process.env.GITHUB_SHA}`
    : "HEAD~1 HEAD";
  let files;
  try {
    files = execSync(`git diff --name-only --diff-filter=A ${range}`)
      .toString()
      .split("\n")
      .filter(Boolean);
  } catch {
    files = [];
  }
  return files.filter((f) => f.match(/^skills\/[^/]+\/SKILL\.md$/));
}

function buildMessage(fm, skillDir) {
  const repoUrl = "https://github.com/FacundoMaco/mavreskills";
  const skillUrl = `${repoUrl}/tree/main/${skillDir}`;
  return `Nueva skill de Claude Code detectada por Scout: ${fm.name}\n\n${fm.description}\n\n${skillUrl}`;
}

// --- X (OAuth 1.0a user context, POST /2/tweets) ---
function oauth1Header(url, method, params, keys) {
  const oauthParams = {
    oauth_consumer_key: keys.apiKey,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: keys.accessToken,
    oauth_version: "1.0",
  };
  const allParams = { ...oauthParams, ...params };
  const paramString = Object.keys(allParams)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join("&");
  const baseString = [method, encodeURIComponent(url), encodeURIComponent(paramString)].join("&");
  const signingKey = `${encodeURIComponent(keys.apiSecret)}&${encodeURIComponent(keys.accessSecret)}`;
  const signature = crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");
  oauthParams.oauth_signature = signature;
  return (
    "OAuth " +
    Object.keys(oauthParams)
      .sort()
      .map((k) => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
      .join(", ")
  );
}

async function postToX(text) {
  const keys = {
    apiKey: process.env.X_API_KEY,
    apiSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  };
  if (!keys.apiKey) {
    console.log("X: sin credenciales, se salta.");
    return;
  }
  const url = "https://api.twitter.com/2/tweets";
  const authHeader = oauth1Header(url, "POST", {}, keys);
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ text: text.slice(0, 280) }),
  });
  const body = await res.text();
  console.log(`X: ${res.status} ${body}`);
}

// --- Reddit (script app, password grant) ---
async function postToReddit(title, text) {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const username = process.env.REDDIT_USERNAME;
  const password = process.env.REDDIT_PASSWORD;
  const subreddit = process.env.REDDIT_SUBREDDIT || "ClaudeAI";
  if (!clientId) {
    console.log("Reddit: sin credenciales, se salta.");
    return;
  }
  const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "mavreskills-promoter/1.0",
    },
    body: `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
  });
  const tokenBody = await tokenRes.json();
  if (!tokenBody.access_token) {
    console.log("Reddit: no se pudo autenticar", tokenBody);
    return;
  }
  const submitRes = await fetch("https://oauth.reddit.com/api/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenBody.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "mavreskills-promoter/1.0",
    },
    body: new URLSearchParams({
      sr: subreddit,
      kind: "self",
      title,
      text,
    }).toString(),
  });
  console.log(`Reddit: ${submitRes.status}`);
}

async function main() {
  const files = changedSkillFiles();
  if (files.length === 0) {
    console.log("No hay skills nuevas en este push. Nada que promocionar.");
    return;
  }
  for (const file of files) {
    const skillDir = path.dirname(file);
    const content = fs.readFileSync(file, "utf8");
    const fm = parseFrontmatter(content);
    if (!fm) continue;
    const message = buildMessage(fm, skillDir);
    console.log(`Promocionando ${fm.name}...`);
    await postToX(message);
    await postToReddit(`Nueva skill de Claude Code: ${fm.name}`, message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

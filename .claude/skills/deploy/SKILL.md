---
name: deploy
description: Run the full deploy pipeline — lint, tests, production build, then push a staging draft to Netlify. Stop on any failure.
---

# Deploy to Staging

Run these steps in order. Stop immediately and report the error if any step fails — do not proceed to the next step.

## Step 1 · Pre-flight

Check for uncommitted changes:

```bash
git status --short
```

If any unstaged or uncommitted files are present, warn the user:

> "You have uncommitted changes. These will NOT be included in the deploy."

Ask whether to continue or commit first. Do not proceed until the user confirms.

## Step 2 · Lint

```bash
npm run lint
```

Report pass/fail. On failure, show the ESLint output and stop.

## Step 3 · Tests

```bash
npm run test:run
```

Report pass/fail with the test summary line (e.g. "3 passed, 0 failed"). On failure, show the failing test names and stop.

## Step 4 · Production build

```bash
npm run build
```

After success, report the `dist/` output size:

```bash
du -sh dist/
```

On failure, show the Vite error output and stop.

## Step 5 · Deploy to Netlify staging (draft)

Before running, check both of these conditions:

1. **Auth** — if `NETLIFY_AUTH_TOKEN` is not set in the environment, tell the user:
   > "Run `npx netlify-cli login` to authenticate, then re-run `/deploy`."
   Stop here.

2. **Site link** — if `.netlify/state.json` does not exist, tell the user:
   > "This site isn't linked to a Netlify project yet. Run `npx netlify-cli link` first."
   Stop here.

Once both checks pass, push a **draft** (staging) deploy:

```bash
npx netlify-cli deploy --dir=dist
```

Report the draft URL from the output. This is the staging URL to share for review.

> To promote to production (live site), run separately:
> ```bash
> npx netlify-cli deploy --dir=dist --prod
> ```
> The `/deploy` skill never runs `--prod` automatically — it is staging-only.

## Summary

After all steps pass, print a one-line summary:

```
✓ Lint  ✓ Tests (N passed)  ✓ Build (X kb)  ✓ Staging → <draft-url>
```

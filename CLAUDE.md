# Flowli Funnel - Project Rules

## Copy / Text Rules

### CRITICAL: No em-dashes anywhere
**אף פעם לא להשתמש במקף ארוך (em-dash `—`). תמיד מקף קצר (`-`).**

This applies to ALL text in ALL files:
- HTML page content
- Results page variants (titleVariants, bodyVariants, insightFallbacks, tool1NameVariants, etc.)
- Loading page text
- Form labels
- Comments
- Commit messages
- Any text the user will see

**Bad:**  `המידע קיים — אבל מפוזר`
**Good:** `המידע קיים - אבל מפוזר`

If you write new copy or replace existing copy, scan the result for `—` and replace with `-` before committing.

## Funnel Flow Order

```
1. flowli-diagnose-intro.html       (landing page - "בלי בלאגן...")
2. flowli-diagnose-step1.html       (quiz - questions)
3. flowli-diagnose-loading.html     (analyzing animation + "קצת עליי" / Hadas intro)
4. flowli-diagnose-page.html        (lead capture - name, email, phone)
5. flowli-diagnose-results.html     (personalized results)
```

Entry: `index.html` redirects to `flowli-diagnose-intro.html`.

## Brand Tokens

- Cream background: `#F6F1E6`
- Orange primary: `#F26B1F`
- Orange deep: `#D45A12`
- Ink (dark): `#1A1A1A`
- Text: `#2A2A2A`
- Muted: `#8A8378`

## Fonts

- Body: `Assistant` (Hebrew)
- Headlines: `Rubik` (Hebrew)
- Logo / Brand mark: `Inter` (Latin "flowli" - lowercase, `flow` ink + `li` orange)
- Mono / Badges / Eyebrows: `JetBrains Mono`

## Logo

Always lowercase `flowli` in Latin, NEVER `FLOWLI`:
- `flow` in `#2A2A2A` (dark)
- `li` in `var(--orange)` (orange)
- Inter, weight 800, letter-spacing -0.035em

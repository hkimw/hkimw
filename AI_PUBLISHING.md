# AI Blog Publishing

This repository can publish Docusaurus blog posts from Google Docs without using Google Docs Markdown export.

## Flow

1. Write in Google Docs under the private drafts folder.
2. Move the document into `to publish translate and verify`.
3. The scheduled GitHub Action reads the Google Docs document structure with the Docs API.
4. AI checks Korean grammar and content consistency.
5. AI translates to English, reviews it, revises it, and reviews it again.
6. AI creates Docusaurus Markdown from zero base with visual elements such as Mermaid diagrams.
7. The workflow builds the site.
8. In `commit` mode, public `[kr]` and `[en]` Google Docs are created under `to publish visualize`, source files are archived, and blog Markdown is committed.
9. The existing Docusaurus deploy workflow publishes the site and sends a Telegram notification.

## Required Secrets

- `GOOGLE_CREDENTIALS`: Google service account JSON. `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_SERVICE_ACCOUNT_JSON_B64` are also supported.
- `GEMINI_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Share the Drive folders with the service account email as an editor. Set `BLOG_COMMIT_AUTHOR_EMAIL` to your GitHub no-reply email if you want generated commits to count as your own commits instead of an AI or bot contributor.

In `commit` mode, the workflow refuses to run without `BLOG_PUBLISH_PAT` and `BLOG_COMMIT_AUTHOR_EMAIL`. This is intentional: the repository contributor list should remain owned by `hwkim-dev`, not an AI account or GitHub bot account.

## Optional Secrets

- `GDRIVE_DRAFTS_FOLDER_ID`: failed documents are moved back here when validation blocks publishing.
- `GDRIVE_READY_FOLDER_ID`: exact folder ID for `to publish translate and verify`.
- `GDRIVE_VISUALIZE_FOLDER_ID`: exact folder ID for `to publish visualize`.
- `GDRIVE_PUBLISH_FOLDER_ID`: exact folder ID for `publish`.
- `BLOG_PUBLISH_PAT`: required only in `commit` mode.
- `BLOG_COMMIT_AUTHOR_EMAIL`: required only in `commit` mode.

## Optional Variables

- `BLOG_AI_PUBLISH_MODE`: `dry-run` or `commit`. Keep `dry-run` until you trust the output.
- `BLOG_COMMIT_AUTHOR_NAME`: default `hwkim-dev`.
- `BLOG_MAX_DOCS_PER_RUN`: default `1`.
- `GDRIVE_DRAFTS_FOLDER_NAME`: default `작성중`.
- `GDRIVE_READY_FOLDER_NAME`: default `to publish translate and verify`.
- `GDRIVE_VISUALIZE_FOLDER_NAME`: default `to publish visualize`.
- `GDRIVE_PUBLISH_FOLDER_NAME`: default `publish`.
- `GEMINI_MODEL`: default `gemini-2.5-pro`. Use `gemini-3-pro-preview` only when your API project has paid-tier Gemini API access.
- `GEMINI_API_BASE_URL`: default `https://generativelanguage.googleapis.com/v1beta`.
- `GEMINI_MAX_OUTPUT_TOKENS`: default `65536`.
- `GEMINI_TEMPERATURE`: default `0.2`.
- `GDRIVE_MAKE_PUBLIC`: `true` creates explicit anyone-reader permissions for generated public originals. Usually the public folder permission is enough.

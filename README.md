# SanskritAI — AI-Based Translation & Grammar Analysis

SanskritAI is a modern, full-stack web application designed to translate Sanskrit sentences into English while providing deep grammatical and morphological analysis.

## Features

- **Translation:** Accurate Sanskrit to English translations.
- **Detailed Meaning:** Contextual explanations for translated sentences.
- **Word-by-Word Analysis:** Root (Dhātu), Gender, Number, Case (Vibhakti), Person, Tense, Voice.
- **Sandhi & Samāsa Detection:** Explains combined words and compound words.
- **Sentence Structure:** Visualizes Subject -> Object -> Verb relationships.
- **Modular ML Architecture:** Pluggable translation provider system designed for Future Transformer models.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes (Ready for FastAPI integration)
- **Deployment:** Ready for Vercel (Frontend) and Render (Python ML Service)

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

The system uses a mock translation provider by default. To connect a real Transformer model:

1. Build a FastAPI service that exposes a `POST /translate` endpoint returning the expected JSON structure.
2. Update `getTranslationProvider` in `src/services/translation/provider.ts` to call your API.
3. Set `ML_API_URL` in your environment variables.

## Deployment

### Deploying Frontend (Vercel)
1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and build the project.
4. Add any environment variables in the Vercel dashboard.

### Deploying ML Service (Render)
1. Create a Web Service in Render connected to your Python API repository.
2. Set the environment to Python, specify `requirements.txt` and start command (e.g., `uvicorn main:app --host 0.0.0.0 --port 10000`).
3. Take the resulting URL and add it as `ML_API_URL` in Vercel.

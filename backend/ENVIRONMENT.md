Create a `.env` file at the repository root by copying `.env.example` and filling in the values.

Windows PowerShell example:

Copy-Item ..\.env.example ..\.env

Required keys (fill with your secrets):

- CLOUD_NAME
- API_KEY
- API_SECRET
- MONGO_URI

After creating `.env`, restart the dev server with `npm run dev` from the `backend` folder so the variables are loaded.

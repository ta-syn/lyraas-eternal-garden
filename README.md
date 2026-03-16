# 🌿 The Eternal Garden - Deployment Guide (Vercel)

This project is a premium memory garden website created for Lyraa by Yuki. It features a secure login system, background music, and a curated collection of memory websites.

## 🚀 Deployment to Vercel

Since the project uses an `/api` folder for serverless functions and a `.env` file for the password, follow these steps for a perfect deployment:

### 1. Push to GitHub
Ensure all your latest changes are pushed to your GitHub repository:
`https://github.com/ta-syn/lyraas-eternal-garden.git`

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"New Project"**.
3. Import your `lyraas-eternal-garden` repository.

### 3. Configure Environment Variables (CRITICAL)
Before clicking **Deploy**, you must add your secret password so the login system works:
1. In the Vercel project setup, find the **"Environment Variables"** section.
2. Add a new variable:
   - **Key:** `GARDEN_PASSWORD`
   - **Value:** `Muwhaayukii`
3. Click **Add**.

### 4. Deploy
Click **"Deploy"**. Vercel will automatically detect the `index.html` as your frontend and the `api/login.js` as a serverless function.

---

## 🛠 Project Structure
- `index.html`: The main visual experience.
- `api/login.js`: Secure serverless function for password verification.
- `assets/images/`: Contains `lyraaa.jpeg`.
- `assets/audio/`: Contains `Coldplay - Fix You.mp3`.
- `.env`: (Local only) Stores your password locally for testing.

## 🔒 Security Note
The password is kept safe in environment variables and is never exposed in the browser code. The `.gitignore` file ensures your local `.env` is never uploaded to GitHub.

---
*Made with ❤️ by Yuki for Lyraa.*

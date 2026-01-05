# Wanderlust — Airbnb Clone

🌐 **Live demo:** https://wanderlust-travelnest.onrender.com

Wanderlust is a lightweight, friendly Airbnb-style project built with Node.js, Express and MongoDB. It showcases full-stack features you'd expect in a small booking app: user authentication, listing CRUD, reviews and ratings, image uploads to Cloudinary, search and categories, and map integration using Leaflet + OpenStreetMap. The project is ideal for learning and experimenting with common web app patterns.

---

## 🚀 Features

- User signup, login and session management with Passport.js
- Create, read, update, and delete (CRUD) listings
- Upload listing images to Cloudinary
- Reviews with ratings and owner controls
- Search listings by title, location, country or category
- Category support (trending, rooms, cabins, beachfront, mountain, city)
- Map view using Leaflet + OpenStreetMap (Nominatim geocoding)
- Simple UI with Bootstrap and client-side enhancements (tax toggle, highlights)

---

## 🧭 Quick Start (Local)

Prerequisites:

- Node.js (recommended v18+)
- MongoDB (local or Atlas)

1. Clone the repo

   git clone https://github.com/R-Dhawale/Wanderlust-Airbnb_Clone.git
   cd Wanderlust-Airbnb_Clone

2. Install dependencies

   npm install

3. Create a `.env` file in project root and add the required environment variables (see below)

4. Run seed script (optional) to populate sample listings locally

   node init/index.js

5. Start the app (development)

   npm run dev

6. Open http://localhost:8080

---

## 🔐 Environment Variables

Create `.env` with the following values (example names):

- ATLASDB_URL - MongoDB Atlas connection string (mongodb+srv://...)
- CLOUD_NAME - Cloudinary cloud name
- CLOUD_API_KEY - Cloudinary API key
- CLOUD_API_SECRET - Cloudinary API secret
- SESSION_SECRET - secret used for session encryption
- MAP_TOKEN - (optional) Mapbox token if ever used; not required for the current Leaflet setup

> Example .env (DO NOT COMMIT this file):
>
> ATLASDB_URL="mongodb+srv://user:passwd@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority"
> CLOUD_NAME=dvyrcvdv0
> CLOUD_API_KEY=697513535683241
> CLOUD_API_SECRET=your_secret
> SESSION_SECRET=replace_with_secure_value

---

## ⛏️ Project Structure (high level)

- `app.js` — Main Express app and startup
- `controllers/` — Route handlers
- `models/` — Mongoose models (Listing, Review, User)
- `views/` — EJS templates
- `public/` — Static assets (css, js)
- `routes/` — Route definitions
- `cloudConfig.js` — Cloudinary + multer storage config
- `init/` — Sample data and seed script (init/index.js)

---

## ✅ Development Tips

- Use `nodemon app.js` (or `npm run dev` if configured) for automatic restarts.
- If using MongoDB Atlas, ensure your IP is whitelisted (Network Access) and credentials are correct.
- To avoid runtime geocoding delays, consider adding `lat` and `lng` to the `Listing` model and setting those at creation time.

---

## 📦 Deployment (recommended providers)

You can deploy to Render, Railway, Fly.io, DigitalOcean App Platform, or any host that supports Node apps.

Common steps (Render example):

1. Push repo to GitHub.
2. Create a new service on Render → connect your repo and branch.
3. Set `Start Command` to `npm start` and environment variables (ATLASDB*URL, CLOUD*\* etc.).
4. Ensure the MongoDB Atlas cluster allows connections from the host (IP whitelist or allowlist as required).

Notes:

- Ensure environment variables are set in your host’s dashboard, especially `ATLASDB_URL` and `SESSION_SECRET`.
- Use MongoDB Atlas for production DB; configure backups and a strict IP allowlist.

---

## 🧪 Common troubleshooting

- `MongooseServerSelectionError: Could not connect to any servers` → Check ATLASDB_URL, Atlas cluster status and IP access list.
- `Operation buffering timed out` → App couldn't reach DB; ensure network access or use local Mongo for testing.
- Session store warnings → Confirm `connect-mongo` version and compat with your node and package set; fallback is in-memory (not for prod).

---

## ✅ Tests & Seeding

No formal test suite included. Use `init/index.js` to seed sample listings locally:

    node init/index.js

---

## 🤝 Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo, create a branch: `feature/your-feature`
2. Make changes and add tests if applicable
3. Submit a PR describing the change

---

## 🧾 License & Contact

This repository is for learning and demo purposes. Check the LICENSE file (if added) or contact the maintainer via the GitHub repo.

If you'd like, I can add:

- A short CONTRIBUTING.md with PR checklist
- A Health endpoint that returns DB status
- A deploy-ready `Procfile` or `render.yaml`

---

Happy building! If you'd like, I can commit this README and also add a `start` and `dev` script to `package.json`. Would you like me to add those changes now?

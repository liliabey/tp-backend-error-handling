import express from "express";
import cors from "cors";

// Vos routes (vérifiez bien qu'elles sont dans ./routes/)
import tasksRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Votre nouvelle architecture centralisée (à la racine dans ./common/)
import { localeMiddleware } from "./common/middleware/localeMiddleware.js";
import { notFound } from "./common/middleware/notFound.js";
import { errorHandler } from "./common/errors/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json()); // Middleware pour parser le JSON

// Logger simple de requête
app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

// 1. Détection de la langue (i18n) en amont
app.use(localeMiddleware);

// 2. Enregistrement des routes de l'API
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);

// 3. Gestion des routes introuvables (404)
app.use(notFound);

// 4. Middleware global de gestion des erreurs (OBLIGATOIREMENT EN DERNIER)
app.use(errorHandler);

export default app;

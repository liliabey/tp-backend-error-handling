import { Router } from "express";
import Task from "../models/Task.js";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
router.use(requireAuth); // Appliquer le middleware requireAuth à toutes les routes
// GET - Récupérer toutes les tâches
router.get("/", getAllTasks);

// GET - Récupérer une tâche par ID
router.get("/:id", getTaskById);

// POST - Créer une tâche
router.post("/", createTask);

// PATCH - Mettre à jour une tâche
router.patch("/:id", updateTask);

// DELETE - Supprimer une tâche
router.delete("/:id", deleteTask);

export default router;

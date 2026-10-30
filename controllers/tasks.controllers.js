import Task from "../models/Task.js";
import { AppError } from "../common/errors/AppError.js";
import { ERROR_CODES } from "../common/errors/errorCodes.js";
import { asyncHandler } from "../common/middleware/asyncHandler.js";
// Récupérer toutes les tâches
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    data: tasks,
    message: "Operation completed successfully",
  });
});

// Récupérer une tâche par son ID
export const getTaskById = asyncHandler(async (req, res) => {
  console.log("id:", req.params.id);

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404, ERROR_CODES.RESOURCE_NOT_FOUND, {
      resource: "Task",
      id: req.params.id,
    });
  }

  res.status(200).json({
    success: true,
    data: task,
    message: "Operation completed successfully",
  });
});

// Créer une nouvelle tâche
export const createTask = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);

  const newTask = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: newTask,
    message: "Operation completed successfully",
  });
});

// Mettre à jour une tâche
export const updateTask = asyncHandler(async (req, res) => {
  console.log("id:", req.params.id);
  console.log("req.body:", req.body);

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    throw new AppError("Task not found", 404, ERROR_CODES.RESOURCE_NOT_FOUND, {
      resource: "Task",
      id: req.params.id,
    });
  }

  res.status(200).json({
    success: true,
    data: updatedTask,
    message: "Operation completed successfully",
  });
});

// Supprimer une tâche
export const deleteTask = asyncHandler(async (req, res) => {
  console.log("id:", req.params.id);

  const deletedTask = await Task.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    throw new AppError("Task not found", 404, ERROR_CODES.RESOURCE_NOT_FOUND, {
      resource: "Task",
      id: req.params.id,
    });
  }

  res.status(200).json({
    success: true,
    data: null,
    message: "Operation completed successfully",
  });
});

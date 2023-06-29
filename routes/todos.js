import express from "express";

import {
  getToDos,
  getToDo,
  createToDo,
  deleteToDo,
  updateToDo
} from "../controllers/todosController.js";

import authorize from "../middleware/authorize.js";

import {
    createToDoRules,
    updateTodoRules
} from "../middleware/validator.js";

import validationResult from "../middleware/validationResults.js";

const router = express.Router();

router.get("/:id", authorize, getToDo);
router.get("/", authorize, getToDos);
router.post("/create", authorize, createToDoRules, validationResult, createToDo);
router.put("/update/:id", authorize, updateTodoRules, validationResult, updateToDo);
router.delete("/delete/:id", authorize, deleteToDo);

export default router;

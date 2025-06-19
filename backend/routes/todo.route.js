import express from "express";

import { createTodo, deleteTodos, getTodos, updateTodos } from "../controllers/todo.controller.js";
import { authenticate } from "../middlewares/authorize.js";

const TodoRouter = express.Router();

TodoRouter.post("/create",authenticate, createTodo)
TodoRouter.get("/fetch", authenticate, getTodos);
TodoRouter.put("/update/:id", authenticate,updateTodos);
TodoRouter.delete("/delete/:id",authenticate, deleteTodos);


export default TodoRouter;
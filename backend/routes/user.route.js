import express from "express";

const router = express.Router();

import { createUser, deleteUser, updateUser, getUser } from "../controllers/users.controller.js";

router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get('/:id', getUser);

export default router;
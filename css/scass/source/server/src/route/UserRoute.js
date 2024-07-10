import express from 'express'
import { addUsers, deleteUser, getSingleUser, getUsers, loginUser, updateUser } from '../controller/UserController.js';

const route = express.Router();

route.post("/login",loginUser);
route.get("/",getUsers);
route.get("/:id",getSingleUser);
route.post("/",addUsers);
route.put("/:id",updateUser);
route.delete("/:id",deleteUser);

export {route as UserRoute}
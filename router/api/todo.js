const express = require("express");
const  { getAllTodo,
     getSingleTodo,
     postTodo,
    updateTodo,
    deleteTodo} = require("../../controller/todoController")
const verifyToken = require("../../middleware/auth/verify")

const router = express.Router();


router.get("/",verifyToken,getAllTodo);

router.get("/:_id",verifyToken,getSingleTodo);
 
router.post("/",verifyToken,postTodo);

router.patch("/:_id",verifyToken,updateTodo);

router.delete("/:_id",verifyToken,deleteTodo);

module.exports = router
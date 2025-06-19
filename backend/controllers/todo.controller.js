import todomodel from "../models/todo.model.js";

export const createTodo = async (req, res)=>{
    const todo = new todomodel({
        text:req.body.text,
        completed: req.body.completed,
        user:req.user_.id,
    })
    
    try {
        const newTodo = await todo.save()
        res.status(201).json({ message: "todomodel created successfully", newTodo });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "todomodel not created" });
    }
};


export const getTodos = async (req, res) => {
    try {
        const todos = await todomodel.find({user:req.user_.id,}); 
        res.status(200).json({ message: "Todos fetched successfully", todos });
        console.log(todos)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Todos not fetched" });
    }
};

export const updateTodos = async (req, res) => {
    try {
        const todo = await todomodel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(201).json({ message: "todomodel updated successfully", todo });
        console.log(todo)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Todos not updates" });
    }
}

export const deleteTodos = async (req, res) => {
    try {
        const todoDelete = await todomodel.findByIdAndDelete(req.params.id)
        if(!todoDelete){
            res.status(404).json({ message: "Todos not found" });
        }
        res.status(201).json({ message: "todomodel deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Todos not deleted" });
    }
}

const express = require("express");
const app = express();
app.use(express.json());

let todo = [
    {
        "id": 1,
        "title": "Offer Letter",
        "content": "You got selected in our company with 12 LPA Salary"
    }
]

app.listen(8081, () => {
    console.log('Server is running');
});

// GET Method

app.get('/todo', (req, res) => {
    res.status(200).json({
        count: todo.length,
        data: todo
    })
});

// POST Method

app.post('/todo', (req, res) => {
    const {title, content} = req.body;
    try {
        if(!title || !content) {
            return res.status(400).json({message: 'Title and content are required'});
        }
        const newTodo = {id: Date.now(), title, content}
        todo.push(newTodo);

        res.status(201).json({message: "Todo created"})
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Something Went Wrong'});
    }
});

app.put('/todo/:id', (req, res) => {
    try {
        const single_todo = todo.find(data => data.id === Number(req.params.id))
        if(!single_todo) {
            return res.status(404).json({message: 'Todo Not Found'});
        }
        const {title, content} = req.body;

        single_todo.title = title || single_todo.title;
        single_todo.content = content || single_todo.content;
        res.status(200).json({"message": "Todo Updated"});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Something Went Wrong'});
    }
});
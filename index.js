const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const data = fs.readFileSync('db.json', 'utf-8');
    res.send(data);
});

app.post('/add', (req, res) => {
    const data = req.body;
    const rawData = fs.readFileSync('db.json', 'utf-8');
    const file = JSON.parse(rawData);
    file.todos.push(data);
    fs.writeFileSync('db.json', JSON.stringify(file), 'utf-8');
    res.send('Successfully added Todos');
});

app.put('/update', (req, res) => {
    const rawData = fs.readFileSync('db.json', 'utf-8');
    const file = JSON.parse(rawData);

    file.todos.forEach(todo => {
        if (todo.id % 2 === 0) {
            todo.status = true;
        }
    });

    fs.writeFileSync('db.json', JSON.stringify(file), 'utf-8');
    res.send('Successfully updated Todos');
});

app.delete('/delete', (req, res) => {
    const rawData = fs.readFileSync('db.json', 'utf-8');
    const file = JSON.parse(rawData);

    file.todos = file.todos.filter(todo => todo.status !== true);

    fs.writeFileSync('db.json', JSON.stringify(file), 'utf-8');
    res.send('Successfully deleted Todos');
});

app.listen(PORT, () => {
    console.log('Server is running on port number 3000');
});

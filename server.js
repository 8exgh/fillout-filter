import express from 'express';
const server = express();
const PORT = 3000;
server.get('/', (req, res) => {
    res.send('Hello World from Express and TypeScript!');
});
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

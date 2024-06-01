import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import FileManager from './fileManager';

const app = express();
const fileManager = new FileManager();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send(fileManager.readFile());
});

app.post('/', (req: Request, res: Response) => {
    const data = req.body;
    console.log('Data received');
    console.log(data);
    fileManager.saveFile(data);

});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
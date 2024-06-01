import fs from 'fs';
import path from 'path';

export default class FileManager {

    private filePath: string;

    constructor(){
        this.filePath = path.join(__dirname, 'file.json');
        if(!fs.existsSync(this.filePath)){
            fs.writeFileSync(this.filePath, '[]');
        }

    }

    readFile(): string{
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileContent);
    }

    saveFile(data: string): void{
        fs.writeFileSync(this.filePath, JSON.stringify(data));
    }

}
import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose()
import path  from 'path'
import sql from './script.js'
import 'dotenv/config'


export default class CreatorBase {
    private pathDB:string
    private file:string
    protected db: any

    constructor(pathDB:string, file:string){
        this.pathDB = pathDB
        this.file = file
        this.db = new sqlite.Database(this.getPath())
        this.db.serialize(() => {
        this.db.run(sql.dropUsers)
                .run(sql.dropThemes)
                .run(sql.dropCommens)
                .run(sql.dropVoiting) 
                .run(sql.dropFavorit)                              
                .run(sql.createTableUsers)
                .run(sql.createTableThemes)
                .run(sql.createTableComments)  
                .run(sql.createTableFavorit)                   
                .run(sql.createTableVoiting)     
        })
    }

    private getPath(){
        return path.resolve(...this.pathDB.split(path.sep), this.file)
    }
}


import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose()
import path  from 'path'


class Models {
    private path:string
    private file:string
    private db: any
    constructor() {
        if (process.env.USE_DB == 'demo'){          
            this.path = process.env.DEMO_PATH || './'
            this.file = process.env.DEMO_FILE || 'db.sqlite'
        } 
        else {
            this.path = process.env.DB_PATH || './'
            this.file = process.env.DB_FILE || 'db.sqlite'
        }
        this.db = new sqlite.Database(this.getPath())
        if(!this.path){throw 'не указан путь к базе данных'}
    }

    private getPath(){
        return path.resolve(...this.path.split(path.sep), this.file)
    }
    
    public async all(sql:string, params :string[] = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err:object, rows:string) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public async get(sql:string, params :string[]= []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err:object, result:string) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
      }

    public async  run(sql:string, params :string[]= []) { 
        return new Promise((resolve, reject) => { 
            this.db.run(sql, params, (err:object, result:string) => { 
                if (err) { 
                    console.log('Error running sql ' + sql) 
                    console.log(err) 
                    reject(err) 
                } else { 
                    resolve(result) 
                } 
            }) 
        }) 
    } 

} 

const model = new Models()
export default model
import CreatorBase from './creatorBase.js'
import 'dotenv/config'


class CreatorDB extends (CreatorBase) {
    constructor() {
        let path = process.env.DB_PATH || './'
        let file = process.env.DB_FILE || 'db.sqlite'
        super(path, file)
    }
}


let db = new CreatorDB()
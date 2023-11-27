import CreatorBase from "./creatorBase.js"
import 'dotenv/config'
import GenerationDemoData from "./getDemoData.js"

class CreatorDEMO extends (CreatorBase) {
    constructor() {
        let path = process.env.DEMO_PATH || './'
        let file = process.env.DEMO_FILE || 'db.sqlite'
        super(path, file)
        new GenerationDemoData(this.db)
    }
}

let demo = new CreatorDEMO()
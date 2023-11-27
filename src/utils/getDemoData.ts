import fs from 'fs'
import path  from 'path'
import listNicks from './listNicks.js'
const COUNTER_USERS = 15;
const START_DATE = new Date().setFullYear(2020)
let COUNT_FIRST_COMMENTS = 25;
let MAX_REPLY_COMMENTS = 3;
const __dirname = path.resolve()

export default class GenerationDemoData{
    private base:any
    private text:string
    private idComment:number
    private idLike:number
    private idFavoit:number
    constructor(base:any){
        this.base = base
        this.text = fs.readFileSync(path.resolve(__dirname, 'dist','utils','text.txt'), "utf8")
        this.idComment = 0
        this.idLike = 0
        this.idFavoit = 0     
        this.generUsers()
        this.generThemes()
        this.getComments()
        this.genFavorit()
        this.genVoiting()
    }

    private generUsers(){
        let listIndex = new Set<number>();
        do{
            const index = Math.round(Math.random()*listNicks.length)    
            listIndex.add(index)
        }
        while(listIndex.size < COUNTER_USERS)
            let arrayIndex: number[] = Array.from(listIndex);
        for (let id = 0; id < COUNTER_USERS; id++){
            let file:string    
            if (id < 9){
                file = `av${id}.jpg`
            }
            else {
                file = 'avX.jpg'    
            }
            this.base.serialize(() => {
                this.base.run(`insert into Users values(${id},'${listNicks[arrayIndex[id]]}', '${path.join("img", file)}');`)
            })
        }
    }

    private generThemes(){
        this.base.serialize(() => {
            this.base.run(`insert into Themes values(0,'В лесу появились грибы');`)
        })
    }

    private randomDate(start:number = START_DATE) {
        let date = Math.round(+ start + Math.random() * (Date.now() - start));
        return date;
    }

    private lorem(maxWords:number, minWords:number){
        let words = this.text.split(' ')
        let length = words.length
        let txt :string[] = []
        let sequence = Math.round(Math.random()*(maxWords-minWords) + minWords);
        for(let i = 0; i<sequence; i++){
            let index = Math.round(Math.random()*length);
            txt.push(words[index])
        }
        return txt.join(' ')
    }

    private getComments(){
        this.idComment = 0;
        for(let i = 0; i< COUNT_FIRST_COMMENTS; i++) {
            const id_User = Math.round(Math.random()*(COUNTER_USERS-1)) 
            const date = this.randomDate()
            const comment = this.lorem(150, 25)
            const reply = null
            const theme = 0
            this.base.serialize(() => {
                this.base.run(`insert into Comments values(${this.idComment},'${id_User}', '${reply}', '${date.valueOf()}', '${theme}', '${comment}');`)
            })
            this.idComment++
            this.getReplyComment(date)
        }
    }
    
    private getReplyComment(date: number){
        const reply = this.idComment - 1
        let count = Math.round(Math.random()*MAX_REPLY_COMMENTS) 
        for(let i = 0; i< count; i++) {
            const id_User = Math.round(Math.random()*(COUNTER_USERS-1)) 
            date = this.randomDate(date)
            const comment = this.lorem(150, 25)
            const theme = 0
            this.base.serialize(() => {
            this.base.run(`INSERT INTO Comments VALUES(${this.idComment},'${id_User}', '${reply}', '${date.valueOf()}', '${theme}', '${comment}');`)
                })
            this.idComment++
        }
    }


    private genVoiting(){
        this.idLike = 0
        for (let id = 0; id<COUNTER_USERS; id++){
            for(let id_commFavorite = 0; id_commFavorite < this.idComment - 1; id_commFavorite++){     
                let ok = Math.round(Math.random()*10)
                if((ok)<3){               
                    this.base.serialize(() => {
                        this.base.run(`INSERT INTO Likes VALUES(${this.idLike}, ${id}, ${id_commFavorite}, 1);`)
                    })
                        this.idLike++                    
                }
                if((ok)>7){              
                    this.base.serialize(() => {
                        this.base.run(`INSERT INTO Likes VALUES(${this.idLike}, ${id}, ${id_commFavorite}, -1);`)
                    })
                        this.idLike++                    
                }
            }
        }
    }

    private genFavorit(){
        this.idFavoit = 0
        for (let id = 0; id<COUNTER_USERS; id++){
            for(let id_commFavorite = 0; id_commFavorite< this.idComment - 1; id_commFavorite++){
                let ok = Math.round(Math.random()*10)
                if((ok)<3){              
                    this.base.serialize(() => {
                        this.base.run(`INSERT INTO Favorit VALUES(${this.idFavoit},'${id}', '${id_commFavorite}');`)
                    })
                        this.idFavoit++                    
                }
            }
        }
    }

}


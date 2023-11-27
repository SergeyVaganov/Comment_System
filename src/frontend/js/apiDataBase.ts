import CommentsBlock, { FavoritList } from "./commentsBlock.js";
import { FirstComments } from "./commentsBlock.js";


export default class ApiDataBase{
    private storege:CommentsBlock
    
    constructor(storege:CommentsBlock){
        this.storege = storege
    }
 
    private async getData(url = "",) {
        const response = await fetch(url, {
          method: "GET", 
          mode: "cors", 
          headers: {"Content-Type": "application/json",}
        });
        if (response.ok) { 
            return await response.json();
        } else {
            console.error("Ошибка HTTP: " + response.status);
        }
    }

    private async delData(url = "",) {
        const response = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {"Content-Type": "application/json",}
        });
        if (response.ok) { 
            return await response;
        } else {
            console.error("Ошибка HTTP: " + response.status);
        }
    }

    private async postData(url = "", data:string) {
        const response = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            body: data,
            headers: {"Content-Type": "application/json",}
        });
        if (response.ok) {
            return await response;
        } else {
            console.error("Ошибка HTTP: " + response.status);
        }
    }

    public async insertFavorit(id:number){
        await this.postData(`./comments/favorit/insert`, JSON.stringify({id_user: this.storege.idSelf, id_comment:id}))
    }

    public async delFavorit(id:number){
        await this.delData(`./comments/favorit/${this.storege.idSelf}/${id}`)
    }

    public async getReplyComment(id:number){
        const res = await this.getData(`./comments/replay/${this.storege.idTheme}/${id}`)
        res.reply.forEach((el: FirstComments)=>{el['answerButton']=false
                            el['shiftToRight'] = true})
        return res.reply
    }   

    public async getProfil(){
        const profil = await this.getData(`./comments/profil/${this.storege.idSelf}`)
        this.storege.myName = profil.profil.name
        this.storege.myAvatar = profil.profil.photo
    }

    public async getCountComments(){
        this.storege.countComments = await this.getData('./comments/count')
        .then(res=>res.count.count)
    }

    public async getFirstComments(order: string){
        switch(order){
            case 'По дате': 
                this.storege.firstComments = await this.getData(`./comments/data/${this.storege.idTheme}`)
                .then(res =>res.commentFirst)
                this.storege.firstComments.forEach((el: FirstComments)=>{el['answerButton']=true;
                                                    el['shiftToRight'] = false})
            break;
            case 'По количеству ответов': 
                this.storege.firstComments = await this.getData(`./comments/replycount/${this.storege.idTheme}`)
                .then(res =>res.commentFirst)
                this.storege.firstComments.forEach((el: FirstComments)=>{el['answerButton']=true;
                                                    el['shiftToRight'] = false})           
            break;
            case 'По количеству оценок': 
                this.storege.firstComments = await this.getData(`./comments/likecount/${this.storege.idTheme}`)
                .then(res =>res.commentLikeCount)
                this.storege.firstComments.forEach((el: FirstComments)=>{el['answerButton']=false;
                                                    el['shiftToRight'] = false})  
            break;
            case 'По актуальности': 
                this.storege.firstComments = await this.getData(`./comments/likesum/${this.storege.idTheme}`)
                .then(res =>res.commentlikeSum)
                this.storege.firstComments.forEach((el: FirstComments)=>{el['answerButton']=false;   
                                                    el['shiftToRight'] = false})                     
            break;
            case 'Избранное': 
                this.storege.firstComments = await this.getData(`./comments/favorit/${this.storege.idTheme}/${this.storege.idSelf}`)
                .then(res =>res.commentFavoritList)
                this.storege.firstComments.forEach((el: FirstComments)=>{el['answerButton']=false;   
                                                    el['shiftToRight'] = false}) 
            break;
        }
    console.log(this.storege.firstComments)
    }

    public async getFavorit(){
        let list = await this.getData(`./comments/favoritlist/${this.storege.idTheme}/${this.storege.idSelf}`)
        .then(res =>res.favoritList)
        this.storege.favoritList = list.map((el: FavoritList)=>el['comment_id'])
    } 

    public async getLikeList(){
      this.storege.likeList = await this.getData(`./comments/likelist/${this.storege.idSelf}`)
      .then(res =>res.lileList)
    }  

    public async insertLike(id:number, score:number){
        await this.postData(`./comments/like/insert`, JSON.stringify({id_user: this.storege.idSelf, id_comment:id, score:score}))
    }

    public async updateLike(id:number, score:number){
        await this.postData(`./comments/like/update`, JSON.stringify({id_user: this.storege.idSelf, id_comment:id, score:score}))
    }

    public async insertComment(reply_to:number | string, theme_id:number, content:string, date:number){
        await this.postData(`./comments/comment`, JSON.stringify({id_user: this.storege.idSelf, reply_to_id:reply_to, theme_id:theme_id, content:content, date:date}))
    }

}
import Comment from './comment.js'
import CommentsBlock, { FirstComments } from './commentsBlock.js'


export default class Comments{
    private storege:CommentsBlock
    private commentsList:HTMLElement
        
    constructor(storege:CommentsBlock){
        this.storege = storege
        this.commentsList=document.createElement('div')
    }

    public async render(order:string){
        await Promise.all([this.storege.apiDB.getFirstComments(order), this.storege.apiDB.getFavorit(), this.storege.apiDB.getLikeList()])
        this.commentsList.innerHTML = ''   
        this.commentsList.classList.add(`${this.storege.classContener}__commentsList`)        
        this.renderComments(this.storege.firstComments)
        return this.commentsList
    }

    private renderComments(arr: FirstComments[]){
        arr.forEach(obj=>{
            let comment = new Comment(this.storege, obj)
            this.commentsList.append(comment.createSinglComment())})    
    }
}
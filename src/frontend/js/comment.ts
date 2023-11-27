import CommentsBlock, { FirstComments, FavoritList, LikeList } from './commentsBlock.js'
import TopInput from './topInput.js'


export default class Comment{
    private storege:CommentsBlock
    private singlComment:FirstComments
    private comment:HTMLElement
    private avatar:HTMLElement
    private img:HTMLImageElement
    private commentName:HTMLElement
    private commentDate:HTMLElement
    private answerTo: HTMLElement
    private commentText:HTMLElement
    private buttonReplay:HTMLButtonElement
    private input:HTMLElement
    private buttonFavorite:HTMLButtonElement
    private likeButtonPlus:HTMLButtonElement
    private likeSumma:HTMLElement
    private likeButtonMinus:HTMLButtonElement
    private buttonReplyList:HTMLElement
    private replyComments:HTMLElement
    private checkReplyTo : boolean
    private checkFavorit: boolean
    private checkReplyList: boolean
    private likeScore:number | null
    private sum:number
    private alias:string

    constructor(storege:CommentsBlock, obj:FirstComments){
        this.singlComment = obj
        this.storege = storege
        if (this.singlComment.idLink==null){
            this.alias = '__SC'
        } else {
            this.alias = '__SR'
        }
//create article       
        this.comment = document.createElement('article')
        this.comment.classList.add(`${this.storege.classContener + this.alias}-comment`)
        this.comment.setAttribute('id_comment-data', String(this.singlComment.idComment))
        if (this.singlComment.shiftToRight==true){
            this.comment.id = `${this.storege.classContener}__shift` 
        }
//create avatar
        this.avatar = document.createElement('div')
        this.img = document.createElement('img')
        this.img.alt = 'аватарка'
        this.img.src = String(this.singlComment.authorPhoto)        
        this.avatar.classList.add(`${this.storege.classContener + this.alias}-avatar`)
        this.avatar.append(this.img)
// create name
        this.commentName= document.createElement('div')
        this.commentName.classList.add(`${this.storege.classContener + this.alias}-Name`)
        this.commentName.textContent = `${this.singlComment.authorName}`  
// create дата
        this.commentDate= document.createElement('div')
        const options:Intl.DateTimeFormatOptions = {year: "numeric", month: "numeric", day: "numeric"};  
        this.commentDate.classList.add(`${this.storege.classContener + this.alias}-data`)
        this.commentDate.textContent = `${new Date(this.singlComment.dataComment).toLocaleString("ru-RU", options)}`
 //create text
        this.commentText=  document.createElement('div')
        this.commentText.classList.add(`${this.storege.classContener + this.alias}-text`)
        this.commentText.textContent = `${this.singlComment.textComment}`  
//create reply_to
        this.buttonReplay = document.createElement('button')
        this.buttonReplay.classList.add(`${this.storege.classContener + this.alias}-replyTo`)
        this.buttonReplay.textContent = "Ответить"
        this.buttonReplay.addEventListener('click', this.getInput.bind(this))
        this.checkReplyTo = false
//create favorit
        this.buttonFavorite= document.createElement('button')
        this.buttonFavorite.classList.add(`${this.storege.classContener + this.alias}-favorit`)
        //this.buttonFavorite.textContent = "В избранном"
        this.buttonFavorite.addEventListener('click', this.clickFavorit.bind(this))
        this.checkFavorit = false
//create like
        this.likeScore = null
        this.likeButtonPlus = document.createElement('button')
        this.likeButtonPlus.classList.add(`${this.storege.classContener + this.alias}-likePlus`)
        this.likeButtonPlus.textContent = '+'
        this.likeButtonPlus.addEventListener('click', this.eventLikePlus.bind(this))
        this.likeSumma =  document.createElement('div')
        this.likeSumma.classList.add(`${this.storege.classContener + this.alias}-likeSum`)
        this.sum = this.singlComment.likeSumma || 0 
        this.likeSumma.textContent = `${this.sum}`
        this.likeButtonMinus = document.createElement('button')
        this.likeButtonMinus.classList.add(`${this.storege.classContener + this.alias}-likeMinus`)
        this.likeButtonMinus.textContent = '-'
        this.likeButtonMinus.addEventListener('click', this.eventLikeMinus.bind(this))
//create reply_list
        this.checkReplyList = false
        this.buttonReplyList = document.createElement('button')
        this.buttonReplyList.classList.add(`${this.storege.classContener + this.alias}-replyCount`)
        if (this.singlComment.countReply == null){
            this.buttonReplyList.classList.add(`${this.storege.classContener}__visibility_hidden`)
        }
        this.buttonReplyList.textContent = `Ответов ${this.singlComment.countReply}`
        this.buttonReplyList.addEventListener('click', this.clickReplyButton.bind(this))
//create input
        this.input = document.createElement('div')
        this.input.classList.add(`${this.storege.classContener + this.alias}-input`)
        this.replyComments = document.createElement('div')
        this.replyComments.classList.add(`${this.storege.classContener + this.alias}-replyList`)
//create answerTo
        this.answerTo = document.createElement('div')
        this.answerTo.classList.add(`${this.storege.classContener + this.alias}-answerTo`)
        this.answerTo.textContent = `ответ на ${this.singlComment.linkAuthor}`
    }


    public createSinglComment(){
        this.comment.innerHTML = ''   
        this.comment.append(this.avatar)  
        this.comment.append(this.commentName)
        this.comment.append(this.commentDate)
        this.comment.append(this.answerTo)       
        this.comment.append(this.commentText)
        this.comment.append(this.buttonReplay)            
        this.comment.append(this.buttonFavorite)
        this.comment.append(this.likeButtonPlus)            
        this.comment.append(this.likeSumma)   
        this.comment.append(this.likeButtonMinus)          
        this.comment.append(this.buttonReplyList)            
        this.comment.append(this.input)   
        this.comment.append(this.replyComments)   
        this.updateFavorite()
        this.updeteLikeSCore()
        return this.comment
    }

    private getInput(){
        if (!this.checkReplyTo){
            let topInput = new TopInput(this.storege, this.singlComment.idComment).createTopInput()
            this.input.append(topInput)
            this.checkReplyTo = true
        } else {
        this.input.innerHTML = ''
        this.checkReplyTo = false
        }
    }

    private updateFavorite(){
        if (this.contains(this.storege.favoritList, this.singlComment.idComment) )
        {
            this.buttonFavorite.textContent = `В избранном`     
            this.buttonFavorite.id = `${this.storege.classContener}__SC-favorit_in` 
            this.checkFavorit = true
        } else {
            this.buttonFavorite.textContent = `В избранноe`     
            this.buttonFavorite.id = ``
            this.checkFavorit = false
        }
    }
    
    private clickFavorit(){
        if (this.checkFavorit == true){
            this.storege.apiDB.delFavorit(this.singlComment.idComment)
            .then(()=>this.storege.apiDB.getFavorit())
            .then(()=>{
                this.updateFavorite()
            })
        } else {
            this.storege.apiDB.insertFavorit(this.singlComment.idComment)
            .then(()=>this.storege.apiDB.getFavorit())
            .then(()=>{
                this.updateFavorite()
            })
        }
    }
    

    private updeteLikeSCore(){
        let likeListComments = this.storege.likeList.map((el:LikeList)=>el['comment_id'] )
        if (this.contains(likeListComments, this.singlComment.idComment) !==undefined){
            this.likeScore = this.storege.likeList.filter(el => el['comment_id']==this.singlComment.idComment)[0]['score']
        } else {
            this.likeScore = null
        }

        if ((this.likeScore == null) || (this.likeScore <= 0 )){
            this.likeButtonPlus.disabled=false
        } else {
            this.likeButtonPlus.disabled=true
        }
        if ((this.likeScore == null) || (this.likeScore >= 0 )){
            this.likeButtonMinus.disabled=false
        } else {
            this.likeButtonMinus.disabled=true
        }
        this.likeSumma.textContent = `${this.sum}`
    }


    private eventLikePlus(){
        if (this.likeScore == null){
            this.storege.apiDB.insertLike(this.singlComment.idComment, 1)
            this.likeScore = 1
        }
        if (this.likeScore == 0){
            this.storege.apiDB.updateLike(this.singlComment.idComment, 1)
            this.likeScore = 1
        }
        if (this.likeScore == -1){
            this.storege.apiDB.updateLike(this.singlComment.idComment, 0)
            this.likeScore = 0
        }
        this.sum++
        this.storege.apiDB.getLikeList().then(()=>this.updeteLikeSCore())
    }


    private eventLikeMinus(){
        if (this.likeScore == null){
            this.storege.apiDB.insertLike(this.singlComment.idComment, -1)
            this.likeScore = -1
        }
        if (this.likeScore == 0){
            this.storege.apiDB.updateLike(this.singlComment.idComment, -1)
            this.likeScore = -1
        }
        if (this.likeScore == 1){
            this.storege.apiDB.updateLike(this.singlComment.idComment, 0)
            this.likeScore = 0
        }
        this.sum--
        this.storege.apiDB.getLikeList().then(()=>this.updeteLikeSCore())
    }


    private clickReplyButton(){
        if (!this.checkReplyList){
            this.storege.apiDB.getReplyComment(this.singlComment.idComment).
            then((arr)=>{ arr.forEach((obj:FirstComments)=>{
                let comment = new Comment(this.storege, obj)
                this.replyComments.append(comment.createSinglComment())})   
                this.checkReplyList = true
                this.buttonReplyList.id = `${this.storege.classContener + this.alias}-replyCount`
            })
        } else {
            this.replyComments.innerHTML = ''
            this.checkReplyList = false
            this.buttonReplyList.id = ''
        }
    }
    

    private contains(arr:number[], elem:number) {
        return arr.find((i) => i === elem)
    }

}
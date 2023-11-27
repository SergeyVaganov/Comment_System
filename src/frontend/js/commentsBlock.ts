
import TopBar from "./topBar.js";
import TopInput from "./topInput.js";
import Comments from "./comments.js";
import ApiDataBase from "./apiDataBase.js";


interface FirstComments{
    idComment:number, 
    authorName:string, 
    authorPhoto:string,
    dataComment:number, 
    textComment:string, 
    countReply:number, 
    likeSumma:number, 
    likeCount:number,
    answerButton:boolean,
    shiftToRight:boolean,
    linkAuthor:string
    idLink:number | string
}

interface FavoritList{
    id:number,
    user_id:number,
    comment_id:number
}

interface LikeList{
    id:number,
    user_id:number,
    comment_id:number
    score:number
}

export default class CommentsBlock{
    public classContener:string
    public idSelf: number
    public idTheme:number
    public contener:Element|null
    public topBar: TopBar
    public topInput:TopInput
    public comments: Comments
    public apiDB: ApiDataBase
    public countComments:number
    public myName:string
    public myAvatar:string
    public firstComments:FirstComments[]
    public favoritList:number[]
    public likeList:LikeList[]

    constructor(classeName:string, idSelf:number, idTheme:number) {
        this.classContener = classeName
        this.idSelf = idSelf
        this.idTheme = idTheme
        this.myName = ''
        this.myAvatar = ''
        this.firstComments = [{
            idComment: 0, 
            authorName:'', 
            authorPhoto:'',
            dataComment:0, 
            textComment:'', 
            countReply:0, 
            likeSumma:0, 
            likeCount:0,
            answerButton:false,
            shiftToRight:false,
            linkAuthor:'',
            idLink:'null'
        }]
        this.favoritList = [0]
        this.likeList = [{
            id:0,
            user_id:0,
            comment_id:0,
            score:0
        }]
        this.countComments = 0
        this.contener = document.querySelector(`.${this.classContener}`)
        this.topBar = new TopBar(this)
        this.topInput = new TopInput(this)
        this.comments = new Comments(this)
        this.apiDB = new ApiDataBase(this)
        this.createComments()
    }

    public async createComments(){
        if (!this.contener){throw('Не найден селектор контейнера комментариев')}
        this.contener.append( await this.topBar.render()) 
        this.contener.append( await this.topInput.render()) 
        this.contener.append( await this.comments.render('По дате')) 
    }
}

export {FirstComments, FavoritList, LikeList}

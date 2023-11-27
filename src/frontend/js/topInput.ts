import CommentsBlock from "./commentsBlock.js"

export default class TopInput {
    private storege:CommentsBlock
    private topInput:HTMLElement
    private myAvatar:HTMLElement 
    private img:HTMLImageElement
    private myName:HTMLElement
    private maxWord:HTMLElement
    private textarea:HTMLTextAreaElement
    private button:HTMLButtonElement
    private idCommentReply:number|string
    private warningMassage:HTMLElement

    constructor(storege:CommentsBlock, idCommentReply?:number){
        this.storege = storege
        this.idCommentReply = idCommentReply || 'null'
//create section
        this.topInput = document.createElement('section')
        this.topInput.classList.add(`${this.storege.classContener}__topInput`)
//create myAvatar
        this.myAvatar = document.createElement('div')
        this.img = document.createElement('img')
        this.img.alt = 'аватарка'
        this.myAvatar.classList.add(`${this.storege.classContener}__myAvatar`)
        this.myAvatar.append(this.img)
//create myName
        this.myName = document.createElement('div')
        this.myName.classList.add(`${this.storege.classContener}__myName`)
//create maxWord
        this.maxWord = document.createElement('div')
        this.maxWord.classList.add(`${this.storege.classContener}__maxWord`)   
//create textarea
        this.textarea = document.createElement('textarea')
        this.textarea.value = ''
        this.textarea.classList.add(`${this.storege.classContener}__textarea`)
        this.textarea.placeholder = `Введите текст сообщения ...`
        this.textarea.addEventListener('keyup', this.autoGrow.bind(this))
//create buttonSubmit
        this.button = document.createElement('button')
        this.button.classList.add(`${this.storege.classContener}__buttonSubmit`)
        this.button.textContent = 'Отправить'
        this.button.disabled = true
        this.button.addEventListener('click', ()=>{
            this.storege.apiDB.insertComment(this.idCommentReply,this.storege.idTheme,this.textarea.value, Date.now()).then(()=>this.storege.createComments())
        })
//create warning message
        this.warningMassage = document.createElement('div')
        this.warningMassage.textContent = 'Слишком длинное сообщение'
        this.warningMassage.classList.add(`${this.storege.classContener}__warning`)
    }

    
    public render(){
        return this.createTopInput()
    }

    public createTopInput(){  
        this.init()
        this.topInput.innerHTML = ''   
        this.topInput.append(this.myAvatar)
        this.topInput.append(this.myName)
        this.topInput.append(this.maxWord)
        this.topInput.append(this.textarea)
        this.topInput.append(this.button)
        this.topInput.append(this.warningMassage)
        return this.topInput
    }

    private init(){
        this.myName.textContent = `${this.storege.myName}`  
        this.img.src = String(this.storege.myAvatar)
        this.createMaxWords()
    }

    private createMaxWords(){
        let length = this.textarea.value.length || 0 
        if (length == 0){
            this.maxWord.textContent = `Макс. 1000 символов`
            this.maxWord.id = `${this.storege.classContener}__maxWord_pass`  
            this.warningMassage.classList.add(`${this.storege.classContener}__visibility_hidden`)
            this.button.disabled = true    
        }
        if (length<= 1000 && length > 0){
            this.maxWord.textContent = `${length} / 1000`   
            this.maxWord.id = `${this.storege.classContener}__maxWord_pass`  
            this.warningMassage.classList.add(`${this.storege.classContener}__visibility_hidden`  )  
            this.button.disabled = false    
        }
        if (length > 1000){
            this.maxWord.textContent = `${length} / 1000`
            this.maxWord.id = `${this.storege.classContener}__maxWord_stop`  
            this.warningMassage.classList.remove(`${this.storege.classContener}__visibility_hidden`  )  
            this.button.disabled = true   
        }
    }

    private autoGrow() {
        if (this.textarea.scrollHeight > this.textarea.clientHeight) {
            this.textarea.style.height = `${this.textarea.scrollHeight}px`;
        }
        this.createMaxWords()

    }
}


// xzxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzsxssxasxsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
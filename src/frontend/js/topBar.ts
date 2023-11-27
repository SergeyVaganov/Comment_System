import CommentsBlock from "./commentsBlock.js"


export default class TopBar{
    private storege:CommentsBlock
    private nav:HTMLElement
    private commentsCount:HTMLElement
    private buttonOrderBy:HTMLButtonElement
    private buttonFavorit:HTMLButtonElement
    private orderByMenu:HTMLElement
    private orderList:HTMLUListElement
    private checkButtonOrderBy:boolean
    private checkButtonOrderBySelected: boolean
    private checkButtonFavorite:boolean


    constructor(storege:CommentsBlock){
        this.storege = storege
//create Nav        
        this.nav = document.createElement('nav')
        this.nav.classList.add(`${this.storege.classContener}__nav`)

//create Count        
        this.commentsCount = document.createElement('div')    
        this.commentsCount.classList.add(`${this.storege.classContener}__count`)
        
        
        //create orderByMenu
        this.orderByMenu = document.createElement('div')
        this.orderByMenu.classList.add(`${this.storege.classContener}__orderByMenu`)  
        

//create buttonOrderBy
        this.buttonOrderBy = document.createElement('button')
        this.buttonOrderBy.classList.add(`${this.storege.classContener}__orderBy`)
        this.buttonOrderBy.classList.add(`${this.storege.classContener}__orderBy_selected`)       
        this.buttonOrderBy.textContent = 'По дате'
        this.checkButtonOrderBy = false
        this.buttonOrderBy.addEventListener('click', this.toggleButtonOrderBy.bind(this))
        this.orderByMenu.append(this.buttonOrderBy)
        this.checkButtonOrderBySelected = true

//create buttonFavorit
        this.buttonFavorit = document.createElement('button')
        this.buttonFavorit.classList.add(`${this.storege.classContener}__favorit`)
        this.buttonFavorit.textContent = 'Избранное'      
        this.buttonFavorit.addEventListener('click', this.renderFavorit.bind(this))
        this.checkButtonFavorite = false
// create orderList

this.orderList = document.createElement('ul')
this.orderList.classList.add(`${this.storege.classContener}__hidden`)
this.orderList.classList.add(`${this.storege.classContener}__orderList`)
        this.orderByMenu.append(this.orderList)            
        const menu = ['По дате', 'По количеству оценок', 'По актуальности', 'По количеству ответов']
        menu.forEach((item)=>{
            const element = document.createElement('li')
            element.textContent = item
            this.orderList.append(element)
            element.addEventListener('click', this.choiceOrderBy(item))
        })
    this.orderByMenu.append(this.orderList)



        


        // this.commentFiler = document.createElement('div')
        // this.commentsOrder = document.createElement('div')
        // this.order = document.createElement('div')
        // this.orderMenu = document.createElement('div')
        // this.orderList = document.createElement('ul')
        // this.commentsFavorit = document.createElement('div')

    }
    

    public async render(){
        await Promise.all([this.storege.apiDB.getProfil(), this.storege.apiDB.getCountComments()])
        return this.createTopBar()
    }


    
    private createTopBar(){
        this.nav.innerHTML = ''   
        this.nav.append(this.commentsCount)  
        this.nav.append(this.orderByMenu)

        this.nav.append(this.buttonFavorit)
        this.updateButtons()
        this.updateCountComments()
        return this.nav
    }
    


    private updateCountComments(){
        this.commentsCount.innerHTML = `Комментарии: <span style="opacity: 0.4">(${this.storege.countComments})</span>`
    }


private updateButtons(){
    if (this.checkButtonFavorite){
        console.log('updateFavorit id ')
        this.buttonFavorit.id = `${this.storege.classContener}__favorit`
    } else {
        this.buttonFavorit.id = ''
    }

    if (this.checkButtonOrderBySelected){
        this.buttonOrderBy.classList.remove(`${this.storege.classContener}__orderBy_noselected`) 
        this.buttonOrderBy.classList.add(`${this.storege.classContener}__orderBy_selected`)   
    } else {
        this.buttonOrderBy.classList.remove(`${this.storege.classContener}__orderBy_selected`)
        this.buttonOrderBy.classList.add(`${this.storege.classContener}__orderBy_noselected`)    
    }



}


    private toggleButtonOrderBy(){
        if (!this.checkButtonOrderBy){
                this.orderList.classList.remove(`${this.storege.classContener}__hidden`)  
                this.buttonOrderBy.id = `${this.storege.classContener}__orderBy` 
                this.checkButtonOrderBy = true
            } else {
                this.orderList.classList.add(`${this.storege.classContener}__hidden`) 
                this.buttonOrderBy.id = `` 
                this.checkButtonOrderBy = false
            }
        }
    
    
    private choiceOrderBy(item: string){
        const _self = this
        const _item = item
        return function(){
            _self.orderList.classList.add(`${_self.storege.classContener}__hidden`) 
            _self.buttonOrderBy.id = `` 
            _self.checkButtonOrderBy = false
            _self.buttonOrderBy.textContent = _item
            _self.checkButtonOrderBySelected = true
            _self.checkButtonFavorite = false
            _self.updateButtons()
            _self.storege.comments.render(_item)
        }
    }
    
    







    // private createOrderMenu(){
    //     this.orderMenu.innerHTML = ''   
    //     this.orderMenu.classList.add(`${this.storege.classContener}__orderMenu`)
    //     this.orderList.innerHTML = ''   
    //     this.orderList.classList.add(`${this.storege.classContener}__hidden`)
    //     this.orderMenu.append(this.orderList)            
    //     const menu = ['По дате', 'По количеству оценок', 'По актуальности', 'По количеству ответов']
    //     menu.forEach((item)=>{
    //         const element = document.createElement('li')
    //         element.textContent = item
    //         this.orderList.append(element)
    //         element.addEventListener('click', this.toggleButtonOrderUp(item))
    //     })
    //     return this.orderMenu 
    // }


    // private createFavoritChoice(){
    //     this.commentsFavorit.innerHTML = ''   
    //     this.commentsFavorit.classList.add(`${this.storege.classContener}__favorit`)
    //     this.commentsFavorit.textContent = 'Избранное'  
    //     this.commentsFavorit.addEventListener('click', this.renderFavorit.bind(this))    
    //     return this.commentsFavorit
    // }

    private renderFavorit(){
        this.checkButtonFavorite = true
        this.checkButtonOrderBySelected = false
        this.updateButtons()
        this.storege.comments.render('Избранное')
    }


}
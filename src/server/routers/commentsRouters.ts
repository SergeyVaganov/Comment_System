import express from 'express';
const router = express.Router()
import ApiConrtroller from '../controllers/apiControllers.js';


//получение данных профиля пользователя
router.get("/profil/:id_user", ApiConrtroller.profil);

//количество комментариев
router.get("/count", ApiConrtroller.commentsCount);        

//получить первичные комментарии упорядоченные по дате
router.get("/data/:id_theme", ApiConrtroller.commentsByData);   

//получить первичные комментарии упорядоченные количеству ответов
router.get("/replycount/:id_theme", ApiConrtroller.commentsByCount);

//получить комментарии упорядоченные по сумме лайков
router.get("/likesum/:id_theme", ApiConrtroller.commentsByLikeSum);

//получить комментарии упорядоченные по количеству лайков
router.get("/likecount/:id_theme", ApiConrtroller.commentsByLikeCount);

//получить комментарии избранные упорядоченные по дате
router.get("/favorit/:id_theme/:id_user", ApiConrtroller.commentsByFavorit);

//получить комментарии ответы на первичный комментарий
router.get("/replay/:id_theme/:id_link", ApiConrtroller.commentsReplayToLink);

//добавление комментария
router.post("/comment", ApiConrtroller.commentInsert);

//список id_комментариев пользователя в избранном
router.get("/favoritlist/:id_theme/:id_user", ApiConrtroller.favoritList);

//удаление комментария из избаранных
router.delete("/favorit/:id_user/:id_com", ApiConrtroller.favoritDelete);

//добавлеине комментрия в список избранных
router.post("/favorit/insert", ApiConrtroller.favoritInsert);

//список like-ов пользователя
router.get("/likelist/:id_user", ApiConrtroller.likeList);

//добавление like комментарию
router.post("/like/insert", ApiConrtroller.insertLike);

//изменение like в комментарии
router.post("/like/update", ApiConrtroller.updateLike);

export {router}






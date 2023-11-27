import express from 'express';
import  model  from '../model/litesqlConnector.js';


export default class ApiConrtroller { 
    constructor(){}

    static profil = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_user]
        let sql = "SELECT * FROM Users WHERE id_user = ?"
        model.get(sql, data).then((profil:unknown) => res.json({profil})) 
    }
    
    
    static commentsCount = function (req:express.Request, res:express.Response) {
        let data: Array<string> = []
        let sql = "SELECT COUNT(*) as count FROM Comments"
        model.get(sql, data).then((count:unknown) => res.json({count})) 
    }    
    

    static commentsByData = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme]
        let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
                    u.name AS authorName, u.photo AS authorPhoto, 
                    grComments.count AS countReply, 
                    grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
                    null AS linkAuthor, null AS idLink
                    FROM Comments AS c 
                    JOIN Users AS u ON c.user_id =u.id_user 
                    LEFT JOIN (SELECT COUNT(c2.reply_to_id) AS count, c2.reply_to_id 
                                FROM Comments c2 
                                GROUP BY c2.reply_to_id 
                                HAVING  c2.reply_to_id <> 'null') 
                                AS grComments ON c.id = grComments.reply_to_id 
                    LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
                                FROM Likes 
                                GROUP BY comment_id ) 
                                AS grLikes ON c.id = grLikes.comment_id 
                    WHERE c.reply_to_id = 'null' AND c.theme_id = ? 
                    ORDER BY c.date DESC`
        model.all(sql, data).then((commentFirst:unknown) => {
        return res.json({commentFirst})}) 
    };

    static commentsByCount = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme]
        let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
                    u.name AS authorName, u.photo AS authorPhoto, 
                    grComments.count AS countReply, 
                    grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
                    null AS linkAuthor, null AS idLink
                    FROM Comments AS c 
                    JOIN Users AS u ON c.user_id =u.id_user 
                    LEFT JOIN (SELECT COUNT(c2.reply_to_id) AS count, c2.reply_to_id 
                                FROM Comments c2 
                                GROUP BY c2.reply_to_id 
                                HAVING  c2.reply_to_id <> 'null') 
                                AS grComments ON c.id = grComments.reply_to_id 
                    LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
                                FROM Likes 
                                GROUP BY comment_id ) 
                                AS grLikes ON c.id = grLikes.comment_id 
                    WHERE c.reply_to_id = 'null' AND c.theme_id = ? 
                    ORDER BY grComments.count DESC`
        model.all(sql, data).then((commentFirst:unknown) => res.json({commentFirst})) 
    };



    static commentsByLikeSum = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme]
        // let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
        //             u.name AS authorName, u.photo AS authorPhoto, 
        //             'null' AS countReply,
        //             grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
        //             c2.name AS linkAuthor, c2.id AS idLink
        //             FROM Comments AS c 
        //             JOIN Users AS u ON c.user_id =u.id_user 
        //             LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
        //                         FROM Comments c3 
        //                         JOIN Users as u1 ON c3.user_id =u1.id_user) 
        //                         AS c2 ON c.reply_to_id = c2.id 		
        //             LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
        //                         FROM Likes 
        //                         GROUP BY comment_id ) 
        //                         AS grLikes ON c.id = grLikes.comment_id 
        //             WHERE c.theme_id = ?		
        //             ORDER BY grLikes.summa DESC`
        let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
                    u.name AS authorName, u.photo AS authorPhoto, 
                    grComments.count AS countReply, 
                    grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
                    c2.name AS linkAuthor, c2.id AS idLink
                    FROM Comments AS c 
                    JOIN Users AS u ON c.user_id =u.id_user 
                    LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
                                FROM Comments c3 
                                JOIN Users as u1 ON c3.user_id =u1.id_user) 
                                AS c2 ON c.reply_to_id = c2.id 		
                    LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
                                FROM Likes 
                                GROUP BY comment_id ) 
                                AS grLikes ON c.id = grLikes.comment_id 
                    LEFT JOIN (SELECT COUNT(c2.reply_to_id) AS count, c2.reply_to_id 
                                FROM Comments c2 
                                GROUP BY c2.reply_to_id 
                                HAVING  c2.reply_to_id <> 'null') 
                                AS grComments ON c.id = grComments.reply_to_id 
                    WHERE c.theme_id = ?		
                    ORDER BY grLikes.summa DESC`
        model.all(sql, data).then((commentlikeSum:unknown) => res.json({commentlikeSum})) 
    };


    static commentsByLikeCount = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme]
        let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
                    u.name AS authorName, u.photo AS authorPhoto, 
                    grComments.count AS countReply, 
                    grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
                    c2.name AS linkAuthor, c2.id AS idLink
                    FROM Comments AS c 
                    JOIN Users AS u ON c.user_id =u.id_user 
                    LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
                                FROM Comments c3 
                                JOIN Users as u1 ON c3.user_id =u1.id_user) 
                                AS c2 ON c.reply_to_id = c2.id 		
                    LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
                                FROM Likes 
                                GROUP BY comment_id ) 
                                AS grLikes ON c.id = grLikes.comment_id 
                    LEFT JOIN (SELECT COUNT(c2.reply_to_id) AS count, c2.reply_to_id 
                                FROM Comments c2 
                                GROUP BY c2.reply_to_id 
                                HAVING  c2.reply_to_id <> 'null') 
                                AS grComments ON c.id = grComments.reply_to_id 
                    WHERE c.theme_id = ?			
                    ORDER BY grLikes.count DESC`
        // let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
        //             u.name AS authorName, u.photo AS authorPhoto, 
        //             'null' AS countReply,
        //             grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
        //             c2.name AS linkAuthor, c2.id AS idLink
        //             FROM Comments AS c 
        //             JOIN Users AS u ON c.user_id =u.id_user 
        //             LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
        //                         FROM Comments c3 
        //                         JOIN Users as u1 ON c3.user_id =u1.id_user) 
        //                         AS c2 ON c.reply_to_id = c2.id 		
        //             LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
        //                         FROM Likes 
        //                         GROUP BY comment_id ) 
        //                         AS grLikes ON c.id = grLikes.comment_id 
        //             WHERE c.theme_id = ?			
        //             ORDER BY grLikes.count DESC`
        model.all(sql, data).then((commentLikeCount:unknown) => res.json({commentLikeCount})) 
    };


    static commentsByFavorit = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme, req.params.id_user]
        let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
                    u.name AS authorName, u.photo AS authorPhoto, 
                    grComments.count AS countReply, 
                    grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
                    c2.name AS linkAuthor, c2.id AS idLink
                    FROM Comments AS c 
                    JOIN Users AS u ON c.user_id =u.id_user 
                    LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
                                FROM Comments c3 
                                JOIN Users as u1 ON c3.user_id =u1.id_user) 
                                AS c2 ON c.reply_to_id = c2.id 		
                    LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
                                FROM Likes 
                                GROUP BY comment_id ) 
                                AS grLikes ON c.id = grLikes.comment_id 
                    LEFT JOIN (SELECT COUNT(c2.reply_to_id) AS count, c2.reply_to_id 
                                FROM Comments c2 
                                GROUP BY c2.reply_to_id 
                                HAVING  c2.reply_to_id <> 'null') 
                                AS grComments ON c.id = grComments.reply_to_id 
                    JOIN Favorit AS f ON c.id = f.comment_id 
                    WHERE c.theme_id = ? AND f.user_id = ?
                    ORDER BY c.date DESC`
        
        // let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
        //             u.name AS authorName, u.photo AS authorPhoto, 
        //             'null' AS countReply,
        //             grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
        //             c2.name AS linkAuthor, c2.id AS idLink
        //             FROM Comments AS c 
        //             JOIN Users AS u ON c.user_id =u.id_user 
        //             LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
        //                         FROM Comments c3 
        //                         JOIN Users as u1 ON c3.user_id =u1.id_user) 
        //                         AS c2 ON c.reply_to_id = c2.id 		
        //             LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
        //                         FROM Likes 
        //                         GROUP BY comment_id ) 
        //                         AS grLikes ON c.id = grLikes.comment_id 
        //             JOIN Favorit AS f ON c.id = f.comment_id 
        //             WHERE c.theme_id = ? AND f.user_id = ?
        //             ORDER BY c.date DESC`            
        model.all(sql, data).then((commentFavoritList:unknown) => res.json({commentFavoritList})) 
    };


    static commentsReplayToLink = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme, req.params.id_link]
        let sql = `SELECT c.id AS idComment, c.date AS dataComment, c.content AS textComment, 
                    u.name AS authorName, u.photo AS authorPhoto, 
                    null AS countReply,
                    grLikes.summa AS likeSumma, grLikes.count AS likeCount, 
                    c2.name AS linkAuthor, c2.id AS idLink
                    FROM Comments AS c 
                    JOIN Users AS u ON c.user_id =u.id_user 
                    LEFT JOIN (SELECT u1.name AS name, c3.id AS id  
                                FROM Comments c3 
                                JOIN Users as u1 ON c3.user_id =u1.id_user) 
                                AS c2 ON c.reply_to_id = c2.id 		
                    LEFT JOIN (SELECT comment_id, sum(score) AS summa, COUNT(score) AS count 
                                FROM Likes 
                                GROUP BY comment_id ) 
                                AS grLikes ON c.id = grLikes.comment_id 
                    WHERE c.theme_id = ? and c2.id = ?			
                    ORDER BY c.date DESC`
        model.all(sql, data).then((reply:unknown) => res.json({reply})) 
    }  


    static commentInsert = function (req:express.Request, res:express.Response) {
        let body = req.body
        let data = [body.id_user, body.reply_to_id, body.date, body.theme_id, body.content]
        let sql = `INSERT INTO Comments (user_id, reply_to_id , date, theme_id , content) 
                    VALUES(?, ?, ?, ?, ?)`
        model.run(sql, data).then((reply:unknown) => res.send(reply))
    }


    static favoritList = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_theme, req.params.id_user]
        let sql = `SELECT * FROM Favorit AS f
                    JOIN Comments AS c ON c.id == f.comment_id 
                    WHERE c.theme_id = ? AND f.user_id = ?`
        model.all(sql, data).then((favoritList:unknown) => res.json({favoritList})) 
    };    



    static favoritDelete = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_user, req.params.id_com]
        let sql = "DELETE FROM Favorit WHERE user_id = ? and comment_id = ?" 
        model.run(sql, data).then((reply:unknown) => res.send(reply))
    }  


    static favoritInsert = function (req:express.Request, res:express.Response) {
        let body = req.body
        let data = [body.id_user, body.id_comment]
        let sql = "INSERT INTO Favorit (user_id, comment_id) VALUES(?, ?)"
        model.run(sql, data).then((reply:unknown) => res.send(reply))
    }  


    static likeList = function (req:express.Request, res:express.Response) {
        let data = [req.params.id_user]
        let sql = "SELECT * FROM Likes WHERE user_id = ?"
        model.all(sql, data).then((lileList:unknown) => res.json({lileList})) 
    };


    static insertLike= function (req:express.Request, res:express.Response) {
        let body = req.body
        let data = [body.id_user, body.id_comment, body.score]
        let sql = "INSERT INTO Likes (user_id, comment_id, score) VALUES(?, ?, ?)"
        model.run(sql, data).then((reply:unknown) => res.send(reply))
    }


    static updateLike= function (req:express.Request, res:express.Response) {
        let body = req.body
        let data = [body.score, body.id_user, body.id_comment]
        let sql = "UPDATE Likes SET score = ? WHERE user_id = ? and comment_id = ?;"
        model.run(sql, data).then((reply:unknown) => res.send(reply))
    }


}



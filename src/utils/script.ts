export default {
    dropUsers:"DROP TABLE IF EXISTS Users; ",
    dropThemes:"DROP TABLE IF EXISTS Themes;",
    dropCommens:"DROP TABLE IF EXISTS Comments;",
    dropVoiting:"DROP TABLE IF EXISTS Likes;",
    dropFavorit:"DROP TABLE IF EXISTS Favorit;",  
    createTableUsers:"CREATE TABLE IF NOT EXISTS Users( id_user INTEGER PRIMARY KEY NOT NULL, name VARCHAR(25) NOT NULL, photo VARCHAR(255) default 'nul');",
    createTableThemes:"CREATE TABLE IF NOT EXISTS Themes( id_theme INTEGER PRIMARY KEY, name VARCHAR(255));",
    createTableComments:"CREATE TABLE IF NOT EXISTS Comments(id INTEGER PRIMARY KEY NOT NULL UNIQUE, user_id INTEGER REFERENCES Users(id_user) ON DELETE CASCADE, reply_to_id INTEGER REFERENCES Comments(id) ON DELETE CASCADE, date INTEGER, theme_id INTEGER REFERENCES themes(id_theme) ON DELETE CASCADE, content TEXT)",
    createTableVoiting:"CREATE TABLE IF NOT EXISTS Likes( id INTEGER PRIMARY KEY NOT NULL UNIQUE, user_id INTEGER REFERENCES users(id_user) ON DELETE CASCADE, comment_id INTEGER REFERENCES Comments(id) ON DELETE CASCADE, score INTEGER);",
    createTableFavorit:"CREATE TABLE IF NOT EXISTS Favorit( id INTEGER PRIMARY KEY NOT NULL UNIQUE, user_id INTEGER REFERENCES users(id_user) ON DELETE CASCADE, comment_id INTEGER REFERENCES Comments(id) ON DELETE CASCADE);"
}




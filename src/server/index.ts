import express from 'express';
const server = express();
import path  from 'path'
import 'dotenv/config'
import cors from 'cors'
import {router} from './routers/commentsRouters.js';


const __dirname = path.resolve()
if (process.env.USE_DB == 'demo'){ 
    server.use("/img", express.static(__dirname + path.normalize('/dist/server/demo/img')));
} else {
    server.use("/img", express.static(__dirname + path.normalize('/dist/server/BD/img')))
};
server.use("/picture", express.static(__dirname + path.normalize("/dist/frontend/picture")));
server.use("/", express.static(__dirname + path.normalize("/dist/frontend")));
server.use(express.json());
server.use(express.text());
server.use(cors());
server.use("/comments", router);
server.listen(process.env.PORT, () => {
  console.log(`Start: PORT-${process.env.PORT}`);
});

server.get('/', (req:express.Request, res: express.Response) => {
    res.sendFile( path.resolve(__dirname, '..','frontend', 'index.html'))
})


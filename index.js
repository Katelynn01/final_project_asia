import express from "express";
import bodyParser from "body-parser";

import { connect } from "./connectDb.js";
import { rateLimiter } from "./rateLimiter.js";
import { JWT } from "./authenticate.js";

const app = express();
const db = connect();

app.use(bodyParser.json());
app.use(rateLimiter);
app.use(express.urlencoded({ extended : true }));

app.post("/posts", JWT, (req, res) => {
    const body = req.body;
    const title = body.title;
    const content = body.content;

    db.none("INSERT INTO post(title, content) VALUES(${title}, ${content})", {
        title: title,
        content: content
    })
      .then(() => {
        res.status(201).json({ message: "INSERTED SUCCESSFULLY!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "ERROR!"});
      })
});

app.get("/posts", JWT,  (req, res) => {
    db.any("SELECT * FROM post")
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR!' });
      });

});

app.get("/posts/:id", JWT,  (req, res) => {
    const id = req.params.id;

    db.one("SELECT * FROM post WHERE id = $1", [id])
      .then((data) => {
        res.json(data);
      })
      .catch((data) => {
        if (data == undefined) {
            res.json({ message: 'Unavailable record' });
        }
        else {
            res.status(500).json({ message: 'ERROR!' });
        }
      });

});

app.put("/posts/:id", JWT,  (req, res) => {
    const id = req.params.id;
    
    const body = req.body;
    const title = body.title;
    const content = body.content;

    db.none("UPDATE post SET title = ${title}, content = ${content} WHERE id = ${id}", {
        id: id,
        title: title,
        content: content
    })
      .then(() => {
        res.status(201).json({ message: "UPDATED POST!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error!"});
      });
});

app.delete("/posts/:id", JWT,  (req, res) => {
    const id = req.params.id;

    db.none("DELETE FROM post WHERE id = ${id}", {
        id: id,
    })
      .then(() => {
        res.status(201).json({ message: "DELETED POST!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "ERROR!"});
      });
});

app.listen(3000);
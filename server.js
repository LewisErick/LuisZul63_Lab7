let express = require("express");
let morgan = require("morgan");
let uuidv4 = require('uuid/v4');
let bodyParser = require('body-parser');
let app = express();

app.use(morgan("dev"));

var jsonParser = bodyParser.json();

/*
const post = {
    id: uuid.v4(),
    title: string,
    content: string,
    author: string,
    publishedDate: Date
}
*/
var blogPosts = [];
let blogPostFields = [
    "title", "content", "author", "publishedDate"
]

app.listen("8080", () => {
    console.log("Listening on port 8080");
});

app.get("/blog-posts", (req, res, next) => {
    res.status(200).json(blogPosts);
});

app.get("/blog-post", (req, res, next) => {
    if (req.query["author"] !== undefined) {
        let author = req.query["author"];
        var results = [];
        blogPosts.forEach(function(post) {
            if (post["author"] == author) {
                results.push(post);
            }
        });
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({message: "Author not found.",
                                  status: "404"});
        }
    } else {
        res.status(406).json({message: "No author specified.",
                              status: "406"});
    }
});

// Expecting data in body.
app.post("/blog-posts", jsonParser, (req, res) => {
    console.log(req.body);
    var jsonObject = req.body;
    var validObject = true;
    var missingFields = [];

    blogPostFields.forEach(function(field) {
        if (jsonObject[field] === undefined) {
            validObject = false;
            missingFields.push(field);
        }
    });

    if (validObject) {
        jsonObject["id"] = uuidv4();
        blogPosts.push(jsonObject);
        res.status(201).json(jsonObject);
    } else {
        res.status(406).json(missingFields);
    }
});

app.delete("/blog-posts/:id", (req, res) => {
    let post_id = req.params.id;
    var foundId = false;
    blogPosts.forEach(function(post, i) {
        if (post["id"] == post_id) {
            blogPosts.splice(i, 1);
            foundId = true;
        }
    });
    if (foundId) {
        res.status(200).json(blogPosts);
    } else {
        res.status(404).json({message: "Post with id not found.",
                                status: "404"});
    }
});

app.put("/blog-posts/:id", jsonParser, (req, res) => {
    let post_id = req.params.id;
    if (req.body["id"] === undefined) {
        res.status(406).json({message: "ID missing in request body",
                                status: "406"});
    } else {
        if (req.params.id != req.body.id) {
            res.status(409).json({message: "Request body and path id variables do not match.",
                                status: "409"});
        } else {
            blogPosts.forEach(function(post, i) {
                if (post["id"] == post_id) {
                    blogPostFields.forEach(function(field) {
                        if (req.body[field] != undefined) {
                            post[field] = req.body[field];
                        }
                    });   
                }
            });
            res.status(200).json(blogPosts);
        }
    }
});
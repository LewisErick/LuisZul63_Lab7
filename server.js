let express = require("express");
let morgan = require("morgan");
let uuidv4 = require('uuid/v4');
let app = express();

app.use(morgan("dev"));

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
    if (req.params["author"] !== undefined) {
        let author = req.params["author"];
        var results = [];
        $.each(blogPosts, function(post) {
            if (post["author"] == author) {
                results.append(post);
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
app.post("/blog-posts", (req, res, next) => {
    var jsonObject = req.body.json;
    var validObject = true;
    var missingFields = [];

    $.each(blogPostFields, function(field) {
        if (jsonObject.params[field] === undefined) {
            validObject = false;
            missingFields.append(field);
        }
    });

    if (validObject) {
        jsonObject["id"] = uuidv4();
        blogPosts.append(jsonObject);
        res.status(201).json(jsonObject);
    } else {
        res.status(406).json(missingFields);
    }
});
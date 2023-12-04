const express = require("express");
const {
  validatePost,
  validateUser,
  validateUserId,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.body).then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id", validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const user = Users.getById(req.params.id);
  Users.remove(req.params.id)
    .then((removed) => {
      res.json(req.user);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postObj = {
    user_id: req.params.id,
    text: req.body.text,
  };
  Posts.insert(postObj)
    .then((newPost) => {
      res.json(newPost);
    })
    .catch(next);
});

// do not forget to export the router
module.exports = router;
const User = require("../users/users-model");
function logger(req, res, next) {
  // DO YOUR MAGIC
  const method = req.method;
  const requestUrl = req.originalUrl;
  const timeStamp = new Date().toDateString();
  console.log(`Method : ${method}
  Request Url: ${requestUrl}
  Time : ${timeStamp}}`);
  next();
}


async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch {
    res.status(500).json({
      message: "No user found",
    });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}


function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text) {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    next();
  }
}


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

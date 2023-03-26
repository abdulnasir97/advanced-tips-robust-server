const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));


function ratingsExists(req, res, next) {
  const { ratingId } = req.params;
  const foundRating = ratings.find((rating) => rating.id === Number(ratingId));
  if (foundRating) {
    res.locals.rating = foundRating;
return next();
  } else {
    res.status(404).json({ error: `Rating id not found: ${ratingId}` });
  }
}

function list(request, response) {
  const filteredRatings = ratings.filter(
    (rating) =>
      !request.params.noteId || rating.noteId == Number(request.params.noteId)
  );
 response
    .json({ data: filteredRatings });
}


function read(req, res) {
  res.json({ data: res.locals.rating });
}

module.exports = {
  list,
  read: [ratingsExists, read],
  
};
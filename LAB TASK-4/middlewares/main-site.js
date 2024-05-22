module.exports = async function (req, res, next) {
  console.log(req.method + ": " + req.url);

  let cart = (req.cookies && req.cookies.cart) ? req.cookies.cart : [];
  
  // Optionally, set a cookie if it doesn't exist
  if (!req.cookies || !req.cookies.cart) {
    res.cookie('cart', [], { httpOnly: true });
  }

  res.locals.cart = cart;

  // Safely access req.session.user
  res.locals.user = req.session ? req.session.user : null;

  next();
};

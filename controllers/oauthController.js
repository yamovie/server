exports.google = (req, res) => {
  const token = req.user.token;
  // const user = { 
  //   name: req.user.displayName,
  //   email: req.user.email,
  //   token,
  // };
  res.redirect(`http://localhost:3000?token=${token}`);
};


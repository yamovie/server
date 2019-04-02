exports.google = (req, res) => {
  const token = req.user.token;
  // const io = req.app.get('io');
  const user = { 
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250'),
    email: req.user.email,
    token,
  };
  res.redirect(`http://localhost:3000?token=${token}`);
  // io.in(req.session.socketId).emit('google', user);
};


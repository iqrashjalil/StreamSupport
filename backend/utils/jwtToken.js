const sendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  const options = {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client side
    secure: true, // Ensures the cookie is sent only over HTTPS
    sameSite: "Lax", // Helps prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;

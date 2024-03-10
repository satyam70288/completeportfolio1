exports.Contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMsg = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

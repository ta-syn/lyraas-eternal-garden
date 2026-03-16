module.exports = (req, res) => {
  // Set CORS headers for local development if needed, 
  // though Vercel handles this well in production
  if (req.method === 'POST') {
    const { password } = req.body;
    const correctPassword = process.env.GARDEN_PASSWORD;

    if (password === correctPassword) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Wrong password' 
      });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

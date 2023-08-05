const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist/pokemon-app')));


// For any route that is not matched above, serve the Angular app's index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/pokemon-app/index.html'));
});

// Start the server on the desired port
const port = process.env.PORT || 8080; // Use the desired port, or fallback to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

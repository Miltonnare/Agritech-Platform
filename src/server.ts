import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

// Add '0.0.0.0' as the hostname to allow external access
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

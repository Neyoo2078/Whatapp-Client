import { nextConnect } from 'next-connect';
import { createRouter, expressWrapper } from 'next-connect';
import upload from '@/lib/multer';

const apiRoute = createRouter({
  // Configure any middleware you want to use
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  req.file;
  // Access the uploaded file using `req.file`
  // Process the file as needed
  // Send a response
});

export default apiRoute;

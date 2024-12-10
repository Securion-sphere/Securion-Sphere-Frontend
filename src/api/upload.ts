import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up multer to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Store files in the public/uploads folder
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/markdown') {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf and .md files are allowed.'));
    }
  },
});

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to use multer
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = (req as any).file; // Access the uploaded file
      const { moduleName, moduleDescription } = req.body;

      // If file is uploaded successfully, save the file info and form data (name, description)
      if (file) {
        const fileUrl = `/uploads/${file.filename}`;

        // In a real app, you'd store moduleName, moduleDescription, and fileUrl in a database
        // For now, we'll just return the data back
        return res.status(200).json({
          message: 'File uploaded successfully',
          fileUrl,
          moduleName,
          moduleDescription,
        });
      }

      return res.status(400).json({ error: 'File upload failed' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;

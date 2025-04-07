import busboy from 'busboy';
import fs from 'fs';
import http from 'http';
import path from 'path';
import Stream from 'stream';

const UPLOAD_DIR = path.join(__dirname, 'uploads');
const PORT = 8088;

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const server = http.createServer((req, res) => {
  console.log("INCOMING!!!", req.headers, "URL", req.url, "METHOD", req.method);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',  
      'Access-Control-Allow-Methods': 'POST, OPTIONS',  
      'Access-Control-Allow-Headers': 'Content-Type',  
      'Content-Type': 'application/json',
    });
    res.end();
    return;
  }
  
  if (req.method === 'POST' && (req.url === '/upload/img/' || req.url === '/upload/img')) {
    const busby = busboy({ headers: req.headers });
    const uploads: string[] = [];

    busby.on('file', (fieldname: string, file: Stream, info: {filename: string, encoding: string, mimetype: string}) => {
      const saveTo = path.join(UPLOAD_DIR, `${Date.now()}-${info.filename}`);
      const writeStream = fs.createWriteStream(saveTo);
      uploads.push(saveTo);
      file.pipe(writeStream);
    });

    busby.on('finish', () => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',  
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ 
        success: true,
        message: 'File uploaded successfully',
        files: uploads
      }));
    });

    busby.on('error', (err: Error) => {
      console.error('Upload error:', err);
      res.writeHead(500, {
        'Access-Control-Allow-Origin': '*',  
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ 
        success: false,
        message: 'Upload failed'
      }));
    });

    req.pipe(busby);
  } else if(req.method === 'GET') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',  
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ 
      success: true,
      message: 'File uploaded successfully',
      files: []
    }))
  } else {
    res.writeHead(404, {
      'Access-Control-Allow-Origin': '*',  
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ 
      success: false,
      message: 'Route not found'
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
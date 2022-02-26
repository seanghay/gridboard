import express from 'express';
import dotenv, { load } from 'dotenv-extended';
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan';
import type { Request, Response } from 'express'
import { createImageCollage } from './canvas';
import { loadImage } from 'canvas'
import fetch from 'node-fetch'
import stream from 'stream';

dotenv.load();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

interface CollageRequestBody {
  images: string[];
  column: number;
  row: number;
  width: number;
  height: number;
  spans?: string;
}


// todo: https://example.com/collage/4x4/0:2!0:2/?base_url=google.com&images=images.png,2,3,4&bg=white&gap=10
app.post('/collage', async (req: Request, res: Response) => {
  const body = req.body as CollageRequestBody;

  const images = await Promise.all(
    body.images.map(url => fetch(url)
      .then(res => res.arrayBuffer()).then(arrayBuffer => {
        const buffer = Buffer.from(arrayBuffer);
        return loadImage(buffer);
      }))
  );

  const buffer = await createImageCollage({
    images, 
    bg: 'white',
    column: body.column,
    row: body.row,
    width: body.width,
    height: body.height,
    spans: body.spans,
  });

  const readStream = new stream.PassThrough();
  readStream.end(buffer);
  res.set("Content-Disposition", "attachment; filename=image-collage.jpg");
  res.set("Content-Type", "image/jpeg");
  readStream.pipe(res);
})

app.listen(port, () => console.log(`server is now listening on http://localhost:${port}`));
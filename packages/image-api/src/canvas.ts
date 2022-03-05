import { createCanvas, loadImage, Image, CanvasRenderingContext2D } from 'canvas';
import { renderGrid } from '@gridboard/core'

export interface ImageCollageConfig {
  width: number;
  height: number;
  images: Image[]
  column: number;
  row: number;
  bg: string;
  edge: boolean;
  gap?: number;
  spans?: string,
}

export async function createImageCollage(config: ImageCollageConfig): Promise<Buffer> {
  
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');
  drawBackgroundColor(ctx, config.bg);

  const imageAt = (position: number) =>
    config.images[position % config.images.length]

  renderGrid({
    rowSize: config.row,
    columnSize: config.column,
    gapSize: config.gap ?? 0,
    spans: config.spans,
    width: config.width,
    height: config.height,
    gapEdge: config.edge,

    render({
      row, column,
      cellHeight,
      cellWidth,
      position,
      estimatedHeight,
      estimatedWidth,
      x,
      y
    }) {

      const image = imageAt(position);
      
      if (!image) {
        ctx.save();
        ctx.fillStyle = '#eee';
        ctx.fillRect(
          x,
          y,
          cellWidth,
          cellHeight
        );
        ctx.restore();
        return;
      };

      drawImageCell(
        ctx,
        image,
        cellWidth,
        cellHeight,
        x,
        y
      );
    }
  });

  return canvas.toBuffer('image/jpeg');
}


export function drawBackgroundColor(
  ctx: CanvasRenderingContext2D,
  backgroundColor: string,
) {
  ctx.save();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

export function drawImageCell(
  ctx: CanvasRenderingContext2D,
  image: Image,
  actualWidth: number,
  actualHeight: number,
  x: number, y: number,
) {

  const ratio = Math.min(
    actualWidth / image.width,
    actualHeight / image.height
  );
  const viewportRatio = actualWidth / actualHeight;
  const imageRatio = image.width / image.height;
  const scale =
    imageRatio > viewportRatio
      ? viewportRatio / imageRatio
      : imageRatio / viewportRatio;
  const offsetX = image.width - (actualWidth / ratio) * scale;
  const offsetY = image.height - (actualHeight / ratio) * scale;
  ctx.drawImage(
    image,
    offsetX / 2,
    offsetY / 2,
    (actualWidth / ratio) * scale,
    (actualHeight / ratio) * scale,
    x,
    y,
    actualWidth,
    actualHeight
  );
}
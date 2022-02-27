
export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  resizeCanvas(canvas, width, height);
  return canvas;
}

export function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number): void {
  const ratio = window.devicePixelRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext('2d')?.scale(ratio, ratio);
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
  image: HTMLImageElement,
  actualWidth: number,
  actualHeight: number,
  
  x: number,
  y: number,
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
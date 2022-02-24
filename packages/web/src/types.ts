


export interface GridBoardCanvasState {
  backgroundColor: string;
  images: HTMLImageElement[];
  spans: string;
  gridGap: number;
  gridColumnSize: number;
  gridRowSize: number;
}

export interface DrawState {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}
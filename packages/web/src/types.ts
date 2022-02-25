


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


export interface GridBoardConfiguration {
  exports: { quality: number };
  state: Partial<GridBoardCanvasState>;
  size: { width: number; height: number; }
  version: string;
} 

export interface CanvasExportConfig {
  type: 'image/png' | 'image/jpeg';
  quality?: number;
}
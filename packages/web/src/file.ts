import FileSaver from 'file-saver'
import { CanvasExportConfig } from './types'

export async function readPlainTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      reader.onerror = null;
      reader.onload = null;
      resolve(reader.result as string);
    };
    reader.onerror = () => {

      reader.onerror = null;
      reader.onload = null;
      reject(reader.error);
    };
    reader.readAsText(file);
  });
}

export async function readJsonFile<T>(file: File): Promise<T> {
  return JSON.parse(await readPlainTextFile(file));
}

export function extractFilesFromInputElement(target: HTMLInputElement): File[] {
  if (!target.files) return [];
  const files: FileList = target.files;
  const items: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (!file) continue;
    items.push(file);
  }
  return items;
}

export function downloadJsonFile(data: any) {
  const jsonString = JSON.stringify(data);
  const file = new Blob([jsonString], { type: 'application/json' });
  const objectURL = URL.createObjectURL(file);
  downloadFile(`gridboard-${Date.now()}.json`, objectURL);
}

export function downloadFile(filename: string, data: any) {
  FileSaver.saveAs(data, filename);
}

export function exportCanvasAsFile(canvas: HTMLCanvasElement, config: CanvasExportConfig) {
  const ctx = canvas.getContext('2d')!;
  ctx.save();
  
  try {
    const data = canvas.toDataURL(config.type, config.quality ? config.quality / 100 : undefined);
    let extension: string = '';
    if (config.type === 'image/jpeg') extension = 'jpg';
    if (config.type === 'image/png') extension = 'png';
    if (!extension) return;
    FileSaver.saveAs(data, `image-gridboard-${Date.now()}.${extension}`);
  } catch (e) {
    console.error(e)
  } finally {
    ctx.restore();
  }
}

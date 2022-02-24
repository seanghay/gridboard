import imageCompression from "browser-image-compression"; 

export async function compressImageFile(file: File): Promise<File> {
  return imageCompression(file, { 
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  });
}

export async function compressImageFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map(file => compressImageFile(file)));
}

export async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      reader.onload = null;
      reader.onerror = null;
      const dataURL = reader.result as string;
      resolve(dataURL);
    }
    reader.onerror = () => {
      reader.onerror = null;
      reader.onload = null;
      reject(reader.error);
    }
    reader.readAsDataURL(file);
  });
}

export async function fileToImage(file: File): Promise<HTMLImageElement> {
  return imageCompression.loadImage(await fileToDataURL(file)) 
}

export async function filesToImages(files: File[]): Promise<HTMLImageElement[]> {
  return Promise.all(files.map(file => fileToImage(file)));
}
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

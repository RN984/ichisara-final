import useSWR from 'swr';

const API_KEY = import.meta.env.VITE_DRIVE_API_KEY;

const fetcher = url => fetch(url).then(r => r.json());

// フォルダ内の全ファイルを取得して { ファイル名: URL } のマップを返す
export function useDriveFolder(folderId, type = 'image') {
  const q = encodeURIComponent(`'${folderId}' in parents`);
  const { data, error } = useSWR(
    folderId && API_KEY
      ? `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&key=${API_KEY}`
      : null,
    fetcher
  );

  if (error) console.error('Drive API error:', error);
  if (data?.error) console.error('Drive API response error:', data.error);

  if (!data?.files) return {};

  return Object.fromEntries(
    data.files.map(f => [
      f.name,
      type === 'image'
        ? `https://drive.google.com/thumbnail?id=${f.id}&sz=w1280`
        : `https://drive.google.com/file/d/${f.id}/preview`,
    ])
  );
}

// パス文字列（"フォルダ名/ファイル名.jpg"）からファイル名だけ取り出してURLを解決
export function resolveUrl(path, fileMap) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const fileName = path.split('/').pop();
  return fileMap[fileName] ?? null;
}

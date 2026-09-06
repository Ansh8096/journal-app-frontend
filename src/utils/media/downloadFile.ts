export interface DownloadFileOptions {
    blob: Blob;
    fileName: string;
}

export function downloadFile({
    blob,
    fileName,
}: DownloadFileOptions): void {
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}
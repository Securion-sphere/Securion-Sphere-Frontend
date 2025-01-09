export interface Module {
    id: number;
    title: string;
    description: string;
    fileName: string;
    fileType: 'pdf' | 'md';
    filePresignedUrl: string;
    imagePresignedUrl: string;
}

export interface ModuleData {
  title: string;
  description: string;
  fileUrl: string;
  image: string;
}
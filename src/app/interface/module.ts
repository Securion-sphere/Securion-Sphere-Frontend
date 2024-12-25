export interface Module {
    id: number;
    title: string;
    description: string;
    image: string;
    fileUrl: string;
    fileType: 'pdf' | 'markdown';
  }

export interface ModuleData {
  title: string;
  description: string;
  fileUrl: string;
  image: string;
}
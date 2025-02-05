export interface BulkUploadResponse {
    success: boolean;
    results: Array<{
      email: string;
      status: string;
    }>;
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
  }
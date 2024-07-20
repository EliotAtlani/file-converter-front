export interface APIReponseType {
  data: {
    fileName: string;
    buffer: {
      data: number[];
    };
  }[];
}

export interface APIReponseCompressedType {
  data: {
    originalName: string;
    compressedName: string;
    originalSize: number;
    compressedSize: number;
    buffer: {
      data: number[];
    };
  }[];
}

export interface APIReponseResizedType {
  data: {
    originalName: string;
    resizedName: string;
    buffer: {
      data: number[];
    };
  }[];
}

export interface UploadableFile {
  url: string;
  name: string;
}

export enum FileType {
  PNG = "png",
  WEBP = "webp",
  JPEG = "jpeg",
  GIF = "gif",
  ICO = "ico",
}

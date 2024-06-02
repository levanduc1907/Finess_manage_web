import { Http, SERVICE_NAMES } from "../../http";

export class UploadService extends Http {
  endpoint = import.meta.env.VITE_APP_API_ENDPOINT as string;
  // endpoint = this.endpointWithVersion.split('/').slice(0, -1).join('/');
  name = SERVICE_NAMES.UPLOAD_FILE;

  upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.post({ url: this.name, body: formData });
  }
}

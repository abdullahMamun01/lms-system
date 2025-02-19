
import multer, { StorageEngine } from 'multer';
const storage: StorageEngine = multer.memoryStorage();

const uploadFile = (fieldName: string) => {
  return multer({ storage }).single(fieldName);
};

const uploadFiles = (fieldName: string) => {
  return multer({ storage }).array(fieldName, 10);
};

export { uploadFile, uploadFiles };

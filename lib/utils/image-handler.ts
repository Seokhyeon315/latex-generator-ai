import imageCompression from 'browser-image-compression';

export const MAX_FILE_SIZE_MB = 4;
export const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

export type ImageValidationResult = {
  isValid: boolean;
  error?: string;
  compressedFile?: File;
  wasCompressed?: boolean;
};

export async function validateAndCompressImage(file: File): Promise<ImageValidationResult> {
  // Convert HEIC to JPEG if needed
  if (file.type === 'image/heic') {
    try {
      const heic2any = (await import('heic2any')).default;
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
      });
      
      // Convert Blob or Blob[] to File
      const convertedFile = new File(
        [convertedBlob instanceof Blob ? convertedBlob : convertedBlob[0]], 
        file.name.replace(/\.heic$/i, '.jpg'),
        { type: 'image/jpeg' }
      );
      file = convertedFile;
    } catch (error) {
      return {
        isValid: false,
        error: 'Failed to convert HEIC image. Please try converting it to JPEG first.'
      };
    }
  }

  // Check if file type is supported by Gemini
  if (!Object.keys(ACCEPTED_IMAGE_TYPES).includes(file.type)) {
    return {
      isValid: false,
      error: `Unsupported file type. Accepted formats: ${Object.values(ACCEPTED_IMAGE_TYPES).flat().join(', ')}`
    };
  }

  // Check and compress file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    try {
      // Compression options optimized for Gemini
      const options = {
        maxSizeMB: MAX_FILE_SIZE_MB,
        maxWidthOrHeight: 3072, // Gemini's max resolution
        useWebWorker: true,
        fileType: file.type as 'image/jpeg' | 'image/png' | 'image/webp'
      };

      const compressedFile = await imageCompression(file, options);
      return {
        isValid: true,
        compressedFile,
        wasCompressed: true
      };
    } catch (error) {
      return {
        isValid: false,
        error: `File is too large (${fileSizeMB.toFixed(2)}MB). Maximum size is ${MAX_FILE_SIZE_MB}MB`
      };
    }
  }

  return {
    isValid: true,
    compressedFile: file,
    wasCompressed: false
  };
}

export async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
} 
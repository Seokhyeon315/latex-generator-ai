export const ERROR_MESSAGES = {
  IMAGE: {
    NO_FILE: 'No file selected',
    PROCESSING_ERROR: 'Error processing image. Please try again.',
    NO_IMAGE: 'No image attached.',
    CONVERSION_ERROR: 'An error occurred during conversion. Please try a different image.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
  },
  VALIDATION: {
    SIZE_EXCEEDED: (size: number, max: number) => 
      `File is too large (${size.toFixed(2)}MB). Maximum size is ${max}MB`,
    INVALID_TYPE: (formats: string[]) => 
      `Unsupported file type. Accepted formats: ${formats.join(', ')}`,
  }
};

export const LOADING_MESSAGES = {
  PROCESSING: 'Processing image...',
  CONVERTING: 'Converting to LaTeX...',
  COMPRESSING: 'Compressing image...',
};

export const SUCCESS_MESSAGES = {
  CONVERSION: 'Successfully converted to LaTeX!',
  COMPRESSION: 'Image compressed successfully',
}; 
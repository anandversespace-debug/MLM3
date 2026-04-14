import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 */
export async function uploadImage(file: Buffer, folder: string = 'mlm-ecommerce'): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );

    uploadStream.end(file);
  });
}

/**
 * Upload multiple images to Cloudinary
 */
export async function uploadMultipleImages(
  files: Buffer[],
  folder: string = 'mlm-ecommerce'
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract public_id from URL
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];
    
    // Get folder from URL
    const folderIndex = urlParts.indexOf('mlm-ecommerce');
    const fullPublicId = folderIndex !== -1 
      ? `mlm-ecommerce/${publicId}`
      : publicId;

    await cloudinary.uploader.destroy(fullPublicId);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Delete multiple images from Cloudinary
 */
export async function deleteMultipleImages(imageUrls: string[]): Promise<boolean[]> {
  const deletePromises = imageUrls.map((url) => deleteImage(url));
  return Promise.all(deletePromises);
}

export { cloudinary };

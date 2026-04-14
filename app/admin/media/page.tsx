'use client';

export default function MediaLibraryPage() {
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Media Library</h1>
          <p className="text-foreground-secondary">Manage images, files, and documents</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
          📤 Upload Files
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-lg font-medium text-foreground mb-2">Media Library</p>
          <p className="text-foreground-secondary mb-6">Upload and organize your media files via Cloudinary</p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 max-w-2xl mx-auto">
            <p className="text-foreground-secondary mb-4">Drag and drop files here, or click to browse</p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
              Select Files
            </button>
            <p className="text-sm text-foreground-secondary mt-4">
              Supported formats: JPG, PNG, GIF, PDF, DOC, MP4
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Uploads</h2>
        <div className="text-center py-8 text-foreground-secondary">
          <p>No media files uploaded yet</p>
        </div>
      </div>
    </div>
  );
}

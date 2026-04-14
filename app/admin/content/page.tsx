'use client';

export default function ContentCMSPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Content / CMS Management</h1>
        <p className="text-foreground-secondary">Manage blog posts, pages, and SEO settings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-bold text-foreground mb-2">Blog Posts</h3>
          <p className="text-foreground-secondary mb-4">Create and manage blog articles</p>
          <a href="/admin/content/blog" className="text-blue-600 hover:text-blue-900 font-medium">
            Manage Blogs →
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-bold text-foreground mb-2">Static Pages</h3>
          <p className="text-foreground-secondary mb-4">About, Terms, Privacy Policy</p>
          <a href="/admin/content/pages" className="text-blue-600 hover:text-blue-900 font-medium">
            Manage Pages →
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-bold text-foreground mb-2">Homepage Banners</h3>
          <p className="text-foreground-secondary mb-4">Hero sections and promotional banners</p>
          <a href="/admin/content/banners" className="text-blue-600 hover:text-blue-900 font-medium">
            Manage Banners →
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">🔍 SEO Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="Your Site Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="Brief description of your site"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="keyword1, keyword2, keyword3" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
              Save SEO Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { formatDate } from '@/utils/helpers';

const sampleBlogs = [
  {
    id: 1,
    title: 'How to Maximize Your MLM Earnings',
    slug: 'maximize-mlm-earnings',
    excerpt: 'Learn the top strategies to build your network and maximize your commission earnings...',
    date: new Date('2026-04-01'),
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Top 10 Products to Start Your Journey',
    slug: 'top-10-products',
    excerpt: 'Discover the best-selling products that can help you reach the ₹10,000 threshold faster...',
    date: new Date('2026-03-28'),
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Understanding the 10-Level Commission System',
    slug: 'understanding-commission-system',
    excerpt: 'A comprehensive guide to how our MLM commission structure works...',
    date: new Date('2026-03-25'),
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-ultra-light to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">Blog</h1>
          <p className="text-xl text-foreground-secondary">Tips, guides, and updates</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid gap-8">
          {sampleBlogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-4">
                <span>{formatDate(blog.date)}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-foreground-secondary mb-4">{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug}`} className="text-primary font-medium hover:underline">
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

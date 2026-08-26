import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { blogPosts, blogCategories } from '../data/blog';
import PageHero from '../components/ui/PageHero';

export default function BlogPage() {
  usePageMeta({
    title: 'Blog & News',
    description: 'Event inspiration, photo booth tips, and behind-the-scenes stories from Red Rose Photo Booth.',
  });

  const [category, setCategory] = useState('All');
  const filtered = category === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        variant="blog"
        title={<>Blog & <span className="text-gradient-gold">News</span></>}
        subtitle="Event inspiration, photo booth tips, and behind-the-scenes stories from Red Rose."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-base font-semibold rounded-full border transition-colors ${
                  category === cat
                    ? 'bg-antiqueGold text-charcoal border-antiqueGold'
                    : 'border-antiqueGold/30 text-charcoal hover:border-antiqueGold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-luxury group h-full flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="h-48 overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="section-eyebrow !text-xs !mb-2 shrink-0">{post.category}</span>
                    <h2 className="card-title mt-2 mb-3 group-hover:text-antiqueGold transition-colors shrink-0">
                      {post.title}
                    </h2>
                    <p className="card-text line-clamp-2 flex-1">{post.excerpt}</p>
                    <p className="text-charcoal/70 text-sm font-semibold mt-4 shrink-0">{post.date}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

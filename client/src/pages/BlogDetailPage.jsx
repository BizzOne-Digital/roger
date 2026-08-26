import { Link, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { getBlogPost } from '../data/blog';
import PageHero from '../components/ui/PageHero';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  usePageMeta({
    title: post?.title,
    description: post?.excerpt,
    image: post?.image,
  });

  if (!post) {
    return (
      <>
        <PageHero
          variant="blog"
          align="center"
          compact
          title="Article Not Found"
          subtitle="The story you are looking for may have been moved or removed."
        />
        <div className="text-center py-16 bg-warmIvory">
          <Link to="/blog" className="btn-secondary">Back to Blog</Link>
        </div>
      </>
    );
  }

  return (
    <article className="bg-warmIvory">
      <PageHero
        variant="blog"
        image={post.image}
        imageAlt={post.title}
        eyebrow={post.category}
        title={post.title}
        subtitle={`${post.author} · ${post.date}`}
        align="center"
      />

      <div className="max-w-3xl mx-auto section-padding prose-luxury">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-12 pt-8 border-t border-antiqueGold/20">
          <Link to="/blog" className="btn-secondary">Back to Blog</Link>
        </div>
      </div>
    </article>
  );
}

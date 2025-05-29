import { getPortfolios, getBlogPosts } from '@/lib/notion/client';

export default async function TestPage() {
  // Notion API에서 데이터 가져오기
  const portfolios = await getPortfolios();
  const blogPosts = await getBlogPosts();

  return (
    <div className="container mx-auto mt-8 p-8">
      <h1 className="text-3xl font-bold mb-8">Notion API 테스트</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">포트폴리오 ({portfolios.length}개)</h2>
        <div className="space-y-4">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{portfolio.title}</h3>
              <p className="text-sm text-muted-foreground">{portfolio.description}</p>
              <div className="flex gap-2 mt-2">
                {portfolio.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-secondary rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-xs">
                Featured: {portfolio.featured ? '✓' : '✗'} | 
                ID: {portfolio.id}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">블로그 포스트 ({blogPosts.length}개)</h2>
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-primary/10 rounded">
                  {post.category}
                </span>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-xs">
                Slug: {post.slug} | 
                Published: {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

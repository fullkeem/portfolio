import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="content-heading">{children}</h2>,
    h3: ({ children }) => <h3 className="content-subheading">{children}</h3>,
    p: ({ children }) => <p className="content-paragraph">{children}</p>,
    ul: ({ children }) => <ul className="content-list">{children}</ul>,
    ol: ({ children }) => <ol className="content-list content-list--ordered">{children}</ol>,
    blockquote: ({ children }) => <blockquote className="content-quote">{children}</blockquote>,
    a: ({ children, href }) => (
      <a className="content-link" href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined}>
        {children}
      </a>
    ),
    ...components,
  };
}

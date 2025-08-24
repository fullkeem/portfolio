'use client';

import React from 'react';
import Link from 'next/link';
import { BlogImage } from '@/components/ui/OptimizedImage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

interface MarkdownRendererProps {
  markdown: string;
}

const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'details', 'summary'],
  attributes: {
    ...(defaultSchema as unknown as { attributes?: Record<string, unknown> }).attributes,
    details: ['open'],
  },
};

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}
      components={{
        code(componentProps) {
          const { inline, className, children, ...rest } = componentProps as unknown as {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          };
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            const language = match[1];
            return (
              <pre
                className={`overflow-x-auto rounded-md bg-secondary p-4 language-${language}`}
                {...(rest as Record<string, unknown>)}
              >
                <code className={`language-${language}`}>{String(children ?? '')}</code>
              </pre>
            );
          }
          return (
            <code className={className} {...(rest as Record<string, unknown>)}>
              {children as React.ReactNode}
            </code>
          );
        },
        img(componentProps) {
          const {
            src,
            alt = '',
            ...rest
          } = componentProps as unknown as {
            src?: string;
            alt?: string;
          } & React.ImgHTMLAttributes<HTMLImageElement>;
          const srcStr = typeof src === 'string' ? src : '';
          const isNotionImage =
            srcStr.includes('notion.so') || srcStr.includes('s3.us-west-2.amazonaws.com');
          const proxied = isNotionImage
            ? `/api/image-proxy?url=${encodeURIComponent(srcStr)}`
            : srcStr;
          return (
            <span className="block w-full">
              <BlogImage
                src={proxied}
                alt={alt}
                width={1200}
                height={800}
                sizes="100vw"
                className="h-auto w-full rounded-lg object-contain"
                {...(rest as Record<string, unknown>)}
              />
            </span>
          );
        },
        a(componentProps) {
          const {
            href = '',
            children,
            ...rest
          } = componentProps as unknown as {
            href?: string;
            children?: React.ReactNode;
          } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
          const isExternal = /^https?:\/\//.test(href);
          return (
            <Link
              href={href}
              className="text-primary underline hover:no-underline"
              {...((isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) as Record<
                string,
                unknown
              >)}
              {...(rest as Record<string, unknown>)}
            >
              {children}
            </Link>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;

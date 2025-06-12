import React, { Fragment } from 'react';
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BlogImage } from '@/components/ui/OptimizedImage';

type NotionBlock = BlockObjectResponse;

interface NotionBlocksProps {
  blocks: NotionBlock[];
}

// 그룹화된 블록 타입 정의
interface GroupedBlock {
  type: 'numbered_list_group' | 'bulleted_list_group' | 'original';
  items?: NotionBlock[];
  block?: NotionBlock;
  id: string;
}

// 블록 그룹화 함수
function groupBlocks(blocks: NotionBlock[]): GroupedBlock[] {
  const groupedBlocks: GroupedBlock[] = [];
  let currentNumberedList: NotionBlock[] = [];
  let currentBulletedList: NotionBlock[] = [];

  for (const block of blocks) {
    if (block.type === 'numbered_list_item') {
      // 기존 bulleted list가 있으면 먼저 추가
      if (currentBulletedList.length > 0) {
        groupedBlocks.push({
          type: 'bulleted_list_group',
          items: currentBulletedList,
          id: `bulleted-group-${currentBulletedList[0].id}`,
        });
        currentBulletedList = [];
      }
      currentNumberedList.push(block);
    } else if (block.type === 'bulleted_list_item') {
      // 기존 numbered list가 있으면 먼저 추가
      if (currentNumberedList.length > 0) {
        groupedBlocks.push({
          type: 'numbered_list_group',
          items: currentNumberedList,
          id: `numbered-group-${currentNumberedList[0].id}`,
        });
        currentNumberedList = [];
      }
      currentBulletedList.push(block);
    } else {
      // 다른 블록 타입이 나오면 기존 리스트들을 먼저 추가
      if (currentNumberedList.length > 0) {
        groupedBlocks.push({
          type: 'numbered_list_group',
          items: currentNumberedList,
          id: `numbered-group-${currentNumberedList[0].id}`,
        });
        currentNumberedList = [];
      }
      if (currentBulletedList.length > 0) {
        groupedBlocks.push({
          type: 'bulleted_list_group',
          items: currentBulletedList,
          id: `bulleted-group-${currentBulletedList[0].id}`,
        });
        currentBulletedList = [];
      }
      // 일반 블록 추가
      groupedBlocks.push({
        type: 'original',
        block,
        id: block.id,
      });
    }
  }

  // 마지막에 남은 리스트들 처리
  if (currentNumberedList.length > 0) {
    groupedBlocks.push({
      type: 'numbered_list_group',
      items: currentNumberedList,
      id: `numbered-group-${currentNumberedList[0].id}`,
    });
  }
  if (currentBulletedList.length > 0) {
    groupedBlocks.push({
      type: 'bulleted_list_group',
      items: currentBulletedList,
      id: `bulleted-group-${currentBulletedList[0].id}`,
    });
  }

  return groupedBlocks;
}

export function NotionBlocks({ blocks }: NotionBlocksProps) {
  const groupedBlocks = groupBlocks(blocks);

  return (
    <div role="document" aria-label="블로그 포스트 내용">
      {groupedBlocks.map((groupedBlock, index) => (
        <GroupedNotionBlock key={groupedBlock.id} groupedBlock={groupedBlock} index={index} />
      ))}
    </div>
  );
}

function GroupedNotionBlock({
  groupedBlock,
  index,
}: {
  groupedBlock: GroupedBlock;
  index: number;
}) {
  switch (groupedBlock.type) {
    case 'numbered_list_group':
      return <NumberedListGroupBlock items={groupedBlock.items!} />;
    case 'bulleted_list_group':
      return <BulletedListGroupBlock items={groupedBlock.items!} />;
    case 'original':
      return <NotionBlock block={groupedBlock.block!} index={index} />;
    default:
      return null;
  }
}

// 그룹화된 번호 매기기 목록 컴포넌트
function NumberedListGroupBlock({ items }: { items: NotionBlock[] }) {
  return (
    <ol
      className="mb-4 ml-4 list-outside list-decimal text-foreground/90 dark:text-foreground/95"
      role="list"
    >
      {items.map((block) => {
        if (block.type !== 'numbered_list_item') return null;
        const { numbered_list_item } = block;

        // 자식 블록들 가져오기
        const children = (block as any).numbered_list_item?.children || [];

        return (
          <li key={block.id} className="mb-2 pl-2" role="listitem">
            <div>{renderRichText(numbered_list_item.rich_text)}</div>
            {children.length > 0 && (
              <div className="ml-4 mt-2">
                <NotionBlocks blocks={children} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// 그룹화된 글머리 기호 목록 컴포넌트
function BulletedListGroupBlock({ items }: { items: NotionBlock[] }) {
  return (
    <ul
      className="mb-4 ml-4 list-outside list-disc text-foreground/90 dark:text-foreground/95"
      role="list"
    >
      {items.map((block) => {
        if (block.type !== 'bulleted_list_item') return null;
        const { bulleted_list_item } = block;

        // 자식 블록들 가져오기
        const children = (block as any).bulleted_list_item?.children || [];

        return (
          <li key={block.id} className="mb-2 pl-2" role="listitem">
            <div>{renderRichText(bulleted_list_item.rich_text)}</div>
            {children.length > 0 && (
              <div className="ml-4 mt-2">
                <NotionBlocks blocks={children} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function NotionBlock({ block, index }: { block: NotionBlock; index: number }) {
  const { type } = block;

  switch (type) {
    case 'paragraph':
      return <ParagraphBlock block={block} />;
    case 'heading_1':
      return <Heading1Block block={block} index={index} />;
    case 'heading_2':
      return <Heading2Block block={block} index={index} />;
    case 'heading_3':
      return <Heading3Block block={block} index={index} />;
    case 'quote':
      return <QuoteBlock block={block} />;
    case 'code':
      return <CodeBlock block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'divider':
      return <hr className="my-8 border-border" role="separator" aria-label="섹션 구분선" />;
    case 'callout':
      return <CalloutBlock block={block} />;
    case 'toggle':
      return <ToggleBlock block={block} />;
    case 'column_list':
      return <ColumnListBlock block={block} />;
    // 리스트 항목들은 그룹화되어 처리되므로 여기서는 null 반환
    case 'numbered_list_item':
    case 'bulleted_list_item':
      return null;
    default:
      return null;
  }
}

// 텍스트 렌더링 헬퍼 함수
function renderRichText(richTexts: RichTextItemResponse[]) {
  return richTexts.map((text, index) => {
    // RichTextItemResponse 타입 안전성을 위한 체크
    if (text.type !== 'text') {
      return <Fragment key={index}>{text.plain_text}</Fragment>;
    }

    const {
      annotations: { bold, italic, strikethrough, underline, code },
      text: { content, link },
    } = text;

    let element = <Fragment>{content}</Fragment>;

    if (bold) {
      element = <strong className="text-foreground">{element}</strong>;
    }
    if (italic) {
      element = <em>{element}</em>;
    }
    if (strikethrough) {
      element = <s>{element}</s>;
    }
    if (underline) {
      element = <u>{element}</u>;
    }
    if (code) {
      element = (
        <code
          className="rounded bg-secondary px-1 py-0.5 text-sm text-foreground dark:bg-secondary/80"
          role="code"
        >
          {element}
        </code>
      );
    }
    if (link) {
      element = (
        <Link
          href={link.url}
          className="rounded text-primary underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`외부 링크: ${link.url}`}
        >
          {element}
        </Link>
      );
    }

    return <Fragment key={index}>{element}</Fragment>;
  });
}

// 각 블록 타입별 컴포넌트들
function ParagraphBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'paragraph') return null;
  const { paragraph } = block;

  if (!paragraph.rich_text.length) {
    return (
      <p className="mb-4" aria-hidden="true">
        &nbsp;
      </p>
    );
  }

  return (
    <p className="mb-4 leading-relaxed text-foreground/90 dark:text-foreground/95">
      {renderRichText(paragraph.rich_text)}
    </p>
  );
}

function Heading1Block({ block, index }: { block: NotionBlock; index: number }) {
  if (block.type !== 'heading_1') return null;
  const { heading_1 } = block;

  return (
    <h2
      id={`heading-${index}`}
      className="mb-4 mt-8 text-3xl font-bold text-foreground"
      role="heading"
      aria-level={2}
      tabIndex={-1}
    >
      {renderRichText(heading_1.rich_text)}
    </h2>
  );
}

function Heading2Block({ block, index }: { block: NotionBlock; index: number }) {
  if (block.type !== 'heading_2') return null;
  const { heading_2 } = block;

  return (
    <h3
      id={`heading-${index}`}
      className="mb-3 mt-6 text-2xl font-semibold text-foreground"
      role="heading"
      aria-level={3}
      tabIndex={-1}
    >
      {renderRichText(heading_2.rich_text)}
    </h3>
  );
}

function Heading3Block({ block, index }: { block: NotionBlock; index: number }) {
  if (block.type !== 'heading_3') return null;
  const { heading_3 } = block;

  return (
    <h4
      id={`heading-${index}`}
      className="mb-2 mt-4 text-xl font-semibold text-foreground"
      role="heading"
      aria-level={4}
      tabIndex={-1}
    >
      {renderRichText(heading_3.rich_text)}
    </h4>
  );
}

function QuoteBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'quote') return null;
  const { quote } = block;

  return (
    <blockquote
      className="my-4 border-l-4 border-primary pl-4 italic text-foreground/80 dark:text-foreground/85"
      role="blockquote"
      cite=""
    >
      {renderRichText(quote.rich_text)}
    </blockquote>
  );
}

function CodeBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'code') return null;
  const { code } = block;
  const language = code.language.toLowerCase();
  const codeString = code.rich_text.map((text) => text.plain_text).join('');

  return (
    <figure
      className="my-4 overflow-hidden rounded-lg"
      role="img"
      aria-label={`${language} 코드 블록`}
    >
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
        }}
        aria-label={`${language} 프로그래밍 언어로 작성된 코드`}
        role="code"
      >
        {codeString}
      </SyntaxHighlighter>
    </figure>
  );
}

function ImageBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'image') return null;
  const { image } = block;

  const src = image.type === 'external' ? image.external.url : image.file.url;
  const caption = image.caption.length ? image.caption[0].plain_text : '';

  return (
    <figure className="my-6" role="img">
      <BlogImage
        src={src}
        alt={caption || '블로그 포스트 이미지'}
        fill
        className="rounded-lg object-contain"
        loading="lazy"
        containerClassName="relative w-full [aspect-ratio:16/9] min-h-[250px]"
        showLoadingSpinner={true}
      />
      {caption && (
        <figcaption
          className="mt-2 text-center text-sm text-foreground/70 dark:text-foreground/80"
          id={`image-caption-${block.id}`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CalloutBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'callout') return null;
  const { callout } = block;
  const emoji = callout.icon?.type === 'emoji' ? callout.icon.emoji : '💡';

  // 자식 블록들 가져오기
  const children = (block as any).callout?.children || [];

  return (
    <aside
      className="my-4 flex gap-3 rounded-lg border bg-secondary/50 p-4 text-foreground/90 dark:text-foreground/95"
      role="note"
      aria-label="중요 정보 알림"
    >
      <span className="text-2xl" role="img" aria-label="알림 아이콘">
        {emoji}
      </span>
      <div className="flex-1">
        {renderRichText(callout.rich_text)}
        {children.length > 0 && (
          <div className="mt-2">
            <NotionBlocks blocks={children} />
          </div>
        )}
      </div>
    </aside>
  );
}

function ToggleBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'toggle') return null;
  const { toggle } = block;

  // 자식 블록들 가져오기
  const children = (block as any).toggle?.children || [];

  return (
    <details className="my-4 rounded-lg border p-4" role="group" aria-label="접을 수 있는 콘텐츠">
      <summary
        className="cursor-pointer rounded font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        role="button"
        aria-expanded="false"
      >
        {renderRichText(toggle.rich_text)}
      </summary>
      <div
        className="ml-4 mt-2 text-foreground/80 dark:text-foreground/85"
        role="region"
        aria-label="토글 내용"
      >
        {children.length > 0 ? (
          <NotionBlocks blocks={children} />
        ) : (
          <p className="text-muted-foreground">빈 토글</p>
        )}
      </div>
    </details>
  );
}

function ColumnListBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'column_list') return null;

  // 자식 블록들(columns) 가져오기
  const columns = (block as any).column_list?.children || [];

  return (
    <div className="my-4" role="region" aria-label="컬럼 레이아웃">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((column: any, index: number) => (
          <div key={column.id || index} className="rounded-lg border p-4">
            {column.column?.children && column.column.children.length > 0 ? (
              <NotionBlocks blocks={column.column.children} />
            ) : (
              <p className="text-sm text-muted-foreground">빈 컬럼</p>
            )}
          </div>
        ))}
      </div>
      {columns.length === 0 && (
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>📊</span>
            <span>Column Layout (빈 컬럼)</span>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { Fragment, useState } from 'react';
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type NotionBlock = BlockObjectResponse;

// 지원되는 블록 타입 목록
const SUPPORTED_BLOCK_TYPES = [
  'paragraph',
  'heading_1',
  'heading_2',
  'heading_3',
  'quote',
  'code',
  'image',
  'divider',
  'callout',
  'toggle',
  'column_list',
  'table',
  'table_row',
  'numbered_list_item',
  'bulleted_list_item',
] as const;

interface NotionBlocksProps {
  blocks: NotionBlock[];
}

// 향상된 이미지 컴포넌트
interface EnhancedImageProps {
  src: string;
  originalSrc: string;
  alt: string;
  caption: string;
  blockId: string;
}

function EnhancedImage({ src, originalSrc, alt, blockId }: EnhancedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(
    null
  );
  const [useDirectUrl, setUseDirectUrl] = useState(false);

  // GIF 파일 감지
  const isGif = originalSrc.toLowerCase().includes('.gif') || src.toLowerCase().includes('.gif');

  // GIF의 경우 직접 URL 사용, 일반 이미지는 프록시 사용
  const imageUrl = isGif && !useDirectUrl ? originalSrc : src;

  const handleImageError = () => {
    // GIF이고 첫 번째 시도라면 직접 URL로 재시도
    if (isGif && !useDirectUrl && retryCount === 0) {
      setUseDirectUrl(true);
      setRetryCount(1);
      setIsLoading(true);
      return;
    }

    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
    setIsLoading(false);
    setImageError(false);
  };

  const handleRetry = () => {
    if (retryCount < 3) {
      setImageError(false);
      setIsLoading(true);
      setRetryCount((prev) => prev + 1);

      // GIF의 경우 직접 URL과 프록시 URL을 번갈아 시도
      if (isGif) {
        setUseDirectUrl(!useDirectUrl);
      }
    }
  };

  // 이미지 비율 계산
  const getImageContainerStyle = () => {
    if (!imageDimensions) {
      return 'relative w-full min-h-[200px] max-h-[600px]';
    }

    const { width, height } = imageDimensions;
    const aspectRatio = width / height;

    // 세로형 이미지 (비율 < 0.8)
    if (aspectRatio < 0.8) {
      return 'relative w-full max-w-md mx-auto';
    }
    // 정사각형에 가까운 이미지 (0.8 <= 비율 <= 1.2)
    else if (aspectRatio <= 1.2) {
      return 'relative w-full max-w-lg mx-auto';
    }
    // 가로형 이미지 (비율 > 1.2)
    else {
      return 'relative w-full max-w-4xl mx-auto';
    }
  };

  if (imageError) {
    return (
      <div className="relative flex min-h-[250px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-secondary/50">
        <div className="p-6 text-center">
          <div className="mb-2 text-4xl">🖼️</div>
          <p className="mb-3 text-sm text-muted-foreground">이미지를 불러올 수 없습니다</p>
          <div className="space-y-2">
            {retryCount < 3 && (
              <button
                onClick={handleRetry}
                className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
              >
                다시 시도 ({retryCount + 1}/4)
              </button>
            )}
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                원본 URL 보기
              </summary>
              <p className="mt-1 break-all text-muted-foreground/70">{originalSrc}</p>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={getImageContainerStyle()}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex min-h-[200px] items-center justify-center rounded-lg bg-secondary/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">이미지 로딩 중...</p>
          </div>
        </div>
      )}
      <img
        id={`img-${blockId}`}
        src={imageUrl}
        alt={alt}
        className="h-auto w-full rounded-lg shadow-sm"
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          maxHeight: '600px',
          objectFit: 'contain',
        }}
        // GIF의 경우 추가 속성
        {...(isGif && {
          crossOrigin: 'anonymous',
          referrerPolicy: 'no-referrer',
        })}
      />
    </div>
  );
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
      className="mb-4 ml-4 list-outside list-decimal space-y-3 text-base leading-relaxed text-foreground/90 dark:text-foreground/95 lg:text-lg lg:leading-loose"
      role="list"
    >
      {items.map((block) => {
        if (block.type !== 'numbered_list_item') return null;
        const { numbered_list_item } = block;

        // 자식 블록들 가져오기
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children = (block as any).numbered_list_item?.children || [];

        return (
          <li key={block.id} className="pl-2" role="listitem">
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
      className="mb-4 ml-4 list-outside list-disc space-y-3 text-base leading-relaxed text-foreground/90 dark:text-foreground/95 lg:text-lg lg:leading-loose"
      role="list"
    >
      {items.map((block) => {
        if (block.type !== 'bulleted_list_item') return null;
        const { bulleted_list_item } = block;

        // 자식 블록들 가져오기
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children = (block as any).bulleted_list_item?.children || [];

        return (
          <li key={block.id} className="pl-2" role="listitem">
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
    case 'table':
      return <TableBlock block={block} />;
    case 'table_row':
      return <TableRowBlock block={block} />;
    // 리스트 항목들은 그룹화되어 처리되므로 여기서는 null 반환
    case 'numbered_list_item':
    case 'bulleted_list_item':
      return null;
    default:
      // 지원하지 않는 블록 타입에 대한 fallback 처리
      return <UnsupportedBlock block={block} />;
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
    <p className="mb-4 text-base leading-relaxed text-foreground/90 dark:text-foreground/95 lg:text-lg lg:leading-loose">
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
      className="mb-2 mt-6 text-2xl font-semibold text-foreground"
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
      className="mb-1 mt-4 text-xl font-semibold text-foreground"
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

  // 자식 블록들 가져오기
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = (block as any).quote?.children || [];

  return (
    <blockquote
      className="my-4 border-l-4 border-primary pl-4 italic text-foreground/80 dark:text-foreground/85"
      role="blockquote"
      cite=""
    >
      <div className="space-y-2">
        {quote.rich_text.length > 0 && <div>{renderRichText(quote.rich_text)}</div>}
        {children.length > 0 && (
          <div className="ml-0">
            <NotionBlocks blocks={children} />
          </div>
        )}
      </div>
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

  const originalSrc = image.type === 'external' ? image.external.url : image.file.url;
  const caption = image.caption.length ? image.caption[0].plain_text : '';

  // 프록시 URL 생성 (Notion 이미지인 경우)
  const isNotionImage =
    originalSrc.includes('notion.so') || originalSrc.includes('s3.us-west-2.amazonaws.com');
  const src = isNotionImage
    ? `/api/image-proxy?url=${encodeURIComponent(originalSrc)}`
    : originalSrc;

  return (
    <figure className="my-6" role="img">
      <EnhancedImage
        src={src}
        originalSrc={originalSrc}
        alt={caption || '블로그 포스트 이미지'}
        caption={caption}
        blockId={block.id}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = (block as any).column_list?.children || [];

  // 컬럼이 2개인 경우 (텍스트 + 이미지 레이아웃)
  if (columns.length === 2) {
    return (
      <div className="my-6" role="region" aria-label="컬럼 레이아웃">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {columns.map((column: NotionBlock, index: number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const hasImage = (column as any).column?.children?.some(
              (child: NotionBlock) => child.type === 'image'
            );

            return (
              <div
                key={column.id || index}
                className={`${
                  hasImage
                    ? 'flex items-center justify-center' // 이미지 컬럼: 중앙 정렬
                    : 'flex flex-col space-y-4' // 텍스트 컬럼: 세로 중앙 정렬
                }`}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(column as any).column?.children && (column as any).column.children.length > 0 ? (
                  <div className={hasImage ? 'w-full' : 'w-full max-w-none'}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <NotionBlocks blocks={(column as any).column.children} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">빈 컬럼</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3개 이상의 컬럼인 경우 (기존 그리드 레이아웃)
  return (
    <div className="my-4" role="region" aria-label="컬럼 레이아웃">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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

// Table 블록 컴포넌트
function TableBlock({ block }: { block: NotionBlock }) {
  if (block.type !== 'table') return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = (block as any).table?.children || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableWidth = (block as any).table?.table_width || 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasColumnHeader = (block as any).table?.has_column_header || false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasRowHeader = (block as any).table?.has_row_header || false;

  if (children.length === 0) {
    return (
      <div className="my-4 rounded-lg border border-dashed border-muted-foreground/30 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>📊</span>
          <span>빈 테이블</span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto" role="region" aria-label="테이블">
      <table className="w-full border-collapse rounded-lg border border-border">
        <tbody>
          {children.map((row: NotionBlock, rowIndex: number) => (
            <TableRowBlock
              key={row.id || rowIndex}
              block={row}
              isHeader={hasColumnHeader && rowIndex === 0}
              isRowHeader={hasRowHeader}
              columnIndex={0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table Row 블록 컴포넌트
function TableRowBlock({
  block,
  isHeader = false,
  isRowHeader = false,
}: {
  block: NotionBlock;
  isHeader?: boolean;
  isRowHeader?: boolean;
  columnIndex?: number;
}) {
  if (block.type !== 'table_row') return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cells = (block as any).table_row?.cells || [];

  return (
    <tr className="border-b border-border last:border-b-0">
      {cells.map((cell: any[], cellIndex: number) => {
        const isFirstColumn = cellIndex === 0;
        const shouldBeHeader = isHeader || (isRowHeader && isFirstColumn);
        const CellComponent = shouldBeHeader ? 'th' : 'td';

        return (
          <CellComponent
            key={cellIndex}
            className={`border-r border-border px-3 py-2 text-left last:border-r-0 ${
              shouldBeHeader
                ? 'bg-secondary/50 font-semibold text-foreground'
                : 'text-foreground/90 dark:text-foreground/95'
            }`}
            {...(shouldBeHeader && {
              scope: isFirstColumn ? 'row' : 'col',
              role: 'columnheader',
            })}
          >
            {cell && cell.length > 0 ? (
              <div className="text-sm leading-relaxed">{renderRichText(cell)}</div>
            ) : (
              <div className="text-sm text-muted-foreground">-</div>
            )}
          </CellComponent>
        );
      })}
    </tr>
  );
}

// 지원하지 않는 블록 타입에 대한 fallback 컴포넌트
function UnsupportedBlock({ block }: { block: NotionBlock }) {
  const { type } = block;

  // 개발 환경에서 콘솔에 경고 출력
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Notion Blocks] 지원하지 않는 블록 타입: ${type}`, block);
  }

  return (
    <div className="my-4 rounded-lg border border-dashed border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-600 dark:bg-yellow-900/20">
      <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
        <span>⚠️</span>
        <span>
          지원하지 않는 블록 타입:{' '}
          <code className="rounded bg-yellow-200 px-1 py-0.5 text-xs text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100">
            {type}
          </code>
        </span>
      </div>
      <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">
        <p>현재 지원되는 블록 타입: {SUPPORTED_BLOCK_TYPES.join(', ')}</p>
        <p className="mt-1">
          이 블록 타입을 지원하려면{' '}
          <code className="rounded bg-yellow-200 px-1 py-0.5 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100">
            lib/notion/blocks.tsx
          </code>
          에서 해당 케이스를 추가해주세요.
        </p>
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-yellow-700 hover:text-yellow-800 dark:text-yellow-300 dark:hover:text-yellow-200">
          블록 데이터 보기 (개발자용)
        </summary>
        <pre className="mt-1 max-h-32 overflow-auto rounded bg-yellow-100 p-2 text-xs text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-100">
          {JSON.stringify(block, null, 2)}
        </pre>
      </details>
    </div>
  );
}

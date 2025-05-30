import React, { Fragment } from "react";
import type { 
  BlockObjectResponse,
  RichTextItemResponse 
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type NotionBlock = BlockObjectResponse;

interface NotionBlocksProps {
  blocks: NotionBlock[];
}

export function NotionBlocks({ blocks }: NotionBlocksProps) {
  return (
    <>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </>
  );
}

function NotionBlock({ block }: { block: NotionBlock }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "heading_1":
      return <Heading1Block block={block} />;
    case "heading_2":
      return <Heading2Block block={block} />;
    case "heading_3":
      return <Heading3Block block={block} />;
    case "bulleted_list_item":
      return <BulletedListBlock block={block} />;
    case "numbered_list_item":
      return <NumberedListBlock block={block} />;
    case "quote":
      return <QuoteBlock block={block} />;
    case "code":
      return <CodeBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "divider":
      return <hr className="my-8 border-border" />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "toggle":
      return <ToggleBlock block={block} />;
    default:
      return null;
  }
}

// 텍스트 렌더링 헬퍼 함수
function renderRichText(richTexts: RichTextItemResponse[]) {
  return richTexts.map((text, index) => {
    const {
      annotations: { bold, italic, strikethrough, underline, code },
      text: { content, link },
    } = text;

    let element = <Fragment>{content}</Fragment>;

    if (bold) {
      element = <strong>{element}</strong>;
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
        <code className="px-1 py-0.5 rounded bg-secondary text-sm">
          {element}
        </code>
      );
    }
    if (link) {
      element = (
        <Link
          href={link.url}
          className="text-primary underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
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
  if (block.type !== "paragraph") return null;
  const { paragraph } = block;
  
  if (!paragraph.rich_text.length) {
    return <p className="mb-4">&nbsp;</p>;
  }

  return (
    <p className="mb-4 leading-relaxed">
      {renderRichText(paragraph.rich_text)}
    </p>
  );
}

function Heading1Block({ block }: { block: NotionBlock }) {
  if (block.type !== "heading_1") return null;
  const { heading_1 } = block;

  return (
    <h1 className="text-3xl font-bold mt-8 mb-4">
      {renderRichText(heading_1.rich_text)}
    </h1>
  );
}

function Heading2Block({ block }: { block: NotionBlock }) {
  if (block.type !== "heading_2") return null;
  const { heading_2 } = block;

  return (
    <h2 className="text-2xl font-semibold mt-6 mb-3">
      {renderRichText(heading_2.rich_text)}
    </h2>
  );
}

function Heading3Block({ block }: { block: NotionBlock }) {
  if (block.type !== "heading_3") return null;
  const { heading_3 } = block;

  return (
    <h3 className="text-xl font-semibold mt-4 mb-2">
      {renderRichText(heading_3.rich_text)}
    </h3>
  );
}

function BulletedListBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "bulleted_list_item") return null;
  const { bulleted_list_item } = block;

  return (
    <ul className="list-disc list-inside mb-2 ml-4">
      <li>{renderRichText(bulleted_list_item.rich_text)}</li>
    </ul>
  );
}

function NumberedListBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "numbered_list_item") return null;
  const { numbered_list_item } = block;

  return (
    <ol className="list-decimal list-inside mb-2 ml-4">
      <li>{renderRichText(numbered_list_item.rich_text)}</li>
    </ol>
  );
}

function QuoteBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "quote") return null;
  const { quote } = block;

  return (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
      {renderRichText(quote.rich_text)}
    </blockquote>
  );
}

function CodeBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "code") return null;
  const { code } = block;
  const language = code.language.toLowerCase();
  const codeString = code.rich_text.map((text) => text.plain_text).join("");

  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

function ImageBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "image") return null;
  const { image } = block;
  
  const src = image.type === "external" ? image.external.url : image.file.url;
  const caption = image.caption.length ? image.caption[0].plain_text : "";

  return (
    <figure className="my-6">
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={caption || "Image"}
          fill
          className="object-contain rounded-lg"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CalloutBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "callout") return null;
  const { callout } = block;
  const emoji = callout.icon?.type === "emoji" ? callout.icon.emoji : "💡";

  return (
    <div className="flex gap-3 p-4 my-4 rounded-lg bg-secondary/50 border">
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">{renderRichText(callout.rich_text)}</div>
    </div>
  );
}

function ToggleBlock({ block }: { block: NotionBlock }) {
  if (block.type !== "toggle") return null;
  const { toggle } = block;

  return (
    <details className="my-4 p-4 rounded-lg border">
      <summary className="cursor-pointer font-medium">
        {renderRichText(toggle.rich_text)}
      </summary>
      <div className="mt-2 ml-4">
        {/* 토글 내부의 자식 블록들은 별도로 가져와야 함 */}
        <p className="text-muted-foreground">
          [Toggle content - requires fetching children blocks]
        </p>
      </div>
    </details>
  );
}

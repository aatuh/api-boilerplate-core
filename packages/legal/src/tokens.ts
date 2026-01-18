import type { LegalBlock, LegalDoc } from "./types";

export type LegalTokens = Record<string, string>;

const tokenPattern = /\{\{([A-Z0-9_]+)\}\}/g;

function replaceTokens(value: string | undefined, tokens: LegalTokens): string | undefined {
  if (!value) return value;
  return value.replace(tokenPattern, (match, token) => tokens[token] ?? match);
}

function applyTokensToBlock(block: LegalBlock, tokens: LegalTokens): LegalBlock {
  if (block.type === "paragraph" || block.type === "note") {
    return {
      ...block,
      text: replaceTokens(block.text, tokens) ?? block.text,
    };
  }

  if (block.type === "list") {
    return {
      ...block,
      items: block.items.map((item) => replaceTokens(item, tokens) ?? item),
    };
  }

  if (block.type === "table") {
    return {
      ...block,
      headers: block.headers.map((header) => replaceTokens(header, tokens) ?? header),
      rows: block.rows.map((row) => row.map((cell) => replaceTokens(cell, tokens) ?? cell)),
      ...(block.caption !== undefined
        ? { caption: replaceTokens(block.caption, tokens) ?? block.caption }
        : {}),
    };
  }

  return block;
}

export function applyLegalTokens(doc: LegalDoc, tokens: LegalTokens): LegalDoc {
  return {
    ...doc,
    title: replaceTokens(doc.title, tokens) ?? doc.title,
    ...(doc.summary !== undefined
      ? { summary: replaceTokens(doc.summary, tokens) ?? doc.summary }
      : {}),
    ...(doc.eyebrow !== undefined
      ? { eyebrow: replaceTokens(doc.eyebrow, tokens) ?? doc.eyebrow }
      : {}),
    ...(doc.tocLabel !== undefined
      ? { tocLabel: replaceTokens(doc.tocLabel, tokens) ?? doc.tocLabel }
      : {}),
    ...(doc.updatedLabel !== undefined
      ? { updatedLabel: replaceTokens(doc.updatedLabel, tokens) ?? doc.updatedLabel }
      : {}),
    ...(doc.updatedAt !== undefined
      ? { updatedAt: replaceTokens(doc.updatedAt, tokens) ?? doc.updatedAt }
      : {}),
    sections: doc.sections.map((section) => ({
      ...section,
      title: replaceTokens(section.title, tokens) ?? section.title,
      blocks: section.blocks.map((block) => applyTokensToBlock(block, tokens)),
    })),
  };
}

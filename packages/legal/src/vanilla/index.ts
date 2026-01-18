import type { LegalSnippet, LegalTemplate } from "../types";
import { vanillaSnippetsEn, vanillaTemplatesEn } from "./en";
import { vanillaSnippetsFi, vanillaTemplatesFi } from "./fi";

const templatesByLocale: Record<string, Record<string, LegalTemplate>> = {
  en: vanillaTemplatesEn,
  fi: vanillaTemplatesFi,
};

const snippetsByLocale: Record<string, Record<string, LegalSnippet>> = {
  en: vanillaSnippetsEn,
  fi: vanillaSnippetsFi,
};

const DEFAULT_LOCALE = "en";
const defaultTemplates = templatesByLocale[DEFAULT_LOCALE] ?? {};
const defaultSnippets = snippetsByLocale[DEFAULT_LOCALE] ?? {};

function normalizeLocale(locale?: string | null): string {
  if (!locale) return DEFAULT_LOCALE;
  const normalized = locale.toLowerCase().split("-")[0];
  return normalized || DEFAULT_LOCALE;
}

export function getVanillaLegalTemplate(locale: string | null | undefined, slug: string): LegalTemplate | undefined {
  const normalized = normalizeLocale(locale);
  return templatesByLocale[normalized]?.[slug] ?? defaultTemplates[slug];
}

export function getVanillaLegalSnippets(locale: string | null | undefined): Record<string, LegalSnippet> {
  const normalized = normalizeLocale(locale);
  return snippetsByLocale[normalized] ?? defaultSnippets;
}

export function getVanillaLegalLocales() {
  return Object.keys(templatesByLocale);
}

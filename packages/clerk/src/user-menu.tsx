"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useResolvedTheme } from "@api-boilerplate-core/theme";
import type { ComponentProps } from "react";

type UserButtonAppearance = NonNullable<ComponentProps<typeof UserButton>["appearance"]>;
type UserButtonBaseTheme = UserButtonAppearance["baseTheme"];

export function UserMenu() {
  const resolvedTheme = useResolvedTheme();
  const baseTheme = resolvedTheme === "dark" ? (dark as UserButtonBaseTheme) : undefined;
  const appearance: UserButtonAppearance = {
    ...(baseTheme ? { baseTheme } : {}),
    variables: {
      colorBackground: "var(--surface)",
      colorInputBackground: "var(--surface-muted)",
      colorText: "var(--foreground)",
      colorPrimary: "var(--primary)",
      colorTextSecondary: "var(--muted)",
    },
    elements: {
      // Apply surfaces to nested popovers/modals.
      userButtonPopoverCard: "bg-surface text-foreground border border-border",
      userButtonPopoverFooter: "border-t border-border",
      userButtonTrigger: "bg-surface text-foreground border border-border",
      navbar: "bg-surface-muted",
      modalContent: "bg-surface text-foreground border border-border",
      modalCloseButton: "text-foreground hover:text-primary",
      card: "bg-surface text-foreground border border-border",
      formButtonPrimary: "bg-primary text-white hover:bg-primary-strong",
      userProfile: "bg-surface text-foreground",
      userProfilePage: "bg-surface text-foreground",
      userProfileNavbar: "bg-surface-muted text-foreground",
      userProfileSection: "bg-surface text-foreground",
      userProfileSectionPrimaryButton: "bg-primary text-white hover:bg-primary-strong",
      userProfileFooter: "border-t border-border",
    },
  };
  return (
    <UserButton
      key={resolvedTheme}
      appearance={appearance}
    />
  );
}

import type { ReactNode } from "react";
import { Card, SectionHeader, cx } from "@api-boilerplate-core/ui";
import { DashboardPage } from "./dashboard-page";
import { MarketingPage } from "./marketing-page";

export type SystemPageVariant = "marketing" | "dashboard";

type SystemPageProps = {
  variant?: SystemPageVariant;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
  className?: string;
  cardClassName?: string;
  bodyClassName?: string;
};

export function SystemPage({
  variant = "marketing",
  eyebrow,
  title,
  description,
  actions,
  backHref,
  backLabel,
  children,
  className,
  cardClassName,
  bodyClassName,
}: SystemPageProps) {
  const body = children ? <div className={cx("space-y-3", bodyClassName)}>{children}</div> : null;

  if (variant === "dashboard") {
    return (
      <DashboardPage
        title={title}
        {...(backHref !== undefined ? { backHref } : {})}
        {...(backLabel !== undefined ? { backLabel } : {})}
        {...(eyebrow !== undefined ? { eyebrow } : {})}
        {...(description !== undefined ? { description } : {})}
        {...(actions !== undefined ? { actions } : {})}
        {...(className !== undefined ? { className } : {})}
      >
        <Card className={cx("space-y-4", cardClassName)}>{body}</Card>
      </DashboardPage>
    );
  }

  return (
    <MarketingPage
      {...(className !== undefined ? { className } : {})}
      hero={
        <Card className={cx("space-y-6", cardClassName)}>
          <SectionHeader
            title={title}
            {...(eyebrow !== undefined ? { eyebrow } : {})}
            {...(description !== undefined ? { description } : {})}
            {...(actions !== undefined ? { actions } : {})}
          />
          {body}
        </Card>
      }
    />
  );
}

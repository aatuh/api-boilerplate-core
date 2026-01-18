import type { ReactNode } from "react";
import { Card, cx } from "@api-boilerplate-core/ui";
import { DashboardPage } from "./dashboard-page";

type InfoPageProps = {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  cardClassName?: string;
};

export function InfoPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  cardClassName,
}: InfoPageProps) {
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
      <Card padding="md" className={cx("space-y-3", cardClassName)}>
        {children}
      </Card>
    </DashboardPage>
  );
}

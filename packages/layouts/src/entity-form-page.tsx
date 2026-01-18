import type { ReactNode } from "react";
import { Card, cx } from "@api-boilerplate-core/ui";
import { DashboardPage } from "./dashboard-page";

type EntityFormPageProps = {
  backHref?: string;
  backLabel?: string;
  showBackNav?: boolean;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  cardClassName?: string;
};

export function EntityFormPage({
  backHref,
  backLabel,
  showBackNav,
  eyebrow,
  title,
  description,
  actions,
  children,
  footer,
  className,
  cardClassName,
}: EntityFormPageProps) {
  return (
    <DashboardPage
      title={title}
      {...(backHref !== undefined ? { backHref } : {})}
      {...(backLabel !== undefined ? { backLabel } : {})}
      {...(showBackNav !== undefined ? { showBackNav } : {})}
      {...(eyebrow !== undefined ? { eyebrow } : {})}
      {...(description !== undefined ? { description } : {})}
      {...(actions !== undefined ? { actions } : {})}
      {...(className !== undefined ? { className } : {})}
    >
      <Card padding="md" className={cx("space-y-6", cardClassName)}>
        {children}
        {footer ? <div className="flex flex-wrap items-center gap-3">{footer}</div> : null}
      </Card>
    </DashboardPage>
  );
}

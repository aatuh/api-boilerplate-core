import type { ReactNode } from "react";
import { Card, cx } from "@api-boilerplate-core/ui";
import { DashboardPage } from "./dashboard-page";
import { DetailGrid, type DetailItem } from "./detail-grid";

type EntityDetailPageProps = {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  fields?: DetailItem[];
  children?: ReactNode;
  className?: string;
  cardClassName?: string;
};

export function EntityDetailPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  actions,
  fields = [],
  children,
  className,
  cardClassName,
}: EntityDetailPageProps) {
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
      {fields.length > 0 ? (
        <Card padding="md" className={cx("space-y-4", cardClassName)}>
          <DetailGrid items={fields} />
        </Card>
      ) : null}
      {children}
    </DashboardPage>
  );
}

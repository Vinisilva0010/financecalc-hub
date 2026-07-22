"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Calculator } from "lucide-react";

interface ToolLink {
  key: string;
  href: string;
}

interface RelatedToolsProps {
  tools: ToolLink[];
  currentToolKey: string;
}

export default function RelatedTools({ tools, currentToolKey }: RelatedToolsProps) {
  const t = useTranslations();

  const filteredTools = tools.filter((tool) => tool.key !== currentToolKey);

  if (filteredTools.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black uppercase tracking-tight text-black">
        {t("common.relatedTools")}
      </h3>

      <div className="grid gap-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.key}
            href={tool.href}
            className="group flex items-center gap-3 border-[4px] border-black bg-white p-4 shadow-[4px_4px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-yellow-50 hover:shadow-[6px_6px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#000]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-[3px] border-black bg-white group-hover:bg-yellow-300">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="text-sm font-black uppercase tracking-tight text-black">
              {t(`tools.${tool.key}`)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
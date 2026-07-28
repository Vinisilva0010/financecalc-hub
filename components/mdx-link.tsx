import { Link } from "@/lib/i18n/routing";
import type { ComponentPropsWithoutRef } from "react";

type MdxLinkProps = ComponentPropsWithoutRef<"a">;

export function MdxLink({ href = "", children, ...props }: MdxLinkProps) {
  // Link interno (rota do site) -> injeta o locale automaticamente
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // Âncora na mesma página (#secao) -> não mexe
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  // Link externo -> abre em nova aba, sem passar autoridade de SEO à toa
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

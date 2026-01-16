import { loadTemplate } from "@/actions/templates";
import Mail from "@/components/Mail";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/heading";
import { Link } from "@/i18n/navigation";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import { getTranslations } from "next-intl/server";
import { IoArrowBack } from "react-icons/io5";
import ActionDock from "@/components/Dock";


export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const gt = await getTranslations("global");
  const { id } = await params;
  const result = await loadTemplate(id);

  if (result.error || !result.template) {
    return (
      <div className="flex flex-col items-center p-4">
        <p>{result.error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start p-4 w-full max-w-3xl">
      <div className="flex flex-row items-center gap-2 mb-6">
        <Button
          variant={InputVariant.Neutral}
          buttonStyle="ghost"
          modifier="circle"
          tooltip={{
            content: gt("back"),
            placement: TooltipPosition.Right
          }}
          asChild
        >
          <Link href="/templates">
            <IoArrowBack className="size-6" />
          </Link>
        </Button>
        <H1>{result.template.name}</H1>
      </div>
      <Mail mail={result.template.content} templateId={id} />
      <ActionDock mode="edit" />
    </div>
  );
}
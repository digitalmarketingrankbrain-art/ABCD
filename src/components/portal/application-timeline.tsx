import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  APPLICATION_STAGE_ORDER,
  STAGE_LABEL,
  type ApplicationStage,
} from "@/lib/portal/applicant-data";

/**
 * Deliberately the same visual language as the public "How Accreditation
 * Works" stepper (Phase 6/homepage) — an applicant should recognise their
 * own journey against the process they were shown before applying (Phase 8).
 */
function ApplicationTimeline({ stage }: { stage: ApplicationStage }) {
  const isDeclined = stage === "DECLINED";
  const currentIndex = isDeclined
    ? APPLICATION_STAGE_ORDER.length - 1
    : APPLICATION_STAGE_ORDER.indexOf(stage);

  return (
    <ol className="flex flex-col gap-6 sm:flex-row sm:gap-2">
      {APPLICATION_STAGE_ORDER.map((s, i) => {
        const isComplete = i < currentIndex || (i === currentIndex && !isDeclined && stage === "ACCREDITED");
        const isCurrent = i === currentIndex && !isDeclined;
        return (
          <li key={s} className="flex flex-1 gap-3 sm:flex-col sm:gap-2">
            <div className="flex flex-col items-center sm:w-full">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                  isComplete && "bg-success-text text-text-inverse",
                  isCurrent && "bg-primary text-text-inverse",
                  !isComplete && !isCurrent && "border border-border bg-surface text-text-muted",
                )}
              >
                {isComplete ? <Check className="size-4" strokeWidth={2} /> : i + 1}
              </div>
              {i < APPLICATION_STAGE_ORDER.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 w-px flex-1 sm:mt-0 sm:h-px sm:w-full sm:flex-none sm:translate-y-3.5",
                    isComplete ? "bg-success-text" : "bg-border",
                  )}
                />
              )}
            </div>
            <p
              className={cn(
                "pb-2 font-sans text-xs sm:text-center",
                isCurrent ? "font-semibold text-text" : "text-text-muted",
              )}
            >
              {STAGE_LABEL[s]}
            </p>
          </li>
        );
      })}
      {isDeclined && (
        <li className="flex items-center gap-2 sm:flex-col">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-error-text font-mono text-xs text-text-inverse">
            !
          </div>
          <p className="font-sans text-xs font-semibold text-error-text">Declined</p>
        </li>
      )}
    </ol>
  );
}

export { ApplicationTimeline };

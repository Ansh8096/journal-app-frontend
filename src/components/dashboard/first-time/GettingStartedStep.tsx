import type { LucideIcon } from "lucide-react";

interface GettingStartedStepProps {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
    iconContainerClassName: string;
    iconClassName: string;
}

export default function GettingStartedStep({
    step,
    title,
    description,
    icon: Icon,
    iconContainerClassName,
    iconClassName,
}: GettingStartedStepProps) {
    return (
        <div
            className="
        group
        flex
        min-w-0
        flex-1
        flex-col
        items-center
        text-center
        rounded-2xl
        p-1
        transition-transform
        duration-300
        hover:-translate-y-1
    "
        >
            {/* Icon */}

            <div
                className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    ${iconContainerClassName}
                `}
            >
                <Icon
                    className={`
                        h-6
                        w-6
                        transition-transform
                        duration-300
                        ${iconClassName}
                    `}
                />
            </div>

            {/* Title — number and label combined on one line */}

            <h4
                className="
                    mt-2
                    w-full
                    whitespace-nowrap
                    overflow-hidden
                    text-ellipsis
                    text-xs
                    font-semibold
                "
            >
                {step}. {title}
            </h4>

            {/* Description — no max-w here; width is controlled by the
                parent's flex-1 share so all four steps wrap identically */}

            <p
                className="
                    mt-1
                    line-clamp-3
                    min-h-15
                    text-[11px]
                    leading-5
                    text-muted-foreground
                "
            >
                {description}
            </p>

        </div>
    );
}
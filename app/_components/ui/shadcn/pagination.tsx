import * as React from "react"
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal} from "lucide-react"

import { cn } from "@/app/_utils/cn"
import { ButtonProps, buttonVariants } from "@/app/_components/ui/shadcn/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  label,
  toStart,
  disabled,
  onClick,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {label?: string, toStart?: boolean, disabled?: boolean}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
        "cursor-pointer gap-1 px-2 min-w-8 h-8 hover:bg-border border border-border",
        {
          "cursor-not-allowed opacity-70 hover:bg-background hover:text-primary": disabled,
        },
        className
    )
    }
    onClick={disabled ? () => {} : onClick}
    {...props}
  >
    {toStart ? <ChevronsLeft /> : <ChevronLeft className="h-4 w-4"/>}
    {label && <span>{label}</span>}
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  label,
  toEnd,
  disabled,
  onClick,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {label?: string, toEnd?: boolean, disabled?: boolean}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
        "cursor-pointer gap-1 px-2 min-w-8 h-8 hover:bg-border border border-border",
                {
                  "cursor-not-allowed opacity-70 hover:bg-background hover:text-primary": disabled,
                },
                className
                )
    }
    onClick={disabled ? () => {} : onClick}
    {...props}
  >
    {label && <span>{label}</span>}
    {toEnd ? <ChevronsRight /> : <ChevronRight className="h-4 w-4" />}
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

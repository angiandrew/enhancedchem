"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, id, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false)

    React.useEffect(() => {
      setIsChecked(checked || false)
    }, [checked])

    const handleClick = () => {
      const newChecked = !isChecked
      setIsChecked(newChecked)
      if (onCheckedChange) {
        onCheckedChange(newChecked)
      }
    }

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          checked={isChecked}
          onChange={() => {}} // Controlled by handleClick
          className="sr-only"
          {...props}
        />
        <button
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          onClick={handleClick}
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded border-2 border-border bg-background transition-all cursor-pointer",
            isChecked && "bg-primary border-primary",
            className
          )}
        >
          {isChecked && (
            <Check className="h-4 w-4 text-primary-foreground" />
          )}
        </button>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

import styles from "./spinner.module.css"
import { cn } from "@/lib/utils/cn"


interface Props {
  className?: string
}

export function Spinner({ className, ...props }: Props) {
  return (
    <svg className={cn(styles.svg, className)} viewBox="0 0 100 100" {...props}>
      <title>Loading</title>
      <circle cx="50" cy="50" r="45" stroke="currentColor" />
    </svg>
  )
}

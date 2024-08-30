import { AvatarImage, Avatar as AvatarBase, AvatarFallback } from "@/components/ui/avatar"
import { twJoin } from "tailwind-merge";

interface IProps {
  width?: number;
  height?: number;
  src: string;
  fallback?: string;
}

export function Avatar(props: IProps) {
  const { width = 40, height = 40, src, fallback } = props;
  return (
    <AvatarBase className={twJoin(`w-[${width}px]`, `h-[${height}px]`)} >
      <AvatarImage width={100} height={100} src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarBase>
  )
}
// not my code look at readme.md
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[])
{
  return twMerge(clsx(inputs));
}

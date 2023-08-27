/** @format */

import {Skeleton} from '../../@/components/ui/skeleton'

export const Title = ({title, className}) => {
  return (
    <div className={`pagename ${className}`}>
      <p>{title}</p>
    </div>
  )
}

export const SkeletonAdapted = () => {
  return (
    <div className="p-2 rounded flex items-center space-x-4 ">
      <Skeleton className="h-12 w-12 rounded-full bg-neutral-700 " />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-red-500 rounded" />
        <Skeleton className="h-4 w-[200px] bg-red-400 rounded" />
      </div>
    </div>
  )
}

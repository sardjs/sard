import {
  CSSProperties,
  forwardRef,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface SwiperItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export type SwiperItem = ForwardRefExoticComponent<
  SwiperItemProps & RefAttributes<HTMLDivElement>
>

export type SwiperItemFC = ForwardRefExoticComponent<
  PropsWithoutRef<SwiperItemProps> & RefAttributes<HTMLDivElement>
>

export const SwiperItem: SwiperItemFC = forwardRef((props, ref) => {
  const { className, children, ...restProps } = props

  const swiperItemClass = classNames('s-swiper-item', className)

  return (
    <div {...restProps} className={swiperItemClass} ref={ref}>
      {children}
    </div>
  )
})

export default SwiperItem

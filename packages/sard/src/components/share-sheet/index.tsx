import { ReactNode, CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { useEvent } from '../../use'
import { Popup, PopupProps } from '../popup'
import { ShareSheetItem, ShareSheetItemProps } from './Item'
import { CommonComponentProps } from '../../utils/types'

export * from './Item'

export type ShareSheetItemList = ShareSheetItemProps[] | ShareSheetItemProps[][]

export interface ShareSheetProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  maskClosable?: boolean
  title?: ReactNode
  description?: ReactNode
  itemList?: ShareSheetItemList
  cancel?: ReactNode
  onSelect?: (itemProps: ShareSheetItemProps, index: number) => any
  onCancel?: () => any
  visible?: boolean
  popupProps?: PopupProps
}

export interface ShareSheetFC extends FC<ShareSheetProps> {
  Item: typeof ShareSheetItem
}

export const ShareSheet: ShareSheetFC = ((props) => {
  const {
    className,
    children,
    visible,
    maskClosable = true,
    title,
    description,
    itemList = [],
    cancel,
    onSelect,
    onCancel,
    popupProps = {},
    ...restProps
  } = props

  const { placement = 'bottom', ...restPopupProps } = popupProps

  const handleItemClick = useEvent(
    (itemProps: ShareSheetItemProps, index: number) => {
      onSelect?.(itemProps, index)
    },
  )

  const handleMaskClick = useEvent(() => {
    if (maskClosable) {
      onCancel?.()
    }
  })

  const handleCancelClick = useEvent(() => {
    onCancel?.()
  })

  const shareSheetClass = classNames(
    's-share-sheet',
    {
      's-share-sheet-headless': !title && !description,
    },
    className,
  )

  const row = (list: ShareSheetItemProps[], index?: number) => {
    return (
      <div className="s-share-sheet-row" key={index}>
        {list.map((ItemProps, index) => (
          <ShareSheetItem
            {...ItemProps}
            key={index}
            onClick={() => handleItemClick(ItemProps, index)}
          />
        ))}
      </div>
    )
  }

  return (
    <Popup
      {...restPopupProps}
      visible={visible}
      placement={placement}
      onMaskClick={handleMaskClick}
    >
      <div {...restProps} className={shareSheetClass}>
        {(title || description) && (
          <div className="s-share-sheet-header">
            {title && <div className="s-share-sheet-title">{title}</div>}
            {description && (
              <div className="s-share-sheet-description">{description}</div>
            )}
          </div>
        )}
        <div className="s-share-sheet-body">
          {children ||
            (itemList.length && Array.isArray(itemList[0])
              ? (itemList as ShareSheetItemProps[][]).map((list, index) =>
                  row(list, index),
                )
              : row(itemList as ShareSheetItemProps[]))}
        </div>
        {cancel && (
          <>
            <div className="s-share-sheet-gap"></div>
            <div className="s-share-sheet-cancel" onClick={handleCancelClick}>
              {cancel}
            </div>
          </>
        )}
      </div>
    </Popup>
  )
}) as ShareSheetFC

ShareSheet.Item = ShareSheetItem

export default ShareSheet

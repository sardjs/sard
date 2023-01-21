import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { useEvent } from '../../use'
import { Popup, PopupProps } from '../popup'
import { CommonComponentProps } from '../../utils/types'
import { ActionSheetItem, ActionSheetItemProps } from './Item'

export * from './Item'

export interface ActionSheetProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  maskClosable?: boolean
  title?: ReactNode
  description?: ReactNode
  itemList?: ActionSheetItemProps[]
  itemColor?: string
  cancel?: ReactNode
  onSelect?: (itemProps: ActionSheetItemProps, index: number) => any
  onCancel?: () => any
  visible?: boolean
  popupProps?: PopupProps
}

export interface ActionSheetFC extends FC<ActionSheetProps> {
  Item: typeof ActionSheetItem
}

export const ActionSheet: ActionSheetFC = (props) => {
  const {
    className,
    children,
    maskClosable = true,
    title,
    description,
    itemList = [],
    itemColor,
    cancel,
    onSelect,
    onCancel,
    visible,
    popupProps = {},
    ...restProps
  } = props

  const { placement = 'bottom', ...restPopupProps } = popupProps

  const handleItemClick = useEvent(
    (itemProps: ActionSheetItemProps, index: number) => {
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

  const actionSheetClass = classNames(
    's-action-sheet',
    {
      's-action-sheet-headless': !title && !description,
    },
    className,
  )

  return (
    <Popup
      {...restPopupProps}
      visible={visible}
      placement={placement}
      onMaskClick={handleMaskClick}
    >
      <div {...restProps} className={actionSheetClass}>
        {(title || description) && (
          <div className="s-action-sheet-header">
            {title && <div className="s-action-sheet-title">{title}</div>}
            {description && (
              <div className="s-action-sheet-description">{description}</div>
            )}
          </div>
        )}
        <div className="s-action-sheet-body">
          {children ||
            itemList.map((itemProps, index) => (
              <ActionSheetItem
                {...itemProps}
                key={index}
                onClick={() => handleItemClick(itemProps, index)}
              />
            ))}
        </div>
        {cancel && (
          <>
            <div className="s-action-sheet-gap"></div>
            <div className="s-action-sheet-cancel" onClick={handleCancelClick}>
              {cancel}
            </div>
          </>
        )}
      </div>
    </Popup>
  )
}

ActionSheet.Item = ActionSheetItem

export default ActionSheet

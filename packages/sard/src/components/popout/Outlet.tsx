import { useContext, ReactNode, FC } from 'react'
import { CommonComponentProps } from '../../utils/types'
import { PopoutChangeArgsContext } from './index'

export interface PopoutOutletProps extends CommonComponentProps {
  format?: (...args: any[]) => ReactNode
}

export const PopoutOutlet: FC<PopoutOutletProps> = (props) => {
  const { format } = props

  const changeArgs = useContext(PopoutChangeArgsContext)

  return (
    <>
      {changeArgs[0] != null
        ? format
          ? format(...changeArgs)
          : changeArgs[0]
        : null}
    </>
  )
}

export default PopoutOutlet

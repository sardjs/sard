import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { CommonComponentProps } from '../../utils/types'
import {
  animate,
  getTransformOrigin,
  minmax,
  getDampingValue,
} from '../../utils'
import {
  DOUBLE_TAP,
  PINCH_START,
  PINCH_MOVE,
  PINCH_END,
  StrikePinchEvent,
  StrikeTapEvent,
} from '../../strike'
import {
  useEvent,
  useMergeStrike,
  useResize,
  useSelectorId,
  useStrike,
} from '../../use'
import { SwiperItem } from '../swiper'
import { useMovable, UseMovableOptions } from '../movable'
import { getBoundingClientRect } from '../../utils/dom'

export interface ImagePreviewItemProps extends CommonComponentProps {
  url: string
  doubletapScale?: number
  minScale?: number
  maxScale?: number
  onProcessing: (processing: boolean) => void
  swiperProcessing: boolean
  visible: boolean
}

enum CodeDirMap {
  'none',
  'horizontal',
  'vertical',
  'all',
}

export const ImagePreviewItem: FC<ImagePreviewItemProps> = (props) => {
  const {
    url,
    doubletapScale = 3,
    minScale = 1,
    maxScale = 7,
    onProcessing,
    swiperProcessing,
    visible,
  } = props

  const [previewScale, setPreviewScale] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [scale, setScale] = useState(1)

  const [transformOrigin, setTransformOrigin] = useState('')
  const stopDoubleTapScaleAnimate = useRef<(...args: any[]) => any>()

  const [direction, setDirection] =
    useState<UseMovableOptions['direction']>('all')

  const [movable, setMovable] = useState(false)

  const [viewportSize, setViewportSize] = useState(() => [
    window.innerWidth,
    window.innerHeight,
  ])
  useResize(() => {
    setViewportSize([window.innerWidth, window.innerHeight])
  }, 150)

  const [naturalSize, setNaturalSize] = useState([0, 0])
  const handleLoad = (event: any) => {
    setNaturalSize([event.target.naturalWidth, event.target.naturalHeight])
  }

  const [containWidth, containHeight] = useMemo(() => {
    const aspectRatio = naturalSize[0] / naturalSize[1] || 0
    const wider = aspectRatio > viewportSize[0] / viewportSize[1]
    const width = wider ? viewportSize[0] : aspectRatio * viewportSize[1]
    const height = !wider ? viewportSize[1] : viewportSize[0] / aspectRatio
    return [width, height]
  }, [naturalSize, viewportSize])

  const getNextPosition = (
    relativeScale: number,
    prevOffsetX: number,
    prevOffsetY: number,
    prevAbsoluteScale: number,
    prevX: number,
    prevY: number,
    correct = true,
  ): [number, number, UseMovableOptions['direction']] => {
    let nextX = 0
    let nextY = 0

    nextX = prevX + prevOffsetX - prevOffsetX * relativeScale
    nextY = prevY + prevOffsetY - prevOffsetY * relativeScale

    const nextWidth = relativeScale * (containWidth * prevAbsoluteScale)
    const nextHeight = relativeScale * (containHeight * prevAbsoluteScale)
    if (correct && nextWidth <= viewportSize[0]) {
      nextX = (viewportSize[0] - nextWidth) / 2
    } else {
      nextX = minmax(nextX, viewportSize[0] - nextWidth, 0)
    }
    if (correct && nextHeight <= viewportSize[1]) {
      nextY = (viewportSize[1] - nextHeight) / 2
    } else {
      nextY = minmax(nextY, viewportSize[1] - nextHeight, 0)
    }

    const dir = CodeDirMap[
      (nextWidth <= viewportSize[0] ? 0 : 1) +
        (nextHeight <= viewportSize[1] ? 0 : 2)
    ] as UseMovableOptions['direction']

    return [nextX, nextY, dir]
  }

  const setContainPosition = () => {
    const [x, y] = getContainPosition()
    setX(x)
    setY(y)
  }

  const getContainPosition = (): [number, number, undefined] => {
    return [
      (viewportSize[0] - containWidth) / 2,
      (viewportSize[1] - containHeight) / 2,
      undefined,
    ]
  }

  useLayoutEffect(() => {
    setContainPosition()
  }, [naturalSize])

  const [zooming, setZooming] = useState(false)
  const handleDoubleTap = useEvent((event: StrikeTapEvent) => {
    if (zooming) {
      return
    }
    setMovable(false)
    onProcessing(true)
    setZooming(true)

    const nextScale = scale === 1 ? doubletapScale : 1
    const nextPreviewScale = scale === 1 ? doubletapScale : 1 / scale

    getBoundingClientRect(scaleId, (rect) => {
      const offsetX = event.x - rect.left
      const offsetY = event.y - rect.top

      const [nextX, nextY, dir] =
        nextScale === 1
          ? getContainPosition()
          : getNextPosition(nextScale, offsetX, offsetY, 1, x, y)

      const currWidth = containWidth * scale
      const currHeight = containHeight * scale
      const nextWidth = currWidth * nextPreviewScale
      const nextHeight = currHeight * nextPreviewScale
      const origin = getTransformOrigin(
        {
          x,
          y,
          width: currWidth,
          height: currHeight,
        },
        { x: nextX, y: nextY, width: nextWidth, height: nextHeight },
      )

      setTransformOrigin(origin.map((n) => n + 'px').join(' '))

      stopDoubleTapScaleAnimate.current = animate({
        from: 1,
        to: nextPreviewScale,
        duration: 200,
        step(value) {
          setPreviewScale(value)
        },
        finish() {
          setPreviewScale(1)
          setX(nextX)
          setY(nextY)
          setDirection(dir)
          setScale(nextScale)
          if (nextScale === 1) {
            onProcessing(false)
          }
          if (nextScale > 1) {
            setMovable(true)
          }
          setZooming(false)
        },
      })
    })
  })

  const [pinching, setPinching] = useState(false)
  const pinchStartOffsetX = useRef(0)
  const pinchStartOffsetY = useRef(0)
  const immediatePreviewScale = useRef(0)

  const handlePinchStart = useEvent((event: StrikePinchEvent) => {
    setPinching(true)
    setMovable(false)
    onProcessing(true)

    getBoundingClientRect(scaleId, (rect) => {
      const offsetX = event.x - rect.left
      const offsetY = event.y - rect.top

      pinchStartOffsetX.current = offsetX
      pinchStartOffsetY.current = offsetY

      setTransformOrigin(`${offsetX}px ${offsetY}px`)
    })
  })

  const handlePinchMove = useEvent((event: StrikePinchEvent) => {
    setPreviewScale(
      (immediatePreviewScale.current = getDampingValue(
        event.scale,
        minScale / scale,
        maxScale / scale,
        0.2,
      )),
    )
  })

  const stopReboundAnimate = useRef<(...args: any[]) => any>()
  const handlePinchEnd = useEvent((event: StrikePinchEvent) => {
    const offsetX = pinchStartOffsetX.current
    const offsetY = pinchStartOffsetY.current
    const prevScale = scale
    const prevX = x
    const prevY = y

    const nextPreviewScale = minmax(
      event.scale,
      minScale / scale,
      maxScale / scale,
    )

    const nextScale = nextPreviewScale * scale

    const handleFinish = () => {
      setPreviewScale(1)
      const [nextX, nextY, dir] = getNextPosition(
        immediatePreviewScale.current,
        offsetX,
        offsetY,
        prevScale,
        prevX,
        prevY,
      )
      setX(nextX)
      setY(nextY)
      setDirection(dir)
      setScale(nextScale)
      if (nextScale === 1) {
        onProcessing(false)
      }
      if (nextScale > 1) {
        setMovable(true)
      }

      setPinching(false)
    }

    if (immediatePreviewScale.current !== nextPreviewScale) {
      stopReboundAnimate.current = animate({
        from: immediatePreviewScale.current,
        to: nextPreviewScale,
        duration: 200,
        step(value) {
          setPreviewScale(value)
        },
        finish() {
          immediatePreviewScale.current = nextPreviewScale
          handleFinish()
        },
      })
    } else {
      handleFinish()
    }
  })

  const scaleTapBinding = useStrike(
    (strike) => {
      strike.on(DOUBLE_TAP, handleDoubleTap)
    },
    {
      tap: true,
    },
    !swiperProcessing && !pinching,
  )

  const scaleId = useSelectorId()

  const scalePinchBinding = useStrike(
    (strike) => {
      strike.on(PINCH_START, handlePinchStart)
      strike.on(PINCH_MOVE, handlePinchMove)
      strike.on(PINCH_END, handlePinchEnd)
    },
    {
      pinch: true,
    },
    !swiperProcessing && !zooming,
  )

  const {
    updateRect,
    willChange,
    binding: movableBinding,
  } = useMovable(
    {
      x: 0,
      y: 0,
      width: viewportSize[0],
      height: viewportSize[1],
    },
    {
      x,
      y,
      inertia: true,
      outOfBounds: true,
      touchable: !swiperProcessing && !zooming && !pinching && movable,
      direction,
      onChange(x, y) {
        setX(x)
        setY(y)
      },
    },
  )

  const scaleBinding = useMergeStrike([
    scaleTapBinding,
    scalePinchBinding,
    movableBinding,
  ])

  useEffect(() => {
    updateRect({
      x,
      y,
      width: containWidth * scale,
      height: containHeight * scale,
    })
  }, [scale, containWidth, containHeight])

  useEffect(() => {
    if (!visible) {
      stopDoubleTapScaleAnimate.current?.()
      setTransformOrigin('')
      setScale(1)
      setMovable(false)
      setZooming(false)
      onProcessing(false)
      setContainPosition()
    }
  }, [visible])

  useEffect(
    () => () => {
      stopDoubleTapScaleAnimate.current?.()
      stopReboundAnimate.current?.()
    },
    [],
  )

  const scaleStyle = {
    width: containWidth * scale,
    height: containHeight * scale,
    transform: `translate3d(${x}px, ${y}px, 0) scale(${previewScale})`,
    transformOrigin: transformOrigin,
    willChange,
  }

  return (
    <SwiperItem className="s-image-preview-item">
      <div
        className="s-image-preview-scale"
        {...scaleBinding}
        style={scaleStyle}
        id={scaleId}
      >
        <img className="s-image-preview-img" src={url} onLoad={handleLoad} />
      </div>
    </SwiperItem>
  )
}

export default ImagePreviewItem

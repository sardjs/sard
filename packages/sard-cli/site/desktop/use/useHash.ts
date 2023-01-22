import { useCallback, useEffect } from 'react'

export function useHash(selector: string) {
  const handler = useCallback(
    (event: Event) => {
      event.preventDefault()

      const element = event.target as HTMLElement

      if (element.matches(selector)) {
        const targetSelector =
          element.getAttribute('href') || element.dataset.href
        if (targetSelector) {
          const el = document.querySelector(targetSelector)
          if (el) {
            window.scrollBy({
              top: el.getBoundingClientRect().top - 60 - 10,
              behavior: 'smooth',
            })
          }
        }
      }
    },
    [selector],
  )

  useEffect(() => {
    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [handler])
}

export default useHash

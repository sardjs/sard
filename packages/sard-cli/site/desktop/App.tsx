import { RouterProvider } from 'react-router-dom'
import router from './router'
import useHash from './use/useHash'

router.subscribe(() => {
  window.scrollTo(0, 0)
})

function App() {
  useHash(`.doc-anchor, .doc-catalog-link`)

  return <RouterProvider router={router} />
}

export default App

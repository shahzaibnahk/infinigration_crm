
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { authRoutes } from "./routes/auth"
import { routes } from "./routes/marketing"
import Sidebar from "./components/Sidebar"
import { marketingRoutes } from "./routes/sidebar"
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

const App = () => {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      <Router>
        <Routes>
          {authRoutes.map((r, index) => <Route key={index} path={r.path} element={<r.element />} />)}
          {routes.map((r, index) => <Route key={index} path={r.path} element={<Sidebar component={r.element} routes={marketingRoutes} pageTitle={r.title} />} />)}



        </Routes>
      </Router>
    </ReactLenis>
  )
}

export default App

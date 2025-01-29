
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { authRoutes } from "./routes/auth"
import { routes } from "./routes/marketing"
import Sidebar from "./components/Sidebar"
import { marketingRoutes, sOperationsRoutes, sSalesRoutes } from "./routes/sidebar"
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useAlert } from "./hooks/userAlert"
import { getMyAttendance, getMyLogs, getMyProfile } from "./redux/actions/user"
import toast, { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute"
import { redirectUser } from "./utils/redirects"
import Loading from "./pages/Loading"
import { salesRoutes } from "./routes/sales"
import moment from "moment-timezone"
import { operationRoutes } from "./routes/operation"

const App = () => {
  const { isAuthenticated, user, loading, message, error } = useSelector(state => state.user)
  const { loading: leadLoading } = useSelector(state => state.lead)
  const dispatch = useDispatch()
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })
  const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
  useEffect(() => {
    dispatch(getMyProfile())
    if (isAuthenticated) {
      dispatch(getMyAttendance(date))
      dispatch(getMyLogs(date))
    }
  }, [dispatch, isAuthenticated, date])

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })
    }
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }
  }, [message, error])

  console.log(import.meta.env.VITE_BACKEND_SERVER_URL)

  return (
    loading ? <Loading /> :
      <ReactLenis root>
        <Router>
          <Routes>
            {authRoutes.map((r, index) => <Route key={index} path={r.path} element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={redirectUser(isAuthenticated, user)}>
              <r.element />
            </ProtectedRoute>} />)}

            {routes.map((r, index) => <Route key={index} path={r.path} element={<ProtectedRoute isAuthenticated={isAuthenticated && user.role === "marketing"} redirect={"/"}>
              <Sidebar isAuthenticated={isAuthenticated} user={user} component={r.element} routes={marketingRoutes} pageTitle={r.title} />
            </ProtectedRoute>} />)}

            {salesRoutes.map((r, index) => <Route key={index} path={r.path} element={<ProtectedRoute isAuthenticated={isAuthenticated && user.role === "sales"} redirect={"/"}>
              <Sidebar isAuthenticated={isAuthenticated} user={user} component={r.element} routes={sSalesRoutes} pageTitle={r.title} />
            </ProtectedRoute>} />)}


            {operationRoutes.map((r, index) => <Route key={index} path={r.path} element={<ProtectedRoute isAuthenticated={isAuthenticated && user.role === "operations"} redirect={"/"}>
              <Sidebar isAuthenticated={isAuthenticated} user={user} component={r.element} routes={sOperationsRoutes} pageTitle={r.title} />
            </ProtectedRoute>} />)}

          </Routes>
        </Router>
        <Toaster />
      </ReactLenis>
  )
}

export default App

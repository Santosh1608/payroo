import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import { Header } from "./components/Header/Header";

// Import Higher order components
import AxiosInterceptor from "./hoc/AxiosInterceptor/AxiosInterceptor";

// Import Pages
import ViewAllHotels from "./pages/ViewAllHotels/ViewAllHotels";
import ViewAvailableHotels from "./pages/ViewAvailableHotels/ViewAvailableHotels";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import BookingHistory from "./pages/Booking_History/Booking_History";

// Import Private and Public Wrapper
import PrivateRouteWrapper from "./routes/PrivateRouteWrapper";
import PublicRouteWrapper from "./routes/PublicRouteWrapper";

// Import redux actions
import { get_current_user } from "./features/auth/authSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_current_user());
  }, []);

  return (
    <>
      <Router>
        <AxiosInterceptor>
          {user && <Header />}
          <Routes>
            {/* Private Routes */}
            <Route element={<PrivateRouteWrapper />}>
              <Route path="/" element={<ViewAllHotels />} />
              <Route
                path="/available_hotels/:searchDate"
                element={<ViewAvailableHotels />}
              />
              <Route path="/booking_history" element={<BookingHistory />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Public Routes */}
            <Route element={<PublicRouteWrapper />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AxiosInterceptor>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

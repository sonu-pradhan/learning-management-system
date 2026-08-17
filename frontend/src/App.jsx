import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HeroSection from "./pages/HeroSection"
import Login from "./pages/Login"
import RootLayout from "./RootLayout"
import Courses from "./pages/Courses"
import MyLearning from "./pages/student/MyLearning"
import Profile from "./pages/student/Profile"
import Sidebar from "./pages/admin/Sidebar"
import CourseTable from "./pages/admin/CourseTable"
import Dashboard from "./pages/admin/Dashboard"
import AddCourse from "./pages/admin/AddCourse"
import EditCourse from "./pages/admin/EditCourse"
import CreateLecture from "./pages/admin/lectures/CreateLecture"
import EditLecture from "./pages/admin/lectures/EditLecture"
import CourseDetail from "./pages/student/CourseDetail"
import CourseProgress from "./pages/student/CourseProgress"
import SearchPage from "./pages/SearchPage"
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoute"
import PurchaseCourseProtectedRoute from "./components/CoursePurchaseProtectedRoute"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element:
          <>
            <HeroSection />
            <Courses />
          </>
      },
      {
        path: "login",
        element: <AuthenticatedUser> <Login /> </AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: <ProtectedRoute> <MyLearning /> </ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute> <Profile /> </ProtectedRoute>
      },
      {
        path: "course/search",
        element: <ProtectedRoute> <SearchPage /> </ProtectedRoute>
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute> <CourseDetail /> </ProtectedRoute>
      },
      {
        path: "course-progress/:courseId",
        element: <ProtectedRoute>
                    <PurchaseCourseProtectedRoute>
                      <CourseProgress />
                    </PurchaseCourseProtectedRoute>
                  </ProtectedRoute>
      },

      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute>,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "courses",
            element: <CourseTable />
          },
          {
            path: "courses/add",
            element: <AddCourse />
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />
          },
          {
            path: "courses/:courseId/lectures",
            element: <CreateLecture />
          },
          {
            path: "courses/:courseId/lectures/:lectureId",
            element: <EditLecture />
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App

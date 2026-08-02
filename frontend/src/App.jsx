import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HeroSection from "./pages/HeroSection"
import Login from "./pages/Login"
import RootLayout from "./RootLayout"
import Courses from "./pages/Courses"
import MyLearning from "./pages/student/MyLearning"
import Profile from "./pages/student/Profile"


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout />,
    children:[
      {
        index:true,
        element:
        <>
         <HeroSection />
         <Courses />
        </>
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"my-learning",
        element:<MyLearning />
      },
      {
        path:"profile",
        element:<Profile />
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

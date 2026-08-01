import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HeroSection from "./pages/HeroSection"
import Login from "./pages/Login"
import RootLayout from "./RootLayout"


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout />,
    children:[
      {
        index:true,
        element:<HeroSection />
      },
      {
        path:"login",
        element:<Login />
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

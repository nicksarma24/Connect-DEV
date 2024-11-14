import Login from "./Login"
import Profile from "./Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
import Connections from "./Connections"
import Request from "./Request"

function App() {
  return (
    <> 
    <Provider store={appStore}>
   
      <BrowserRouter basename="/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Body/>}>
             <Route path="/feed" element={<Feed/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
             <Route path="/profile" element={<Profile/>}></Route>
             <Route path="/connections" element={<Connections/>}></Route>
             <Route path="/request" element={<Request/>}></Route>
          </Route>
        </Routes>

      </BrowserRouter>
       </Provider>
    </>
  )
}

export default App

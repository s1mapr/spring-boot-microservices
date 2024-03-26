import { Route, Routes } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import Login from "./Login";
import Registration from "./Registration";
import PrivateRoute from "./PrivateRoute";
import Titles from "./Titles";
import Users from "./Users";
import User from "./User";
import Title from "./Title";
import Contents from "./Contents";
import Comments from "./Comments";


function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        
        <Route path="/register" element={<Registration />}></Route>

        <Route
          path="/titles/released"
          element={
            <PrivateRoute>
              <Titles />
            </PrivateRoute>
          }
        />


        <Route
          path="/titles/not-released"
          element={
            <PrivateRoute>
              <Titles />
            </PrivateRoute>
          }
        />
        <Route
          path="/titles"
          element={
            <PrivateRoute>
              <Titles />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />

        <Route
          path="/titles/:id"
          element={
            <PrivateRoute>
              <Title />
            </PrivateRoute>
          }
        />

        <Route
          path="/contents"
          element={
            <PrivateRoute>
              <Contents />
            </PrivateRoute>
          }
        />

        <Route
          path="/comments"
          element={
            <PrivateRoute>
              <Comments />
            </PrivateRoute>
          }
        />
      </Routes>

    </>
  );
}

export default App;

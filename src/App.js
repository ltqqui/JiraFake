import "./App.css";
import { UserLoginTemplate } from "./templates/UserLoginTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { GlobalLoading } from "./components/GlobalLoading/GlobalLoading";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./redux/constants/CyberBug/HistoryConst/HistoryConst";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  useHistory,
} from "react-router-dom";
import { CyberBugsTemplate } from "./templates/CyberBugsTemplate/CyberBugsTemplate";
import indexCyberBugs from "./pages/CyberBugs/indexCyberBugs/IndexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManament/ProjectManagement";
import DrawerCyberBugs from "./HOC/DrawerCyberBugs";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import Header from "./components/CyberBugs/Header/Header";
import RegisterCyberBugs from "./pages/CyberBugs/RegisterCyberBugs/RegisterCyberBugs";
import UserManagement from "./pages/CyberBugs/UserManament/UserManagement";

function App() {
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history: history,
    });
  }, []);

  return (
    <>
      <DrawerCyberBugs />
      <GlobalLoading />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <UserLoginTemplate exact path="/register" Component={RegisterCyberBugs} />
        <CyberBugsTemplate exact
          path="/projectdetail/:projectId"
          Component={indexCyberBugs}
        />
        <CyberBugsTemplate exact path="/createproject" Component={CreateProject} />
        <CyberBugsTemplate exact path="/management" Component={ProjectManagement} />
        <CyberBugsTemplate exact path="/" Component={ProjectManagement} />
        <CyberBugsTemplate exact path="/usermanagement" Component={UserManagement} />
        {/* <Route exact path='/demodragdrop' component={DemoDragDrop} /> */}
        {/* <Route exact path='/dragdropdnd' component={DragAndDropDnD} /> */}
        
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

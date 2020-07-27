import React from "react";
import MainPage from "./Pages/HomePage/Main";
import "./App.css";
import ProfileView from "./Pages/UserProfile/ProfileView";
import NewUser from "./Pages/UserProfile/NewProfile";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditUser from "./Pages/UserProfile/EditProfile";
import ApplicationDrawer from './Pages/ApplicationDrawer/AppDrawer';
import NewProject from './Pages/NewProject/NewProject';
import ProjectsList from './Pages/ProjectsList/ProjectsList';
import LoginCard from './Pages/Login/LoginCard';
import LinearIndeterminate from './Pages/test_progress_bar';

function App() {

  const [token, setToken] = React.useState(undefined);
  const [userData, setUserData] = React.useState(undefined);

  return (
    <div>

      <Router>
        <switch>
          <Route path="/" exact component={() =>
            <ApplicationDrawer
              token={token}
              setToken={setToken}
              children={<MainPage />}
            />
          }
          />

          <Route path="/user/login" exact component={() =>
            <ApplicationDrawer
              token={token}
              setToken={setToken}
              children={<LoginCard
                setToken={setToken}
                setUserData={setUserData} />}
            />
          }
          />
          {/* projects pages */}

          <Route path="/project/new" exact component={() =>
            <ApplicationDrawer

              setToken={setToken}
              token={token}
              children={<NewProject token={token} />}
            />
          }
          />
          <Route path="/project/all" exact component={() =>
            <ApplicationDrawer

              setToken={setToken}
              token={token}
              children={<ProjectsList userData={userData} />}
            />
          }
          />

          {/* user pages */}

          <Route
            path="/user"
            exact
            component={() => (

              <ApplicationDrawer

                setToken={setToken}
                token={token}
                children={<ProfileView
                  userName="pGregory99"
                  fullName="Peter Gregory"
                  userEmail="peter.gregory@somedomain.com"
                  affiliation="Software Developer"
                  institute="Facebook"
                  isVerified={false}
                />}
              />



            )}
          />

          <Route
            style={{
              background: "#23395d"
            }}
            path="/user/new"
            exact
            component={() => (

              <ApplicationDrawer

                setToken={setToken}
                token={token}
                children={<NewUser
                  userName="pGregory99"
                  fullName="Peter Gregory"
                  userEmail="peter.gregory@somedomain.com"
                  affiliation="Software Developer"
                  institute="Facebook"
                />}
              />

            )}
          />
          <Route
            style={{
              background: "#23395d"
            }}
            path="/user/edit"
            exact
            component={() => (
              <ApplicationDrawer

                setToken={setToken}
                token={token}

                children={<EditUser
                  userName="pGregory99"
                  firstName="Peter"
                  lastName="Gregory"
                  userEmail="peter.gregory@somedomain.com"
                  affiliation="Software Developer"
                  institute="Facebook"
                />} />

            )}
          />




          <Route
            path="/help/get-started/"
            exact
            component={() => (

              <ApplicationDrawer

                setToken={setToken}
                token={token}
                children={<LinearIndeterminate />}
              />



            )}
          />
        </switch>

      </Router>


    </div>
  );
}

export default App;

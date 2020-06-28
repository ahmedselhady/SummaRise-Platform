import React from "react";
import MainPage from "./Pages/HomePage/Main";
import "./App.css";
import ProfileView from "./Pages/UserProfile/ProfileView";
import NewUser from "./Pages/UserProfile/NewProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditUser from "./Pages/UserProfile/EditProfile";
import ApplicationDrawer from './Pages/ApplicationDrawer/AppDrawer';
import NewProject from './Pages/NewProject/NewProject';
import ProjectsList from './Pages/ProjectsList/ProjectsList';

function App() {


  return (
    <div>

      <Router>
        <switch>
          <Route path="/" exact component={() =>
            <ApplicationDrawer
              children={<MainPage />} 
            />
          }
          />

          {/* projects pages */}

          <Route path="/project/new" exact component={() =>
            <ApplicationDrawer
              children={<NewProject />} 
            />
          }
          />
          <Route path="/project/all" exact component={() =>
            <ApplicationDrawer
              children={<ProjectsList />} 
            />
          }
          />
          
          {/* user pages */}

          <Route
            path="/user"
            exact
            component={() => (
              <ProfileView
                userName="pGregory99"
                fullName="Peter Gregory"
                userEmail="peter.gregory@somedomain.com"
                affiliation="Software Developer"
                institute="Facebook"
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
              <NewUser
                userName="pGregory99"
                fullName="Peter Gregory"
                userEmail="peter.gregory@somedomain.com"
                affiliation="Software Developer"
                institute="Facebook"
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
              <EditUser
                userName="pGregory99"
                firstName="Peter"
                lastName="Gregory"
                userEmail="peter.gregory@somedomain.com"
                affiliation="Software Developer"
                institute="Facebook"
              />
            )}
          />
        </switch>

      </Router>


    </div>
  );
}

export default App;

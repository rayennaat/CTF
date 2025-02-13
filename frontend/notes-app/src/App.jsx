import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Hero from './pages/Hero/Hero';
import Teams from './pages/Teams/Teams';
import Users from './pages/Users/users';
import Scoreboard from './pages/Scoreboard/Scoreboard';
import Team from './pages/Profiles/Team';
import FuzzyOverlayExample from './pages/Challenges/Challenges';
import ProfileUser from './pages/Profiles/User';
import Register from './pages/Login/Register';
import ChatComponent from './components/Chat/Chat';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminTeamsTable from './pages/Admin/AdminTeamsTable';
import AdminUsersTable from './pages/Admin/AdminUsersTable';
import AdminChallenges from './pages/Admin/AdminChallennges';



const routes= (
  <Router>
    <Routes>
      <Route path='/' exact element={<Hero />} />
      <Route path='/home' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<SignUp />} />
      <Route path='/challenges' exact element={<FuzzyOverlayExample />} />
      <Route path='/teams' exact element={<Teams/>} />
      <Route path='/users' exact element={<Users />} />
      <Route path='/scoreboard' exact element={<Scoreboard    />} />
      <Route path='/team' exact element={<Team    />} />
      <Route path='/profileuser' exact element={<ProfileUser    />} />
      <Route path='/lgg' exact element={<Register/>} />
      <Route path='/chat' exact element={<ChatComponent/>} />
      <Route path='/admin' exact element={<AdminDashboard/>} />
      <Route path='/admin/teams' exact element={<AdminTeamsTable/>} />
      <Route path='/admin/users' exact element={<AdminUsersTable/>} />
      <Route path='/admin/challenges' exact element={<AdminChallenges/>} />
    </Routes>
  </Router>
);

const App = () => {
  return <div> {routes} </div> ;
    
  
}

export default App

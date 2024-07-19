import {Route, Routes} from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import TaskForm from './pages/TaskForm'
import NotFound from './pages/NotFound'
import './App.css'
import NavBar from './components/NavBar'
import { TaskContextProvider } from './context/TaskContext'
import Home from './pages/Home'
import UeaForm from './pages/UeaForm'
import UeaPage from './pages/UeaPage'
import { UeaContextProvider } from './context/UeaContext'
import UeaCor from './pages/UeaCor'
import { GtContextProvider } from './context/GtContext'
import GtsPage from './pages/GtsPage'
import GtsForm from './pages/GtsForm'
import { LoginContextProvider } from './context/LoginContext'
import Login from './pages/Login'
import Logout from './pages/Logout'
import { MinutaContextProvider } from './context/MinutaContext'
import MinutaPage from './pages/MinutaPage'
import MinutaForm from './pages/MinutaForm'
import MinutaForm2 from './pages/MinutaForm2'
import GtsUEAs from './pages/GTsUEAs'
import GtsProf from './pages/GtsProf'
import { FileContextProvider } from './context/FileContext'
import { PdfContextProvider } from './context/PdfContext'
import { SintContextProvider } from './context/SintContext'
import PePage from './pages/PePage'
import PeSinPage from './pages/PeSinPage'
import PeAnPage from './pages/PeAnPage'

function App() {
  return (
    <div className="grid grid-cols-6 grid-rows-1 gap-10 bg-[url('/fondo4.jpg')] bg-cover h-screen overflow-x-auto text-negro">
      <LoginContextProvider>
        <FileContextProvider>
          <PdfContextProvider>
            <TaskContextProvider>
              <SintContextProvider>
                <UeaContextProvider>
                  <GtContextProvider>
                    <MinutaContextProvider>
                      <div className=' absolute col-start-1 col-span-1 row-span-1 bg-rojo-uam/95 h-full w-56'>
                        <NavBar/>
                      </div>
                      <div className="col-start-2 col-end-7 ">
                        <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/profesores' element={<TaskPage/>}/>
                        <Route path='/new' element={<TaskForm/>}/>
                        <Route path='/edit/:id' element={<TaskForm/>}/>
                        <Route path='*' element={<NotFound/>}/>
                        <Route path='/ueas' element={<UeaPage/>}/>
                        <Route path='/newUea' element={<UeaForm/>}/>
                        <Route path='/UeaCor/:id' element={<UeaCor/>}/>
                        <Route path='/editUea/:id' element={<UeaForm/>}/>
                        <Route path='/gts' element={<GtsPage/>}/>
                        <Route path='/editgt/:id' element={<GtsForm/>}/>
                        <Route path='/newgts' element={<GtsForm/>}/>
                        <Route path='/gtueas/:id' element={<GtsUEAs/>}/>
                        <Route path='/gtprofs/:id' element={<GtsProf/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/logout' element={<Logout/>}/>
                        <Route path='/minuta' element={<MinutaPage/>}/>
                        <Route path='/minutaedit/:id' element={<MinutaForm/>}/>
                        <Route path='/newminuta' element={<MinutaForm/>}/>
                        <Route path='/minutaagenda/:id' element={<MinutaForm2/>}/>
                        <Route path='/programas' element={<PePage/>}/>
                        <Route path='/programaSin/:id' element={<PeSinPage/>}/>
                        <Route path='/programaAn/:id' element={<PeAnPage/>}/>
                        </Routes>
                      </div>
                    </MinutaContextProvider>
                  </GtContextProvider>
                </UeaContextProvider>
              </SintContextProvider>
            </TaskContextProvider>
          </PdfContextProvider>
        </FileContextProvider>
      </LoginContextProvider>
    </div>
  )
}

export default App

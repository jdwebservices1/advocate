import './App.css';
import {Signup,Login, Dashboard, Clients,ClientList,ClientUpdate, Judge, JudgeList, UpdateJudge,
  CaseType, CaseTypeList,UpdateCaseType, ClientType, ClientTypeList, UpdateClientType,UploadDocumentsList, DocumentUploadForm
  ,SearchCaseByJudge, SearchCaseByDate, SearchCaseByMonthYear, Addpayments, UpdateStatus,ClientPayments, Home
} from './UserPanel/index'

// import { InvoiceProvider } from './components/InvoiceContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // <InvoiceProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/signup' element={<Signup/>} />
            <Route exact path='/dashboard' element={<Dashboard/>} />
            <Route exact path='/clients' element={<Clients/>} />
            <Route exact path='/clientslist' element={<ClientList/>} />
            <Route exact path='/clientsupdate/update/:id' element={<ClientUpdate/>} />
            <Route exact path='/clientDocumentUpload/update/:id' element={<DocumentUploadForm/>} />
            <Route exact path='/clientDocumentlist/:id' element={<UploadDocumentsList/>} />
            <Route exact path='/addjudge' element={<Judge/>} />
            <Route exact path='/judgelist' element={<JudgeList/>} />
            <Route exact path='/judges/update/:id' element={<UpdateJudge/>} />
            <Route exact path='/addcasetype' element={<CaseType/>} />
            <Route exact path='/casetypelist' element={<CaseTypeList/>} />
            <Route exact path='/caseTypes/update/:id' element={<UpdateCaseType/>} />
            <Route exact path='/addclienttype' element={<ClientType/>} />
            <Route exact path='/clienttypelist' element={<ClientTypeList/>} />
            <Route exact path='/clienttype/update/:id' element={<UpdateClientType/>} />
            <Route exact path='/SearchByJudge' element={<SearchCaseByJudge />} />
            <Route exact path='/SearchByDate' element={<SearchCaseByDate />} />
            <Route exact path='/SearchCaseByMonthYear' element={<SearchCaseByMonthYear />} />
            <Route exact path='/Addpayments' element={<Addpayments />} />
            <Route exact path='/ClientPayments/:caseId' element={<ClientPayments />} />
            <Route exact path='/UpdateStatus/:id' element={<UpdateStatus />} />
        
            
          </Routes>
        </div>
      </Router>
    // {/* </InvoiceProvider> */}
  );
}

export default App;

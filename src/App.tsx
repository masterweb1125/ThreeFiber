import { Route, Routes, Navigate } from 'react-router-dom'
import Editor from './pages/Editor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;

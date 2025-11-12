import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Segments from './pages/Segments'
import MessageVariants from './pages/MessageVariants'
import SafetyResults from './pages/SafetyResults'
import Experiments from './pages/Experiments'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/messages" element={<MessageVariants />} />
          <Route path="/safety" element={<SafetyResults />} />
          <Route path="/experiments" element={<Experiments />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

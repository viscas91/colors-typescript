import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
const ColorGenerator = lazy(() => import('./components/ColorGenerator'));
const Converter = lazy(() => import('./components/Converter'));

function App() {
  return (
      <>
        <Navbar />
        <Container fixed={true}>
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              <Route path="/" element={<ColorGenerator />} />
              <Route path="converter" element={<Converter />} />
            </Routes>
          </Suspense>
        </Container>
      </>
  )
}

export default App

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

import Layout from './Components/Layout';
import NPMQuill from './Components/ReactQuill';
import Error from './Components/Error';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary FallbackComponent={Error}>
          <Routes>
            <Route path='/' element={<Navigate to={'/document/' + nanoid()} />} />
            <Route path='/document/:id' element={<NPMQuill />} />
          </Routes>

          <Toaster position='bottom-right' />
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  )
}

export default App

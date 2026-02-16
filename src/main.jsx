import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ClerkSyncProvider from './app/providers/ClerkSyncProvider.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import OrgActiveProvider from './app/providers/OrgActiveProvider.jsx'
import { MembersProvider } from './features/context/MemberContext.jsx'
import ThemeProvider from './app/providers/ThemeProvider.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

        <ClerkSyncProvider>
          <MembersProvider>

            <OrgActiveProvider>
              <App />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#1f2937",
                    color: "#fff",
                  },
                }}
              />

            </OrgActiveProvider>


          </MembersProvider>
        </ClerkSyncProvider>
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>,
)

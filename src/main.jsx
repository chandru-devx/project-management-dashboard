import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ClerkSyncProvider from './app/providers/ClerkSyncProvider.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
// import OrganizationProvider from './app/providers/OrganizationProvider.jsx'
// import OrgSyncProvider from './app/providers/OrgSyncProvider.jsx'
import OrgActiveProvider from './app/providers/OrgActiveProvider.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkSyncProvider>
        {/* <OrganizationProvider> */}
        {/* <OrgSyncProvider> */}
        <OrgActiveProvider>
          <App />
        </OrgActiveProvider>

        {/* </OrgSyncProvider> */}
        {/* </OrganizationProvider> */}
      </ClerkSyncProvider>
    </ClerkProvider>

  </StrictMode>,
)

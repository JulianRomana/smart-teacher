import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

/**
 * Custom render function that wraps components with common providers
 * Add your app providers here (ThemeProvider, QueryClientProvider, etc.)
 */
function customRender(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    // wrapper: ({ children }) => (
    //   <YourProviders>{children}</YourProviders>
    // ),
    ...options,
  })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { customRender as render }
export { userEvent } from '@testing-library/user-event'

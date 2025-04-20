//import { render, screen } from '@testing-library/react';
//import App from './App';




// App.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mocking all child components
jest.mock('./Components/Login', () => () => <div>Login Page</div>);
jest.mock('./Components/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('./Components/NotFound', () => () => <div>404 Not Found</div>);
jest.mock('./Components/RefreshHandler', () => () => null);
jest.mock('./Components/post-details/CreatePost', () => () => <div>Create Post Page</div>);

describe('App Routing', () => {
  test('renders login page on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  test('redirects from / to /login', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  test('shows 404 on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some-random-path']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
  });

  test('does not render dashboard if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  test('does not render create-post if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/create-post']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

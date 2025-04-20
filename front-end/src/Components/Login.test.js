import { render, screen } from '@testing-library/react';
import Login from './Login';

// Optionally, mock the child components to isolate the test
jest.mock('./login-details/GoogleLogin', () => () => <div>Google Login Button</div>);
jest.mock('./login-details/FacebookLogin', () => () => <div>Facebook Login Button</div>);

describe('Login Component', () => {
  test('renders Google and Facebook login buttons', () => {
    render(<Login />);

    // Check for Google login button
    const googleBtn = screen.getByText(/google login button/i);
    expect(googleBtn).toBeInTheDocument();

    // Check for Facebook login button
    const facebookBtn = screen.getByText(/facebook login button/i);
    expect(facebookBtn).toBeInTheDocument();
  });

  test('renders the container with correct styling', () => {
    const { container } = render(<Login />);
    const div = container.querySelector('div.flex');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('items-center', 'justify-center', 'h-screen', 'gap-4', 'mx-auto');
  });
});

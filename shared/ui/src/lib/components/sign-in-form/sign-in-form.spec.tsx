import { render } from '@testing-library/react';

import SignInForm from './sign-in-form';

describe('SignInForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignInForm />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Constant from './constant';

describe('Constant', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Constant />);
    expect(baseElement).toBeTruthy();
  });
});

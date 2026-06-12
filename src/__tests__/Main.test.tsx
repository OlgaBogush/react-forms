import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Main } from '../components/Main';
import type { IUserData } from '../types/user';

const mockDispatch = vi.fn();
vi.mock('../store/hooks', () => ({
  useAppSelector: () => [],
  useAppDispatch: () => mockDispatch,
}));

vi.mock('../store/userSlice', () => ({
  selectForms: () => [],
  addUserForm: (data: IUserData) => ({
    type: 'user/addUserForm',
    payload: data,
  }),
}));

vi.mock('../components/forms/UncontrolledForm', () => ({
  UncontrolledForm: () => (
    <div data-testid="uncontrolled-form-mock">Uncontrolled Form</div>
  ),
}));

vi.mock('../components/forms/ReactHookForm', () => ({
  ReactHookForm: () => <div>React Hook Form</div>,
}));

describe('modal', () => {
  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-modal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    const portalRoot = document.getElementById('portal-modal-root');
    if (portalRoot) document.body.removeChild(portalRoot);
  });

  test('open modal', async () => {
    const user = userEvent.setup();
    render(<Main />);

    expect(
      screen.queryByTestId('uncontrolled-form-mock')
    ).not.toBeInTheDocument();

    const openButton = screen.getByRole('button', {
      name: /Uncontrolled Form/i,
    });
    await user.click(openButton);

    const formMock = screen.getByTestId('uncontrolled-form-mock');
    expect(formMock).toBeInTheDocument();

    const portalRoot = document.getElementById('portal-modal-root');
    expect(portalRoot).toContainElement(formMock);
  });

  test('close modal by x', async () => {
    const user = userEvent.setup();
    render(<Main />);

    await user.click(
      screen.getByRole('button', { name: /Uncontrolled Form/i })
    );
    expect(screen.getByTestId('uncontrolled-form-mock')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'x' });
    await user.click(closeButton);

    expect(
      screen.queryByTestId('uncontrolled-form-mock')
    ).not.toBeInTheDocument();
  });

  test('close modal by Escape', async () => {
    const user = userEvent.setup();
    render(<Main />);

    await user.click(
      screen.getByRole('button', { name: /Uncontrolled Form/i })
    );
    expect(screen.getByTestId('uncontrolled-form-mock')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(
      screen.queryByTestId('uncontrolled-form-mock')
    ).not.toBeInTheDocument();
  });
});

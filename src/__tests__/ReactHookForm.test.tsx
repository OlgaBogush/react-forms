import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { ReactHookForm } from '../components/forms/ReactHookForm';
import type { IUserData } from '../types/user';

const mockDispatch = vi.fn();
vi.mock('../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('../store/userSlice', () => ({
  addUserForm: (data: IUserData) => ({
    type: 'user/addUserForm',
    payload: data,
  }),
}));

vi.mock('../utils/fileToBase64', () => ({
  fileToBase64: vi
    .fn()
    .mockResolvedValue('data:image/png;base64,mockedbase64string'),
}));

describe('ReactHookForm', () => {
  const mockHandleCloseModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render', () => {
    render(<ReactHookForm handleCloseModal={mockHandleCloseModal} />);

    expect(screen.getByLabelText(/^Country/i)).toHaveValue('Belarus');
    expect(screen.getByLabelText(/^male$/i)).toBeChecked();
    expect(screen.getByLabelText(/^female$/i)).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  test('form validation', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm handleCloseModal={mockHandleCloseModal} />);

    await user.type(screen.getByLabelText(/Name/i), 'Pol');
    await user.type(screen.getByLabelText(/Age/i), '33');
    await user.type(screen.getByLabelText(/Email/i), 'pol@gmail.com');
    await user.type(screen.getByLabelText(/^Password/i), 'Pol-9&');
    await user.type(screen.getByLabelText(/^Confirm Password/i), 'Pol-9&');
    await user.click(screen.getByLabelText(/Terms & Conditions/i));

    const fileInput = screen.getByLabelText(/Upload File/i);
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    await user.upload(fileInput, file);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'user/addUserForm',
        payload: {
          name: 'Pol',
          age: '33',
          email: 'pol@gmail.com',
          gender: 'male',
          country: 'Belarus',
          file: 'data:image/png;base64,mockedbase64string',
          password: 'Pol-9&',
          confirmPassword: 'Pol-9&',
          terms: true,
        },
      });
    });

    expect(mockHandleCloseModal).toHaveBeenCalledTimes(1);
  });

  test('errors', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm handleCloseModal={mockHandleCloseModal} />);

    await user.type(screen.getByLabelText(/Email/i), 'polgmailcom');
    await user.type(screen.getByLabelText(/^Password/i), '1234');

    await user.click(screen.getByLabelText(/Name/i));

    expect(
      await screen.findByText('Incorrect Email Address')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});

import { fireEvent, render } from '@testing-library/react';
import { CustomButton } from 'components/common/CustomButton';

describe('CustomButton', () => {
  test('renders the button with the correct text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<CustomButton>{buttonText}</CustomButton>);
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  test('calls onClick when the button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <CustomButton onClick={onClickMock}>Click me</CustomButton>
    );
    fireEvent.click(getByRole('button'));
    expect(onClickMock).toHaveBeenCalled();
  });

  test('disables the button when disabled prop is true', () => {
    const { getByRole } = render(
      <CustomButton disabled>Click me</CustomButton>
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  test('applies additional styles to the button', () => {
    const { getByRole } = render(
      <CustomButton otherStyles='bg-red-500'>Click me</CustomButton>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('bg-red-500');
  });

  test('overwrites default button styles when overwriteStyles is true', () => {
    const { getByRole } = render(
      <CustomButton overwriteStyles>Click me</CustomButton>
    );
    const button = getByRole('button');
    expect(button).not.toHaveClass(
      'mx-auto mt-4 rounded-xl py-1 px-2 font-bold hover:opacity-90 active:scale-95 active:opacity-80 disabled:opacity-50'
    );
  });
});

import { render } from '@testing-library/react';
import { DeletedMessage } from 'components/mainContentMisc/DeletedMessage';

describe('DeletedMessage', () => {
  const styleClasses =
    'relative z-10 m-0.5 w-fit max-w-4/5 max-w-fit break-all rounded-2xl bg-blue-charcoal-200 py-1 py-0.5 px-2 text-xs ease-in-out dark:bg-blue-800 lg:max-w-3/5 xl:text-sm';

  it('should render "Message was deleted by the owner!"', () => {
    const { getByText } = render(<DeletedMessage />);

    expect(getByText('Message was deleted by the owner!')).toBeInTheDocument();
  });

  it('should have the correct styling classes', () => {
    const { getByText } = render(<DeletedMessage />);
    const deletedMessage = getByText('Message was deleted by the owner!');

    expect(deletedMessage).toHaveClass(styleClasses);
  });
});

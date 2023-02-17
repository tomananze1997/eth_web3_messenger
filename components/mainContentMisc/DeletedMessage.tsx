import type { FC } from 'react';

export const DeletedMessage: FC = () => (
  <>
    <div
      className={
        'relative z-10 m-0.5 w-fit max-w-4/5 max-w-fit break-all rounded-2xl bg-blue-charcoal-200 py-1 py-0.5 px-2 text-xs ease-in-out dark:bg-blue-800 lg:max-w-3/5 xl:text-sm'
      }
    >
      Message was deleted by the owner!
    </div>
  </>
);

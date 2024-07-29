'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
// Mock implementation of removeItem
const removeItem = async (merchandiseId: string) => {
  return { success: true };
};

// Mock implementation of useFormState
const useFormState = (action: Function, initialState: any) => {
  const [state, setState] = useState(initialState);
  const formAction = async (payload: any) => {
    const result = await action(payload);
    setState(result.success ? 'Item removed' : 'Failed to remove item');
  };
  return [state, formAction];
};

type CartItem = {
  merchandise: {
    id: string;
  };
};

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  optimisticUpdate: (id: string, type: 'delete') => void;
}) {
  const [message, formAction] = useFormState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, 'delete');
        await actionWithVariant();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className={clsx(
          'flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500',
          'hover:bg-neutral-600 transition-all duration-200'
        )}
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

// Mock data for testing
const mockCartItem: CartItem = {
  merchandise: {
    id: 'mock-merchandise-id'
  }
};

// Mock function for optimisticUpdate
const mockOptimisticUpdate = (id: string, type: 'delete') => {
  console.log(`Optimistically updating item ${id} with action ${type}`);
};

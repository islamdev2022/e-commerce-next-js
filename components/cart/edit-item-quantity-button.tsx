'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

// Mock implementation of updateItemQuantity
const updateItemQuantity = async (payload: { merchandiseId: string; quantity: number }) => {
  return { success: true };
};

// Mock implementation of useFormState
const useFormState = (action: Function, initialState: any) => {
  const [state, setState] = useState(initialState);
  const formAction = async (payload: any) => {
    const result = await action(payload);
    setState(result.success ? 'Success' : 'Failed');
  };
  return [state, formAction];
};

type CartItem = {
  merchandise: {
    id: string;
  };
  quantity: number;
};

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: (id: string, type: 'plus' | 'minus') => void;
}) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type);
        await actionWithVariant();
      }}
    >
      <SubmitButton type={type} />
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
  },
  quantity: 1
};

// Mock function for optimisticUpdate
const mockOptimisticUpdate = (id: string, type: 'plus' | 'minus') => {
  console.log(`Optimistically updating item ${id} with action ${type}`);
};

// Render component with mock data for testing
<EditItemQuantityButton
  item={mockCartItem}
  type="plus"
  optimisticUpdate={mockOptimisticUpdate}
/>;

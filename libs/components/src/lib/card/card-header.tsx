import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = JSX.IntrinsicElements['div'];

export const CardHeader = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx('card-header border-0 pt-5', className)}
    />
  )
);

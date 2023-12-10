import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = { fluidHeight?: boolean } & JSX.IntrinsicElements['div'];

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ fluidHeight, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'card card-custom gutter-b',
        { 'card-height-fluid': fluidHeight },
        className
      )}
    />
  )
);

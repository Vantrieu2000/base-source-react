import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = { fit?: boolean; fluid?: boolean } & JSX.IntrinsicElements['div'];

export const CardBody = forwardRef<HTMLDivElement, Props>(
  ({ fit, fluid, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'card-body',
        {
          'card-body-fit': fit,
          'card-body-fluid': fluid,
        },
        className
      )}
    />
  )
);

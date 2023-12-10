import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = JSX.IntrinsicElements['div'];

export const CardToolbar = forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => (
    <div {...props} ref={ref} className={clsx('card-toolbar', className)}>
      <ul className="nav">{children}</ul>
    </div>
  )
);

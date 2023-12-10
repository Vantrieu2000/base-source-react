import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../helpers/asset-helpers';

/* eslint-disable-next-line */
export interface SVGIconProps {
  className?: string;
  path: string;
  svgClassName?: string;
}

export function SVGIcon({
  className = '',
  path,
  svgClassName = 'mh-50px',
}: SVGIconProps) {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  );
}

export default SVGIcon;

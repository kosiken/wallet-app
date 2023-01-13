import * as React from 'react';
import { IconNames } from './icons';
import iconPaths from './icon-paths';
 

type IconSize = {
  width: number;
  height: number;
};

export type IconBaseProps = {
    name: IconNames;
    viewBox?: string;
    size?: IconSize;
    color?: string;
    className?: string;
  
  };
  

export const Icon = React.forwardRef<SVGSVGElement, IconBaseProps>(
  (
    {
      size = {
        width: 20,
        height: 20
      },
      name,
      color = 'black',
      ...restProps
    },
    ref
  ) => {
    const path = iconPaths[name]?.path;

    if(!path) return null;
    return React.cloneElement(path, {
      ref,
      width:size.width,
      height:size.height,
      color: color,
      display: 'block',
      ...restProps
    });
  }
);

Icon.displayName = 'Icon';

import { CSSProperties } from 'react';

function cssPropertiesToString(styles?: CSSProperties): string {
  let cssString = '';
  for (const property in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, property)) {
      cssString += `${property.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}: ${
        styles[property]
      };`;
    }
  }
  return cssString;
}

export { cssPropertiesToString };

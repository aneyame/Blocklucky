/// <reference types="vite/client" />

declare module 'figma:asset/*.png' {
  const value: string;
  export default value;
}

declare module 'figma:asset/*.jpg' {
  const value: string;
  export default value;
}

declare module 'figma:asset/*.svg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

import { Extension } from '@tiptap/core';

//https://stackoverflow.com/questions/70564092/tiptap-font-size-react
//https://tiptap.dev/guide/custom-extensions#attributes

const levelStyle = {
  level1: 'font-size: 18px',
  level2: 'font-size: 16px',
  level3: 'font-size: 14px',
};

const LEVELS = ['level1', 'level2', 'level3'];

export type Levels = 'level1' | 'level2' | 'level3';

const DEFAULT_ATTRIBUTES = {
  style: 'font-size: 18px',
  level: 'level1',
} as const;

interface LevelOptions {
  types: string[];
  levels: typeof LEVELS;
  defaultAttributes: typeof DEFAULT_ATTRIBUTES;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    level: {
      //TODO: no es redudante LEVELS y Levels?
      setLevel: (level: 'level1' | 'level2' | 'level3') => ReturnType;
    };
  }
}

const Level = Extension.create<LevelOptions>({
  name: 'level',
  addOptions() {
    return {
      types: ['textStyle'],
      levels: LEVELS,
      defaultAttributes: DEFAULT_ATTRIBUTES,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          level: {
            default: this.options.defaultAttributes,
            parseHTML: (element) =>
              !LEVELS.includes(element.className)
                ? 'level1'
                : element.className,
            renderHTML: (attributes) => ({
              class: attributes.level,
              style: `${levelStyle[attributes.level]}`,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLevel:
        (level: Levels) =>
        ({ chain }) => {
          if (!this.options.levels.includes(level)) {
            return false;
          }
          return chain().focus().setMark('textStyle', { level: level }).run();
        },
    };
  },
});

export default Level;

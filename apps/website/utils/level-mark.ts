import { Mark, mergeAttributes } from '@tiptap/core';

export interface LevelOptions {
  HTMLAttributes: Record<string, any>;
}

const LEVELS = ['level1', 'level2', 'level3'];

const levelStyle = {
  level1: 'font-size: 18px',
  level2: 'font-size: 16px',
  level3: 'font-size: 14px',
};

export type Levels = 'level1' | 'level2' | 'level3';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    level: {
      //TODO: no es redudante LEVELS y Levels?
      setLevel: (level: 'level1' | 'level2' | 'level3') => ReturnType;
    };
  }
}

const Level = Mark.create<LevelOptions>({
  name: 'level',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      class: {
        default: { class: 'level1' },
        parseHTML: (element) => {
          return !LEVELS.includes(element.className)
            ? 'level1'
            : element.className;
        },
        renderHTML: (attributes) => {
          return {
            class: attributes.class,
            style: `${levelStyle[attributes.class]}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes }),
      0,
    ];
  },

  addCommands() {
    return {
      setLevel:
        (level) =>
        ({ chain }) => {
          return chain().focus().setMark(this.name, { class: level }).run();
        },
    };
  },
});

export default Level;

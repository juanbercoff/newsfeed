import { Mark, mergeAttributes } from '@tiptap/core';

export interface SpanOptions {
  HTMLAttributes: Record<string, any>;
}

const Span = Mark.create<SpanOptions>({
  name: 'span',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      class: {
        parseHTML: (element) => element.classList[0],
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
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

export default Span;

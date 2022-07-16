import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Level from '../utils/level-mark';
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import History from '@tiptap/extension-history';
import { Editor } from '@tiptap/core';

type ArticleFormContentEditorProps = {
  onChange: (html: string) => void;
  contentValue: string;
};

const ArticleFormContentEditor = ({
  onChange,
  contentValue,
}: ArticleFormContentEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      History,
      Level,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'mt-3 mb-4',
        },
      }),
    ],
    content: contentValue,
    editorProps: {
      attributes: {
        class: 'min-h-[348px] h-auto px-2 outline-none border-2 rounded',
      },
      transformPastedHTML(html) {
        const htmlObject = document.createElement('div');
        htmlObject.innerHTML = html;
        const res = [];
        let intermediateArray = [];

        Array.from(htmlObject.getElementsByTagName('span')).forEach(
          (element) => {
            if (
              element.previousSibling === null &&
              element.nextSibling === null
            ) {
              res.push(`<p>${element.outerHTML}</p>`);
            } else if (
              (element.previousSibling !== null &&
                element.nextSibling !== null) ||
              element.nextSibling !== null
            ) {
              intermediateArray.push(element.outerHTML);
            } else if (element.nextSibling === null) {
              intermediateArray.push(element.outerHTML);
              res.push(`<p>${intermediateArray.join('')}</p>`);
              intermediateArray = [];
            }
          }
        );
        return res.join('');
      },
      transformPastedText(text, plain) {
        const returnValue = `<span>${text}</span>`;
        return returnValue;
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      const level1IsActive = editor.isActive('level', { class: 'level1' });
      const level2IsActive = editor.isActive('level', { class: 'level2' });
      const level3IsActive = editor.isActive('level', { class: 'level3' });

      if (!level1IsActive && !level2IsActive && !level3IsActive) {
        editor?.commands.setMark('level', { class: 'level1' });
      }
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>, level) => {
    event.preventDefault();
    return editor.commands.setLevel(level);
  };

  useEffect(() => {
    editor?.commands.setLevel('level1');
  }, [editor]);

  //FIX: prevenir pegar html sin formato

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex space-x-2 bg-white p-2 rounded"
        >
          <button
            onClick={(e) => handleClick(e, 'level1')}
            className={`bg-slate-200 p-1 rounded
              ${
                editor.isActive('level', { class: 'level1' })
                  ? 'bg-slate-500'
                  : ''
              }
            `}
          >
            Level 1
          </button>
          <button
            onClick={(e) => handleClick(e, 'level2')}
            className={`bg-slate-200 p-1 rounded
            ${
              editor.isActive('level', { class: 'level2' })
                ? 'bg-slate-500'
                : ''
            }
          `}
          >
            Level 2
          </button>
          <button
            onClick={(e) => handleClick(e, 'level3')}
            className={`bg-slate-200 p-1 rounded
            ${
              editor.isActive('level', { class: 'level3' })
                ? 'bg-slate-500'
                : ''
            }
          `}
          >
            Level 3
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default ArticleFormContentEditor;

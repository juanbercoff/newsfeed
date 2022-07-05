import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Level from '../utils/level-mark';
import Paragraph from '@tiptap/extension-paragraph';

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
      StarterKit,
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
        class: 'h-96 px-2 outline-none border-2 rounded',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
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

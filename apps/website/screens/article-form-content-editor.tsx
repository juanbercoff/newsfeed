import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Level, { Levels } from '../utils/level-extension';
import { useEffect } from 'react';

type ArticleFormContentEditorProps = {
  onChange: (html: string) => void;
  contentValue: string;
};

const ArticleFormContentEditor = ({
  onChange,
  contentValue,
}: ArticleFormContentEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Level],
    content: contentValue,
    editorProps: {
      attributes: {
        class: 'h-96 p-2 outline-none border-2 rounded',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>, level: Levels) => {
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
                editor.isActive('textStyle', { level: 'level1' })
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
              editor.isActive('textStyle', { level: 'level2' })
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
              editor.isActive('textStyle', { level: 'level3' })
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

import { UseFormRegister, FieldError } from 'react-hook-form';
import { ArticleFormData } from './new-article-form';
import { ArticleContent } from '@prisma/client';
import FormError from '../components/common/form-error';
import { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import DepthChangerButton from '../components/article-form/depth-changer-button';
import DepthSelector from '../components/article/depth-selector';

type ArticleFormContentProps = {
  register: UseFormRegister<ArticleFormData>;
  contentSectionNumber: number;
  articleContent?: string;
  errors: {
    title?: FieldError;
    content?: FieldError;
  };
  content: string;
};

const ArticleFormContent = ({
  register,
  contentSectionNumber,
  articleContent,
  errors,
  content,
}: ArticleFormContentProps) => {
  const [html, setHtml] = useState();
  const [depthText, setDepthText] = useState();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleChange = (evt, setFunction) => {
    setFunction(evt.target.value);
  };
  const inputRef = useRef(null);
  const depthInputRef = useRef(null);

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <textarea
          ref={depthInputRef}
          className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 !resize-none border-blue-300 outline-1"
          value={depthText}
          onChange={(evt) => handleChange(evt, setDepthText)}
        />
        <button
          className="p-2 rounded bg-blue-500"
          onClick={(e) => {
            e.preventDefault();
            const span = document.createElement('span');
            span.innerHTML = depthText;
            console.log(span);
            setHtml((prevState) => prevState + span.outerHTML);
            inputRef.current.el.current.focus();
            console.log(inputRef.current);
            //inputRef.current.el.current.appendChild(span);
          }}
        >
          Add
        </button>
      </div>
      <div>
        <DepthChangerButton
          cmd="bold"
          className={`${activeIndex === 0 ? 'bg-green-700' : 'bg-white'}`}
          activeIndex={activeIndex}
          handleMouseDown={(evt) => {
            console.log(inputRef);
            inputRef.current.el.current.focus();
            evt.preventDefault();
            setActiveIndex(0);
            document.execCommand('bold', false);
          }}
        />
        <DepthChangerButton
          cmd="italic"
          className={`${activeIndex === 1 ? 'bg-green-700' : 'bg-white'}`}
          activeIndex={activeIndex}
          handleMouseDown={(evt) => {
            evt.preventDefault();
            setActiveIndex(1);
            depthInputRef.current.focus();
          }}
        />
      </div>
      <div>
        <ContentEditable
          ref={inputRef}
          html={html}
          onChange={(evt) => handleChange(evt, setHtml)}
          className="p-2 border-2 border-cyan-500 "
        />
      </div>
      {/* <textarea
        contentEditable={true}
        ref={inputRef}
        className="bg-transparent p-2 rounded min-h-[108px] text-lg w-full overflow-hidden border-2 !resize-none border-blue-300 outline-1"
        value={html}
        onChange={handleChange}
      /> */}
      <FormError>
        {errors.content?.type === 'maxLength' &&
          'Superaste el limite de 800 caracteres'}
        {errors.content?.type === 'required' && 'Este campo es requerido'}
      </FormError>
      <div>{html}</div>
    </div>
  );
};

export default ArticleFormContent;

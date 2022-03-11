const CommentForm = () => {
  return (
    <div className="border">
      <textarea className="w-full h-[108px] bg-transparent pt-2 px-4 block"></textarea>
      <div className="flex justify-end p-4 bg-slate-400">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded active:bg-blue-800">
          Comentar
        </button>
      </div>
    </div>
  );
};

export default CommentForm;

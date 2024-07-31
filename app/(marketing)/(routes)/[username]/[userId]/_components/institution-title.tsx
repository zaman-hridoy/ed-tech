interface Props {
  title: string;
  content: string;
}

const InstitutionTitle = ({ title, content }: Props) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-slate-500 tracking-tight font-semibold">
        {title}
      </span>
      <h4 className="text-md tracking-tight text-slate-900 font-semibold">
        {content}
      </h4>
    </div>
  );
};

export default InstitutionTitle;

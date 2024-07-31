interface Props {
  title: string;
}

const FormTitle = ({ title }: Props) => {
  return (
    <div className="flex flex-col w-fit space-y-1 mb-6">
      <span className="text-sm font-bold text-slate-900">{title}</span>
      <span className="w-1/2 h-1 bg-primary"></span>
    </div>
  );
};

export default FormTitle;

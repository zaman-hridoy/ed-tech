interface Props {
  name: string;
}

const SectionTitle = ({ name }: Props) => {
  return (
    <div>
      <span className="uppercase text-xs font-semibold text-slate-400 tracking-tight">
        {name}
      </span>
    </div>
  );
};

export default SectionTitle;

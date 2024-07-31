interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-fit space-y-3">
        <div className="w-full flex items-center justify-center">
          <div className="w-1/3 h-1 bg-[var(--brand-color-secondary)]" />
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl tracking-tight font-semibold text-slate-700">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageTitle;

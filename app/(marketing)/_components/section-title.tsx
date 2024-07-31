interface Props {
  title: string;
}

const SectionTitle = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="w-full flex items-center justify-center">
          <div className="w-1/3 h-1 bg-[var(--brand-color-secondary)]" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl tracking-tight font-semibold text-[var(--brand-color)]">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default SectionTitle;

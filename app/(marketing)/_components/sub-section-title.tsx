interface Props {
  title: string;
}

const SubSectionTitle = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-start">
      <div className="w-fit space-y-2 max-w-lg">
        <h3 className="text-xl md:text-2xl tracking-tight font-semibold text-[var(--brand-color-secondary)]">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SubSectionTitle;

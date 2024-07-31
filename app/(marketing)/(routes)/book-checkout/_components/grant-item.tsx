import { CheckCircleIcon } from "lucide-react";
import React from "react";

interface Props {
  label: string;
  value: string | number;
  isSelected?: boolean;
  onSelect: () => void;
}

const GrantItem: React.FC<Props> = ({
  label,
  value,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      style={{
        border: isSelected
          ? "2px solid var(--primary-color)"
          : "1px solid #ddd",
        marginBottom: 10,
      }}
      onClick={onSelect}
    >
      <div>
        <p>{label}</p>
        <h6>{value}</h6>
      </div>
      {isSelected && (
        <span>
          <CheckCircleIcon className="w-5 h-5 text-[var(--brand-color-success)]" />
        </span>
      )}
    </div>
  );
};

export default GrantItem;

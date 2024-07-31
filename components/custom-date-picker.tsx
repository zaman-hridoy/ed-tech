import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

interface Props {
  value: string;
  onChange: (value: any) => void;
}

const CustomDatePicker = ({ onChange, value }: Props) => {
  return <DatePicker onChange={(val) => onChange(val)} value={value} />;
};

export default CustomDatePicker;

import DatePicker, { registerLocale } from "react-datepicker";
import { id } from "date-fns/locale";

registerLocale("id", id);

function InputMonthYear({
    monthYear,
    setMonthYear,
}: {
    monthYear: Date;
    setMonthYear: React.Dispatch<React.SetStateAction<Date>>;
}) {
    return (
        <div className="flex items-center mb-3 gap-3">
            <h1 className="text-lg">Periode</h1>
            <DatePicker
                selected={monthYear}
                onChange={(date) => setMonthYear(date!)}
                dateFormat="MMMM YYYY"
                showMonthYearPicker
                className="w-[300px] border py-1 px-4 rounded-lg text-lg"
                locale={id}
            />
        </div>
    );
}

export default InputMonthYear;

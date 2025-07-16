import { Button } from "@/components/atoms";
import { AlertInfo, InputDate, InputDropdown } from "@/components/molecules";
import { REPORT_ORDER_FORM_ITEMS } from ".";
import { AnimatePresence } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const ReportOrderForm = ({ handleSubmit, control, errors, fieldRefs, onSubmit, showAlert, setShowAlert }: any) => {
    return (
        <>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div id="input-date" className="flex w-full justify-between items-center gap-10">
                    <InputDate
                        label="Dari Tanggal"
                        name="fromDate"
                        control={control}
                        ref={(el) => (fieldRefs.current["fromDate"] = el)}
                        error={errors.fromDate?.message}
                    />
                    <FaArrowRightLong className="text-5xl 2xl:text-7xl mt-6" />
                    <InputDate
                        label="Sampai Tanggal"
                        name="toDate"
                        control={control}
                        ref={(el) => (fieldRefs.current["toDate"] = el)}
                        error={errors.toDate?.message}
                    />
                </div>
                {REPORT_ORDER_FORM_ITEMS.map((item) => {
                    return (
                        <InputDropdown
                            key={item.name}
                            label={item.label}
                            options={item.options || []}
                            name={item.name}
                            control={control}
                            ref={(el) => (fieldRefs.current[item.name] = el)}
                            error={errors[item.name as any]?.message}
                        />
                    );
                })}
                <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                    Cetak
                </Button>
            </form>

            <AnimatePresence>
                {showAlert && (
                    <AlertInfo handleAlert={() => setShowAlert(false)} message="Rekap filter berhasil dicetak" />
                )}
            </AnimatePresence>
        </>
    );
};

export default ReportOrderForm;

import Label from "@/components/atoms/Label";
import InputText from "@/components/molecules/inputs/InputText";
import { PROFILE_FORM_ITEMS } from "@/components/organisms/profiles/profile.constants";
import { Controller } from "react-hook-form";

function ProfileForm({ control, errors }: any) {
    return (
        <div className="flex flex-col gap-3">
            {PROFILE_FORM_ITEMS.map((item) => {
                switch (item.type) {
                    case "dropdown":
                        return (
                            <Controller
                                key={item.name}
                                name={item.name}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Label id={item.name} children={item.label} />
                                        <select
                                            {...field}
                                            className="border py-2 2xl:py-3 px-4 rounded-lg w-full text-base 2xl:text-xl"
                                        >
                                            <option value="">{"-- Input Kategori Pelanggan --"}</option>
                                            {item.options?.map((option: any) => (
                                                <option key={option} value={option} className="">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}
                            />
                        );

                    case "text":
                    default:
                        return (
                            <InputText
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                type={item.type}
                                control={control}
                                error={errors[item.name]}
                            />
                        );
                }
            })}
        </div>
    );
}

export default ProfileForm;

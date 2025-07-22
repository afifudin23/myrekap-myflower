import InputText from "@/components/molecules/inputs/InputText";
import { PROFILE_FORM_ITEMS } from "@/components/organisms/profiles/profile.constants";

function ProfileForm({ control, errors }: any) {
    return (
        <div className="flex flex-col gap-3">
            {PROFILE_FORM_ITEMS.map((item) => (
                <InputText
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    type={item.type}
                    control={control}
                    error={errors[item.name]}
                />
            ))}
        </div>
    );
}

export default ProfileForm;

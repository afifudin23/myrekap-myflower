interface ProfileFieldProps {
    label: string;
    value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
    return (
        <div className="text-xl space-y-1">
            <label htmlFor={label} className="font-medium">
                {label}
            </label>
            <input type="text" value={value} className="border p-2 pl-4 rounded-xl w-full text-slate-600" />
        </div>
    );
}

export default ProfileField;

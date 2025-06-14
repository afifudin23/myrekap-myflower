import { CategoryCustomer, CategoryTypes } from "@/constants/CategoryCustomer";
import { useSearchParams } from "react-router-dom";

export default function ButtonSearchFiltered() {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleFilter = (category: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (searchParams.get("category") === category) {
            newParams.delete("category");
        } else {
            newParams.set("category", category);
        }
        setSearchParams(newParams);
    };

    return (
        <>
            {CategoryCustomer.map((item: CategoryTypes) => {
                return (
                    <button
                        key={item.name}
                        className={`bg-transparent w-10/12 text-center border-2 flex items-center justify-center border-slate-600 rounded-full h-10 hover:bg-slate-200`}
                        onClick={() => handleFilter(item.path)}
                    >
                        {item.name}
                    </button>
                );
            })}
        </>
    );
}

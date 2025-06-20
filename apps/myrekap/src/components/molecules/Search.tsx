import SmallButton from "@/components/atoms/SmallButton";
import InputFilter from "@/components/molecules/InputFilter";
import { DataCustomerCategory, DataFlowerCategory, DataOrderStatus, DataPaymentStatus } from "@/constants/DataCategory";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

const Search = ({
    searchTerm,
    setSearchTerm,
    filterCustomer,
    setFilterCustomer,
    filterFlower,
    setFilterFlower,
    filterPayment,
    setFilterPayment,
    filterOrder,
    setFilterOrder,
}: any) => {
    const [isOpenFilter, setIsOpenFilter] = useState<Boolean>(false);

    return (
        <div className="w-9/12 mx-auto items-center">
            <div className="flex gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari berdasarkan invoice, nama, harga, alamat pengiriman..."
                    className="border border-gray-300 px-5 py-1 rounded-lg text-base w-full 2xl:py-2"
                />
                <SmallButton
                    onClick={() => setIsOpenFilter(!isOpenFilter)} 
                    className="bg-blue-600 text-white py-1 px-1 2xl:py-2 2xl:px-4 font-semibold rounded-lg hover:bg-blue-700 transition font-fredoka gap-2"
                    bolder="font-medium"
                >
                    <IoFilterSharp />
                </SmallButton>
            </div>
            {isOpenFilter && (
                <div className="grid grid-cols-2 gap-2 mt-3 2xl:grid-cols-4">
                    <InputFilter options={DataCustomerCategory} value={filterCustomer} onChange={setFilterCustomer} />
                    <InputFilter options={DataFlowerCategory} value={filterFlower} onChange={setFilterFlower} />
                    <InputFilter options={DataPaymentStatus} value={filterPayment} onChange={setFilterPayment} />
                    <InputFilter options={DataOrderStatus} value={filterOrder} onChange={setFilterOrder} />
                </div>
            )}
        </div>
    );
};

export default Search;

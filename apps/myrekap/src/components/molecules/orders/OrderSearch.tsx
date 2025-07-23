import { ButtonSmall } from "@/components/atoms";
import { InputFilter } from "@/components/molecules/inputs";
import { CUSTOMER_CATEGORY_ITEMS, ORDER_STATUS_ITEMS, PAYMENT_STATUS_ITEMS } from "@/constants/category";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

const Search = ({
    searchTerm,
    setSearchTerm,
    filterCustomer,
    setFilterCustomer,
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
                    placeholder="Cari berdasarkan kode, nama, harga, alamat pengiriman..."
                    className="border border-gray-300 px-5 py-1 rounded-lg text-base w-full 2xl:py-2"
                />
                <ButtonSmall
                    onClick={() => setIsOpenFilter(!isOpenFilter)} 
                    className="bg-blue-600 text-white py-1 px-2 2xl:py-2 2xl:px-4 font-semibold rounded-lg hover:bg-blue-700 transition font-fredoka gap-2"
                >
                    <IoFilterSharp />
                </ButtonSmall>
            </div>
            {isOpenFilter && (
                <div className="grid grid-cols-2 gap-2 mt-3 2xl:grid-cols-3">
                    <InputFilter options={CUSTOMER_CATEGORY_ITEMS} value={filterCustomer} onChange={setFilterCustomer} />
                    {/* <InputFilter options={} value={filterFlower} onChange={setFilterFlower} /> */}
                    <InputFilter options={PAYMENT_STATUS_ITEMS} value={filterPayment} onChange={setFilterPayment} />
                    <InputFilter options={ORDER_STATUS_ITEMS} value={filterOrder} onChange={setFilterOrder} />
                </div>
            )}
        </div>
    );
};

export default Search;

import { RiFlowerLine } from "react-icons/ri";

function AuthTemplate({ description, children }: { description: string; children: React.ReactNode }) {
    return (
        <div className="bg-gradient-to-t from-[#FFFFFF] to-[#096bff] h-screen flex">
            <div className="border w-1/3 m-auto p-5 rounded-2xl bg-[#F5F1FB]">
                <h1 className="text-base 2xl:text-xl font-poppins w-fit">
                    <b className="flex gap-1 items-center text-base 2xl:text-xl">
                        <RiFlowerLine />
                        <span>Karangan Bunga Anda</span>
                    </b>
                    <p className="border border-black"></p>
                </h1>
                <div className="flex flex-col py-7 2xl:py-10">
                    <div className="mb-3 2xl:mb-5 flex flex-col items-center">
                        <b className="text-4xl 2xl:text-4xl font-semibold">MyFlower</b>
                        <p className="text-sm 2xl:text-base text-slate-500 mt-1 text-center">
                            {description}
                        </p>
                    </div>

                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AuthTemplate;

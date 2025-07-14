import { motion } from "framer-motion";

function AlertInfo({ handleAlert, message }: any) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 ">
            <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0px", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 mx-auto max-w-xl p-6 mt-10 bg-[#fcf9fd] rounded-lg shadow-2xl flex flex-col items-center gap-2"
            >
                <h2 className="text-3xl font-bold">Informasi</h2>
                <p className="text-xl mb-6 text-center">{message}</p>
                <button
                    onClick={handleAlert}
                    className="bg-purple-500 text-white font-semibold px-7 2xl:px-10 py-1 rounded-xl hover:bg-purple-600 transition"
                >
                    Oke
                </button>
            </motion.div>
        </div>
    );
}

export default AlertInfo;
// src/types/midtrans.d.ts
export {};

declare global {
    interface Window {
        snap: {
            pay: (token: string, options?: object) => void;
        };
    }
}

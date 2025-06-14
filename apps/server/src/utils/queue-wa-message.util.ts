import env from "@/config/env";

const whatsappQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;
const queuedMessages = new Set<string>();

async function processQueue() {
    if (isProcessingQueue) return;
    isProcessingQueue = true;

    while (whatsappQueue.length > 0) {
        const sendFn = whatsappQueue.shift()!;
        try {
            await sendFn();
            // Delay 2 detik sebelum kirim pesan berikutnya (sesuaikan delay-nya)
            await new Promise((res) => setTimeout(res, 3000));
        } catch (err) {
            console.warn("WhatsApp send failed in queue, ignored:", err);
        }
    }

    isProcessingQueue = false;
}

async function sendWhatsAppSilent(message: string) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const url = `https://api.callmebot.com/whatsapp.php?phone=${env.WHATSAPP_NUMBER}&text=${message}&apikey=${env.CALLMEBOT_API_KEY}`;

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
        const text = await response.text();
        console.warn("WhatsApp API response not OK:", text);
        throw new Error("API response not OK");
    }
}

export default function enqueueWhatsAppMessage(message: string) {
    if (queuedMessages.has(message)) {
        console.log("Duplicate message skipped:", message);
        return;
    }

    queuedMessages.add(message);

    whatsappQueue.push(async () => {
        try {
            await sendWhatsAppSilent(message);
        } finally {
            queuedMessages.delete(message);
        }
    });

    processQueue();
}

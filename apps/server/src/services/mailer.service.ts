import { brevo, env } from "@/config";
import { tokenService } from "@/services";
import { formatters } from "@/utils";

interface SendTemplateEmailProps {
    to: string;
    name: string;
    templateId: number;
    params: any;
}

const sendTemplateEmail = async ({ to, name, templateId, params }: SendTemplateEmailProps) => {
    try {
        await brevo.sendTransacEmail({
            to: [{ email: to, name }],
            sender: {
                name: env.MAIL_FROM_NAME,
                email: env.MAIL_FROM_EMAIL,
            },
            templateId,
            params,
        });

        console.log("✅ Verification email sent to:", to);
    } catch (err: any) {
        console.error("❌ Failed to send email:", err.response?.body || err);
        throw new Error("Failed to send verification email");
    }
};

export const sendVerificationEmail = async (user: any) => {
    const token = await tokenService.generateToken({ userId: user.id, type: "VERIFY_EMAIL" });
    const appName = formatters.getAppName(user.role);
    const clientUrl = appName === "MyRekap" ? env.MYREKAP_URL : env.MYFLOWER_URL;
    const verificationLink = `${clientUrl}/auth/verify-email?token=${token}`;
    await sendTemplateEmail({
        to: user.email,
        name: user.fullName,
        templateId: 3,
        params: { name: user.fullName, appName, verificationLink },
    });
};

export const sendResetPasswordEmail = async (user: any) => {
    const token = await tokenService.generateToken({ userId: user.id, type: "RESET_PASSWORD" });
    const appName = formatters.getAppName(user.role);
    const clientUrl = appName === "MyRekap" ? env.MYREKAP_URL : env.MYFLOWER_URL;
    const resetLink = `${clientUrl}/auth/reset-password?token=${token}`;
    await sendTemplateEmail({
        to: user.email,
        name: user.fullName,
        templateId: 4,
        params: { name: user.fullName, appName, resetLink },
    });
};

export const sendUpdateOrderStatusEmail = async (data: any) => {
    const { user, customerName, orderCode, orderStatus, paymentMethod, paymentProvider, totalPrice, items } = data;

    await sendTemplateEmail({
        to: user.email,
        name: user.fullName,
        templateId: 5,
        params: {
            customerName,
            orderCode,
            orderStatus,
            paymentMethod,
            paymentProvider: paymentProvider ? paymentProvider : "-",
            totalPrice: formatters.formatRupiah(totalPrice),
            items: formatters.formatItemsAsList(items),
        },
    });
};

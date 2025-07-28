import { brevo, env } from "@/config";

interface SendTemplateEmailProps {
    to: string;
    name: string;
    templateId: number;
    params: any;
}

export const sendTemplateEmail = async ({ to, name, templateId, params }: SendTemplateEmailProps) => {
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

interface SendVerificationEmailProps {
    to: string;
    name: string;
    token: string;
}

export const sendVerificationEmail = async ({ to, name, token }: SendVerificationEmailProps) => {
    const verificationLink = `${env.MYFLOWER_URL}/auth/verify-email?token=${token}`;
    await sendTemplateEmail({ to, name, templateId: 3, params: { name, verificationLink } });
};

import ErrorCode from "../constants/error-code";
import { BadRequestException, InternalException } from "../exceptions";
import puppeteer from "puppeteer";

export const printReport = async (html: string) => {
    if (!html)
        throw new BadRequestException("HTML content is required for printing", ErrorCode.ORDER_PRINT_HTML_NOT_FOUND);
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: "networkidle0" });
        await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            landscape: true,
            margin: {
                top: "20px",
                right: "20px",
                bottom: "20px",
                left: "20px",
            },
        });
        await browser.close();

        return pdfBuffer;
    } catch (error) {
        console.log(error);
        throw new InternalException("Failed to print report", ErrorCode.ORDER_PRINT_FAILED, error);
    }
};

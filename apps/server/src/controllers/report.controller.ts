import { reportService } from "../services";
import { Request, Response, NextFunction } from "express";

export const printReport = async (req: Request, res: Response, next: NextFunction) => {
    const { html, fileName } = req.body;
    try {
        const data = await reportService.printReport(html);
        const today = new Date().toISOString().split("T")[0];
        const baseName = fileName?.replace(/\.pdf$/i, "") || "Laporan";
        const fullFileName = `${baseName}_${today}.pdf`;
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${fullFileName}"`,
            "Content-Length": data.length.toString(),
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        });
        res.send(Buffer.from(data));
    } catch (error) {
        return next(error);
    }
};

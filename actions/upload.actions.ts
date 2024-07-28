"use server"

import { parseStringify } from "@/lib/utils"
import fs from "fs"
import path from "path"

export const uploadFile = async (data: FormData, folderName: string) => {
    try {
        if (data.get("file")) {
            const file = data.get("file")
            
            // @ts-ignore
            const ext = file.name.split(".").slice(-1)[0]
            const newFileName = new Date().valueOf() + "." + ext
            const uploadPath = path.join(__dirname, "..", "..", "..", "..", "..", "public", "assets", "images", folderName, newFileName)

            const chunks = []
            // @ts-ignore
            for await (const chunk of file.stream()) {
                chunks.push(chunk)
            }
            const buffer = Buffer.concat(chunks)

            try {
                fs.writeFileSync(uploadPath, buffer, 'binary');
            } catch (error) {
                console.log("upload error ->", error);
            }

            return parseStringify(`/assets/images/${folderName}/${newFileName}`)
        }

        return parseStringify({ error: 'آپلود فایل نا موفق بود.' });
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'آپلود فایل نا موفق بود.' });
        }
    }
}
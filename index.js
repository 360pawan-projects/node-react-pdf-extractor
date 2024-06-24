import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { spawnSync } from "child_process";

export const extractPdf = async (source) => {
  let content = "";

  try {
    let buffer;
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    if (source.startsWith("http://") || source.startsWith("https://")) {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }
      buffer = await response.arrayBuffer();
    } else if (fs.existsSync(source)) {
      buffer = fs.readFileSync(source);
    } else {
      throw new Error(
        "Source must be a valid URL or a path to an existing local file."
      );
    }

    const randomString = Math.random().toString(36).substring(2, 8);
    const tempFilePath = path.join(
      tempDir,
      `${Date.now()}-${randomString}.pdf`
    );

    fs.writeFileSync(tempFilePath, Buffer.from(buffer));
    const data = spawnSync("pdftotext", [tempFilePath, "-"], {
      encoding: "utf-8",
    });

    if (data.error) {
      throw new Error(
        `Error during pdftotext execution: ${data.error.message}`
      );
    }

    if (data.stderr) {
      throw new Error(`pdftotext stderr: ${data.stderr}`);
    }

    content = data.stdout;
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    console.error(`Failed to extract PDF: ${error.message}`);
    content = "";
  }

  return content;
};

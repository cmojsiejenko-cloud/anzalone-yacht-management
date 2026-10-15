export type UploadedAttachment = {
  filename: string;
  contentType: string;
  contentBase64: string;
  size: number;
};

export const resumeUploadRules = {
  maxFiles: 1,
  maxBytes: 5 * 1024 * 1024,
  accept: ["application/pdf"],
  extensions: [".pdf"],
  label: "PDF up to 5 MB",
} as const;

export const receiptUploadRules = {
  maxFiles: 5,
  maxBytes: 4 * 1024 * 1024,
  maxTotalBytes: 12 * 1024 * 1024,
  accept: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
  extensions: [".pdf", ".jpg", ".jpeg", ".png", ".webp"],
  label: "PDF or image, up to 4 MB each, 5 files max",
} as const;

export function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "file";
  const cleaned = base
    .replace(/[^\w.\-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 80);
  return cleaned || "attachment";
}

function hasAllowedExtension(filename: string, extensions: readonly string[]): boolean {
  const lower = filename.toLowerCase();
  return extensions.some((ext) => lower.endsWith(ext));
}

export async function fileToAttachment(
  file: File,
  rules: {
    maxBytes: number;
    accept: readonly string[];
    extensions: readonly string[];
  },
): Promise<{ ok: true; attachment: UploadedAttachment } | { ok: false; error: string }> {
  if (file.size <= 0) {
    return { ok: false, error: "Empty files are not accepted." };
  }
  if (file.size > rules.maxBytes) {
    return {
      ok: false,
      error: `Each file must be ${Math.floor(rules.maxBytes / (1024 * 1024))} MB or smaller.`,
    };
  }

  const filename = sanitizeFilename(file.name);
  if (!hasAllowedExtension(filename, rules.extensions)) {
    return {
      ok: false,
      error: `Allowed types: ${rules.extensions.join(", ")}.`,
    };
  }

  if (file.type && !rules.accept.includes(file.type)) {
    // Some browsers leave type blank; extension check already passed.
    if (file.type !== "application/octet-stream") {
      return {
        ok: false,
        error: `Allowed types: ${rules.extensions.join(", ")}.`,
      };
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    ok: true,
    attachment: {
      filename,
      contentType: file.type || "application/octet-stream",
      contentBase64: buffer.toString("base64"),
      size: buffer.byteLength,
    },
  };
}

export async function collectAttachments(
  files: File[],
  rules: {
    maxFiles: number;
    maxBytes: number;
    maxTotalBytes?: number;
    accept: readonly string[];
    extensions: readonly string[];
  },
): Promise<
  | { ok: true; attachments: UploadedAttachment[] }
  | { ok: false; error: string }
> {
  if (files.length > rules.maxFiles) {
    return {
      ok: false,
      error: `You may attach at most ${rules.maxFiles} file${rules.maxFiles === 1 ? "" : "s"}.`,
    };
  }

  const attachments: UploadedAttachment[] = [];
  let total = 0;

  for (const file of files) {
    const result = await fileToAttachment(file, rules);
    if (!result.ok) return result;
    total += result.attachment.size;
    if (rules.maxTotalBytes && total > rules.maxTotalBytes) {
      return {
        ok: false,
        error: `Combined attachments must stay under ${Math.floor(rules.maxTotalBytes / (1024 * 1024))} MB.`,
      };
    }
    attachments.push(result.attachment);
  }

  return { ok: true, attachments };
}

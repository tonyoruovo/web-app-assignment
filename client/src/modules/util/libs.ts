/**
 * Convert file size in bytes to human-readable format (KB, MB, GB)
 * @param bytes - File size in bytes (from HTMLInputElement.files[0].size)
 * @param decimals - Number of decimal places (default: 2)
 */
export function formatFileSize(args: ReturnType<typeof convertSize>): {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
  formatted: string; // Automatically chooses best unit
} {
  if (args.bytes === 0) return {
    bytes: 0,
    kb: '0 KB',
    mb: '0 MB',
    gb: '0 GB',
    formatted: '0 Bytes'
  };

  let formatted;
  if (args.bytes < args.k) {
    formatted = `${args.bytes} Bytes`;
  } else if (args.bytes < Math.pow(args.k, 2)) {
    formatted = `${args.kb} KB`;
  } else if (args.bytes < Math.pow(args.k, 3)) {
    formatted = `${args.mb} MB`;
  } else {
    formatted = `${args.gb} GB`;
  }

  return {
    bytes: args.bytes,
    kb: `${args.kb} KB`,
    mb: `${args.mb} MB`,
    gb: `${args.gb} GB`,
    formatted
  };
}

export function convertSize(bytes: number, decimals = 2) {
  if (bytes === 0) return {
    bytes: 0,
    kb: 0,
    mb: 0,
    gb: 0,
    k: 0,
  };

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const kb = parseFloat((bytes / k).toFixed(dm));
  const mb = parseFloat((bytes / Math.pow(k, 2)).toFixed(dm));
  const gb = parseFloat((bytes / Math.pow(k, 3)).toFixed(dm));
  return {
    bytes,
    kb,
    mb,
    gb,
    k
  }
}

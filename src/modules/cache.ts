// Both pages render per request, so every upstream read goes through
// unstable_cache. The cached functions throw on failure and their callers catch
// outside the cache, which keeps a blip from being stored for the whole window.
export const DATA_REVALIDATE_SECONDS = 300;

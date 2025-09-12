export const slugify = (str) => {
    return str
      .toLowerCase()
      .split(",")[0]
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };
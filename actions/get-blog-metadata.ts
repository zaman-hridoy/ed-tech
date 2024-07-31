import { getLinkPreview } from "link-preview-js";

type FuncType = (url: string) => Promise<any>;
export const getBlogMetadata: FuncType = async (url) => {
  return await getLinkPreview(url);
};

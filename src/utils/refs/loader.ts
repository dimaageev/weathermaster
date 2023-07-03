import { Loader } from "@src/components";
import references from "./index";

export const saveLoaderRef = (ref: Loader) => {
  references.loader = ref;
};

export const startLoading = () => {
  if (references.loader) {
    references.loader.start();
  }
};

export const stopLoading = () => {
  if (references.loader) {
    references.loader.stop();
  }
};

export const statusLoader = () => {
  if (references.loader) {
    return references.loader.status();
  } else {
    return false;
  }
};

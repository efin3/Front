import { API, Wrapper } from "@/@types/wrapper";

declare global {
  interface Window {
    API: API | undefined;
    wrapper: Wrapper | undefined;
  }
}

export {};

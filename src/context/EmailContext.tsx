import { createContext } from "react";

interface IEmailContext {
  userEmail: string;
  setUserEmail: any;
}

const EmailContext = createContext<IEmailContext>({
  userEmail: "",
  setUserEmail: () => undefined,
});

export default EmailContext;

import { SCRIPTS, SCRIPTS_ENUM } from "../types";

export const loadScript = (script: SCRIPTS_ENUM) => {
    return new Promise<{
      loaded: boolean;
      error: boolean;
    }>(function (res, rej) {
      try {
        const src = SCRIPTS[script].script;
  
        const scriptObj = document.createElement("script");
  
        scriptObj.src = src;
        scriptObj.async = true;
  
        const onScriptLoad = (): void => {
          res({
            loaded: true,
            error: false,
          });
        };
  
        const onScriptError = (): void => {
          rej({
            loaded: true,
            error: true,
          });
        };
        scriptObj.addEventListener("load", onScriptLoad);
        scriptObj.addEventListener("complete", onScriptLoad);
        scriptObj.addEventListener("error", onScriptError);
  
        document.body.appendChild(scriptObj);
      } catch (err) {
        rej({
          error: true,
          loaded: false,
        });
      }
    });
  };
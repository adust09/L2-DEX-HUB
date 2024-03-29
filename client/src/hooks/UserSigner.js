import { useMemo, useState } from "react";

const useUserSigner = (injectedProvider, localProvider) => {

  const [signer, setSigner] = useState();

  useMemo(() => {
    if (injectedProvider) {
      console.log("🦊 Using injected provider");
      const injectedSigner = injectedProvider._isProvider ? injectedProvider.getSigner() : injectedProvider;
      setSigner(injectedSigner);
    } else if (!localProvider) setSigner();
    else {
      if (window.location.pathname && window.location.pathname.indexOf("/pk") >= 0) {
        const incomingPK = window.location.hash.replace("#", "");
        let rawPK;
        if (incomingPK.length === 64 || incomingPK.length === 66) {
          console.log("🔑 Incoming Private Key...");
          rawPK = incomingPK;
          window.history.pushState({}, "", "/");
          const currentPrivateKey = window.localStorage.getItem("metaPrivateKey");
          if (currentPrivateKey && currentPrivateKey !== rawPK) {
            window.localStorage.setItem("metaPrivateKey_backup" + Date.now(), currentPrivateKey);
          }
          window.localStorage.setItem("metaPrivateKey", rawPK);
        }
      }

      console.log("🔥 Using burner signer");
    }
  }, [injectedProvider, localProvider]);

  return signer;
};

export default useUserSigner;
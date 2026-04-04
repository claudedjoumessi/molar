import { useEffect, useRef, useState } from "react";

declare const Jmol: any;

export default function MoleculeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const interval = setInterval(() => {
      if (typeof (window as any).Jmol !== "undefined") {
        clearInterval(interval);

        const Info = {
          width: 1200,
          height: 650,
          debug: false,
          // color: "0x000054",
          use: "HTML5",
          j2sPath: "/jsmol/j2s",
          // script: "set frank off; load /jsmol/data/acetophenone_bad.jdx;",
          script:
            "set frank off; background none; load /jsmol/data/2bxaH.pdb;",
          readyFunction: () => {
            setReady(true);
          },
        };

        containerRef.current!.innerHTML = Jmol.getAppletHtml(
          "jsmolApplet",
          Info,
        );
        Jmol.getApplet("jsmolApplet", Info);
      }

      console.log(Jmol);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ opacity: ready ? 1 : 0, transition: "0.3s ease" }}
    />
  );
}

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
          width: 500,
          height: 400,
          debug: false,
          color: "0x16171D",
          use: "HTML5",
          j2sPath: "/jsmol/j2s",
          script: "set frank off; load /jsmol/jpge/mol/12-crown-4.mol;",
          // script: "set frank off; load /data/molecules/aspirin.asnt;",
          readyFunction: () => setReady(true),
        };

        containerRef.current!.innerHTML = Jmol.getAppletHtml(
          "jsmolApplet",
          Info,
        );
        Jmol.getApplet("jsmolApplet", Info);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ opacity: ready ? 1 : 0, transition: "0.3s ease" }}
    />
  );
}

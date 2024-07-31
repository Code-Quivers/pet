"use client";

import { Accordion } from "rsuite";

const BackupBuddySpecs = () => {
  return (
    <>
      <section>
        <h1 className="font-bold text-xl">Backup Buddy Specs</h1>
        <Accordion>
          <Accordion.Panel header="Accordion Panel 1" eventKey={1}>
            <p>hi</p>
          </Accordion.Panel>
          <Accordion.Panel header="Accordion Panel 2" eventKey={2}>
            <p>hi</p>
          </Accordion.Panel>
          <Accordion.Panel header="Accordion Panel 3" eventKey={3}>
            <p>hi</p>
          </Accordion.Panel>
        </Accordion>
      </section>
    </>
  );
};

export default BackupBuddySpecs;

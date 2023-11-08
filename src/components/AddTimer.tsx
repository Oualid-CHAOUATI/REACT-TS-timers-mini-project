import { useRef } from "react";

import Button from "./UI/Button.tsx";
import Form, { FormHandle } from "./UI/Form.tsx";
import Input from "./UI/Input.tsx";
import { useTimersContext } from "../store/Timers-ctx.tsx";

export default function AddTimer() {
  const form = useRef<FormHandle>(null);

  const { addTimer } = useTimersContext();
  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };

    const { name } = extractedData;
    const duration = Number(extractedData.duration);

    addTimer({ name, duration });

    console.log(extractedData);
    // form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" value={10} />
      <Input type="number" label="Duration" id="duration" value={10} />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}

'use client';

import { useSyncExternalStore } from 'react';

type DateDisplayProps = Readonly<{
  date: string | Date;
}>;

const dummyStateStore = () => () => {};

function HydratedTimeDisplay({ date }: DateDisplayProps) {
  const dateObject = new Date(date);

  const display = useSyncExternalStore(
    dummyStateStore,
    () => dateObject.toLocaleDateString(),
    () => null,
  );

  return date ? <span>{display}</span> : null;
}

export default HydratedTimeDisplay;

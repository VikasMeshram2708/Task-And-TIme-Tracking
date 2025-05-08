import { Clock4 } from "lucide-react";

import React from "react";

export default function loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p>
        <Clock4 className="animate-spin" color="white" size={36} />
      </p>
    </div>
  );
}

"use client";

import { createPartContext } from "../core";

export const [FieldsetContext, useFieldsetContext] = createPartContext<boolean>("Fieldset");

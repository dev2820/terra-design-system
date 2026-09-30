"use client";

import { createPartContext } from "../core/utils/create-part-context";

export const [FieldsetContext, useFieldsetContext] = createPartContext<boolean>("Fieldset");

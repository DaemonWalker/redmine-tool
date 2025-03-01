'use client'

import useSeenStore from "@/store/seenStore";
import { FC, useEffect } from "react"

export const InitStore: FC = () => {
    const { init } = useSeenStore();
    useEffect(() => init(), [])
    return null;
}